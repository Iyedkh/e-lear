import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentForm = ({ courseId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]); // Array to store fetched/submitted comments
  const [isLoading, setIsLoading] = useState(false); // Flag for loading state
  const [error, setError] = useState(null); // State to store error message

  // Fetch comments for the course (optional)
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true); // Set loading state to true
        const response = await axios.get(`http://localhost:3000/comments/${courseId}`); // Replace with your endpoint
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError(error.message); // Set error message in state
      } finally {
        setIsLoading(false); // Set loading state to false after fetching or error
      }
    };
    fetchComments();
  }, [courseId]); // Dependency array includes courseId for refetching on course change

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous error before submitting

    try {
      setIsLoading(true); // Set loading state to true
      const response = await axios.post('http://localhost:3000/comments/add', {
        courseId: courseId,
        text: comment
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

      {comments.length > 0 && (
        <div className="comments-list">
          <h4>Comments</h4>
          {/* Loop through comments and display them */}
          {comments.map((comment) => (
            <div key={comment._id} className="comment">
              {/* Display comment content */}
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      )}

      {isLoading && <p>Loading comments...</p>}
    </div>
  );
};

export default CommentForm;
