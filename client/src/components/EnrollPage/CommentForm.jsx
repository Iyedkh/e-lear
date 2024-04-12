import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ courseId }) => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/comments', {
                courseId: courseId,
                text: comment
            });
            console.log('Comment submitted successfully:', response.data);
            // Reset the comment input field after successful submission
            setComment('');
        } catch (error) {
            console.error('Error submitting comment:', error);
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CommentForm;
