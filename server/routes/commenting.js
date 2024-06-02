//comment.js route
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const CourseModel = require('../models/course');
const CommentModel = require('../models/comment'); 
const UserModel = require('../models/User'); 
const { authMiddleware } = require('../middleware/auth');

// Route to post a comment for a course
router.post('/:courseId/comments', authMiddleware, async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const { content } = req.body;
        const userId = req.user.userId;

        // Check if courseId is valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ message: 'Invalid course ID' });
        }

        const user = await UserModel.findById(userId);

        // Create a new comment
        const newComment = new CommentModel({
            courseId: courseId,
            content: content,
            user: userId,
            username: user.username,
            image: user.image
        });

        // Save the comment
        const savedComment = await newComment.save();

        // Add the comment ID to the course's comments array
        await CourseModel.findByIdAndUpdate(courseId, { $push: { comments: savedComment._id } });

        res.status(201).json(savedComment);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

// Route to get all comments for a course
router.get('/:courseId/comments', async (req, res) => {
    try {
        const courseId = req.params.courseId;

        // Check if courseId is valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ message: 'Invalid course ID' });
        }

        // Find the course and populate its comments
        const course = await CourseModel.findById(courseId).populate({
            path: 'comments',
            populate: {
                path: 'user',
                select: 'username image'
            }
        });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json(course.comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Route to update a comment by ID
router.put('/:courseId/comments/:commentId', async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const { content } = req.body;

        // Check if commentId is valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ message: 'Invalid comment ID' });
        }

        // Find the comment by ID and update its content
        const updatedComment = await CommentModel.findByIdAndUpdate(commentId, { content }, { new: true });

        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json(updatedComment);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

// Route to delete a comment by ID
router.delete('/:courseId/comments/:commentId', async (req, res) => {
    try {
        const commentId = req.params.commentId;

        // Check if commentId is valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ message: 'Invalid comment ID' });
        }

        // Find the comment by ID and delete it
        const deletedComment = await CommentModel.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Remove the comment ID from the course's comments array
        await CourseModel.updateOne({ comments: commentId }, { $pull: { comments: commentId } });

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});
// Route to post a like for a comment
router.post('/:courseId/comments/:commentId/like', async (req, res) => {
    try {
        const commentId = req.params.commentId;

        // Check if commentId is valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ message: 'Invalid comment ID' });
        }

        // Find the comment by ID
        const comment = await CommentModel.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Increment the like count
        comment.likes += 1;

        // Save the updated comment
        await comment.save();

        res.status(201).json({ message: 'Liked comment successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/comments', async (req, res) => {
    try {
        const comments = await CommentModel.find();
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
