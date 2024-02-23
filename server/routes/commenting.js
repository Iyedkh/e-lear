const express = require('express');
const router = express.Router();
const Comment = require('../models/comment'); // Assuming you have a Comment model

// Route to create a new comment
router.post('/comments', async (req, res) => {
    try {
        const { courseId, content, userId } = req.body;
        const newComment = new Comment({
            courseId,
            content,
            userId
        });
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to get all comments for a specific course
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


// Route to update a comment
router.put('/comments/:commentId', async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const updatedComment = await Comment.findByIdAndUpdate(commentId, req.body, { new: true });
        res.json(updatedComment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to delete a comment
router.delete('/comments/:commentId', async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        res.json(deletedComment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
