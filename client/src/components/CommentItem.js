import React from 'react';

const CommentItem = ({ comment }) => {
  return (
    <div className="comment">
      <p className="comment-content">{comment.content}</p>
      <p className="comment-author">By: {comment.author}</p>
      {/* Add additional UI elements like a like button, edit button, etc. */}
    </div>
  );
};

export default CommentItem;
