import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditCommentOverlay from './EditCommentOverlay';
import { FcLike, FcDislike } from "react-icons/fc";
import 'bootstrap/dist/css/bootstrap.min.css';

const CommentForm = ({ courseId }) => {
  const serverBaseUrl = "http://localhost:3000";
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [commentLikes, setCommentLikes] = useState({});
  const [likedComments, setLikedComments] = useState([]);
  const [editOverlayVisible, setEditOverlayVisible] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchComments();
  }, [courseId]);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${serverBaseUrl}/comment/${courseId}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError(error.response?.data?.message || 'Error fetching comments');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      setIsLoading(true);
      const response = await axios.post(`${serverBaseUrl}/comment/${courseId}/comments`, {
        content: comment
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setComments([...comments, response.data]);
      setComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
      setError(error.response?.data?.message || 'Error submitting comment');
    } finally {
      setIsLoading(false);
    }
    window.location.reload();
  };

  const handleLikeComment = async (commentId) => {
    try {
      const response = await axios.post(`${serverBaseUrl}/comment/${courseId}/comments/${commentId}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 201) {
        console.log('Comment liked successfully');
        setCommentLikes(prevLikes => ({
          ...prevLikes,
          [commentId]: (prevLikes[commentId] || 0) + 1
        }));
        setLikedComments(prevLikedComments => [...prevLikedComments, commentId]);
      } else {
        console.error('Failed to like comment:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error liking comment:', error);
      setError(error.response?.data?.message || 'Error liking comment');
    }
  };

  const handleUpdateComment = async (commentId, updatedContent) => {
    try {
      setIsLoading(true);
      await axios.put(`${serverBaseUrl}/comment/${courseId}/comments/${commentId}`, {
        content: updatedContent
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const updatedComments = comments.map((c) => (c._id === commentId ? { ...c, content: updatedContent } : c));
      setComments(updatedComments);
      setEditOverlayVisible(false);
    } catch (error) {
      console.error('Error updating comment:', error);
      setError(error.response?.data?.message || 'Error updating comment');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`${serverBaseUrl}/comment/${courseId}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedComments = comments.filter((comment) => comment._id !== commentId);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error deleting comment:', error);
      setError(error.response?.data?.message || 'Error deleting comment');
    }
  };

  const openEditOverlay = (commentId) => {
    setEditCommentId(commentId);
    setEditOverlayVisible(true);
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
          className="comment-form-textarea"
          ></textarea>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            <div className="comment-header">
              <img
                src={comment.user?.image ? `${serverBaseUrl}/${comment.user.image.replace(/\\/g, '/')}` : 'default-avatar.png'}
                alt="User profile"
                className="comment-user-image"
              />
              <span className="comment-username">{comment.user?.username || 'Unknown User'} :</span>
              {comment.user?._id === userId && (
                <div className='action'>
                  <button onClick={() => openEditOverlay(comment._id)}>Edit</button>
                  <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                </div>
              )}
            </div>
            <div className="comment-content">
              <p>{comment.content}</p>
              <div className="comment-likes">
                {likedComments.includes(comment._id) ? (
                  <FcDislike
                    onClick={() => handleLikeComment(comment._id)}
                    className="like-icon liked"
                  />
                ) : (
                  <FcLike
                    onClick={() => handleLikeComment(comment._id)}
                    className="like-icon"
                  />
                )}
                <span>{commentLikes[comment._id] || comment.likes}</span>
              </div>
            </div>
          </div>
        ))}
        {isLoading && <p>Loading comments...</p>}
        {editOverlayVisible && (
          <EditCommentOverlay
            commentId={editCommentId}
            onUpdate={handleUpdateComment}
            onClose={() => setEditOverlayVisible(false)}
          />
        )}
      </div>
    );
  };
  
  export default CommentForm;
  