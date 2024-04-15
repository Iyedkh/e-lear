import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import EditCommentOverlay from './EditCommentOverlay'; // Import the new component

const CommentForm = ({ courseId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState([]);
  const commentFormClass = 'comment-form-textarea';
 

  useEffect(() => {
    setDropdownOpen(new Array(comments.length).fill(false));
  }, [comments]);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
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
    fetchComments();
  }, [courseId]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      setIsLoading(true);
      const response = await axios.post(`http://localhost:3000/comment/${courseId}/comments`, {
        content: comment
      });
      setComments([...comments, response.data]);
      setComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateComment = async (commentId, updatedContent) => {
    try {
      setIsLoading(true);

      // Send PUT request to update comment on the server
      await axios.put(`http://localhost:3000/comment/${courseId}/comments/${commentId}`, {
        content: updatedContent
      });

      // Update comments state with the updated content
      const updatedComments = comments.map((c) => (c._id === commentId ? { ...c, content: updatedContent } : c));
      setComments(updatedComments);

      setEditingCommentId(null);
    } catch (error) {
      console.error('Error updating comment:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3000/comment/${courseId}/comments/${commentId}`);
      const updatedComments = comments.filter((comment) => comment._id !== commentId);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error deleting comment:', error);
      setError(error.message);
    }
  };

  const toggleDropdown = (index) => {
    setDropdownOpen((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
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
          className={commentFormClass}
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
            <Dropdown isOpen={dropdownOpen[index]} toggle={() => toggleDropdown(index)}>
              <DropdownToggle caret></DropdownToggle>
              <DropdownMenu end style={{ padding: 0 }}>
                <DropdownItem onClick={() => setEditingCommentId(comment._id)}>Edit</DropdownItem>
                <DropdownItem onClick={() => handleDeleteComment(comment._id)}>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          {isLoading && <p>Loading comments...</p>}
          {editingCommentId === comment._id && (
            <EditCommentOverlay
              comment={comment}
              onUpdate={(updatedContent) => handleUpdateComment(comment._id, updatedContent)}
              onClose={() => setEditingCommentId(null)}
            />
          )}
        </div>
      ))}

      {isLoading && <p>Loading comments...</p>}
    </div>
  );
};

export default CommentForm;
