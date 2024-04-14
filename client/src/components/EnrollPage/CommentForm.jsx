import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const CommentForm = ({ courseId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]); // Array to store fetched/submitted comments
  const [isLoading, setIsLoading] = useState(false); // Flag for loading state
  const [error, setError] = useState(null); // State to store error message
  const [editingCommentId, setEditingCommentId] = useState(null); // State to track the ID of the comment being edited
  const [dropdownOpen, setDropdownOpen] = useState([]); // State to track dropdown open/close for each comment

  // Initialize dropdown state for each comment
  useEffect(() => {
    setDropdownOpen(new Array(comments.length).fill(false));
  }, [comments]);

  // Fetch comments for the course
  const fetchComments = async () => {
    try {
      setIsLoading(true); // Set loading state to true
      const response = await axios.get(`http://localhost:3000/comment/${courseId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('Course ID:', courseId); // Add this line for debugging
    fetchComments();
  }, [courseId]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous error before submitting

    try {
      setIsLoading(true); // Set loading state to true
      const response = await axios.post(`http://localhost:3000/comment/${courseId}/comments`, {
        content: comment // Updated request body, courseId is now part of the URL
      });
      console.log('Comment submitted successfully:', response.data);

      // Update comments state to include the new comment (optimistic update)
      setComments([...comments, response.data]);

      // Reset the comment input field after submission
      setComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
      setError(error.message); // Set error message in state
    } finally {
      setIsLoading(false); // Set loading state to false after submitting or error
    }
  };

  const handleUpdateComment = async (commentId) => {
    try {
      setIsLoading(true); // Set loading state to true
      // Send PUT request to update the comment by ID
      await axios.put(`http://localhost:3000/comment/${courseId}/comments/${commentId}`, {
        content: comment // Use the updated comment content
      });
      // Reset the editing state and clear the comment input field
      setEditingCommentId(null);
      setComment('');
      // Refetch comments to display updated data
      fetchComments();
    } catch (error) {
      console.error('Error updating comment:', error);
      setError(error.message);
    } finally {
      setIsLoading(false); // Set loading state to false after updating or error
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      // Send DELETE request to delete the comment by ID
      await axios.delete(`http://localhost:3000/comment/${courseId}/comments/${commentId}`);
      // Filter out the deleted comment from the comments array
      const updatedComments = comments.filter((comment) => comment._id !== commentId);
      // Update the comments state
      setComments(updatedComments);
    } catch (error) {
      console.error('Error deleting comment:', error);
      setError(error.message);
    }
  };

  const toggleDropdown = (index) => {
    setDropdownOpen((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index]; // Toggle dropdown state for the clicked comment
      return newState;
    });
  };

  return (
    <div className="comment-form">
      <h3>Leave a Comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your comment here..."
          value={comment}
          onChange={handleCommentChange}
          required
        ></textarea>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {comments.map((comment, index) => (
        <div key={comment._id} className="comment">
          <div className="comment-content">
            <p>{comment.content}</p>
            {/* Dropdown for edit and delete buttons */}
          <Dropdown isOpen={dropdownOpen[index]} toggle={() => toggleDropdown(index)}>
            <DropdownToggle caret>
              ...
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem onClick={() => setEditingCommentId(comment._id)}>Edit</DropdownItem>
              <DropdownItem onClick={() => handleDeleteComment(comment._id)}>Delete</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          </div>

          

          {/* Conditional rendering for edit comment textarea */}
          {editingCommentId === comment._id && (
          <div className="edit-comment">
             <textarea className='edit'
              value={comment.content} // Set the textarea value to the content of the comment
              onChange={handleCommentChange}
              required
            ></textarea>
          <button onClick={() => handleUpdateComment(comment._id)}>Update</button>
  </div>
      )}
        </div>
      ))}

      {isLoading && <p>Loading comments...</p>}
    </div>
  );
};

export default CommentForm;
