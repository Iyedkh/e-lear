import React from 'react';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Discussion = ({ discussion, comments, onCommentSubmit }) => {
  return (
    <div className="discussion">
      <h2>{discussion.title}</h2>
      <p>{discussion.content}</p>
      <h3>Comments</h3>
      <CommentForm onCommentSubmit={onCommentSubmit} />
      <div className="comment-list">
        {comments.map((comment, index) => (
          <CommentItem key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Discussion;
