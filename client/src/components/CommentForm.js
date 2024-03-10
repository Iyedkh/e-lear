import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onSubmit function passed from the parent component
    onSubmit(content);
    // Clear the input field after submitting the form
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Enter your comment..."
        rows={4}
        cols={50}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
