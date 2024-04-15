import React, { useState } from 'react';
import "./over.css";
const EditCommentOverlay = ({ comment, onUpdate, onClose }) => {
  const [editedComment, setEditedComment] = useState(comment.content);

  const handleCommentChange = (event) => {
    setEditedComment(event.target.value);
  };

  const handleSubmit = () => {
    onUpdate(editedComment);
    onClose();
  };

  return (
    <div className="edit-comment-overlay">
      <textarea
        value={editedComment}
        onChange={handleCommentChange}
        required
      ></textarea>
      <button  onClick={handleSubmit}>Update</button>
    </div>
  );
};

export default EditCommentOverlay;
