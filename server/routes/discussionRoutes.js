const express = require('express');
const router = express.Router();
const Discussion = require('../models/Discussion');
const Comment = require('../models/comment');

// Create a new discussion
router.post('/create', async (req, res) => {
  try {
    const { title, content, author } = req.body; // Assuming author is passed in the request body
    const newDiscussion = new Discussion({
      title,
      content,
      author
    });
    const savedDiscussion = await newDiscussion.save();
    res.status(201).json(savedDiscussion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all discussions
router.get('/', async (req, res) => {
  try {
    const discussions = await Discussion.find();
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single discussion by ID
router.get('/:id', async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a discussion by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedDiscussion = await Discussion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDiscussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    res.json(updatedDiscussion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a discussion by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedDiscussion = await Discussion.findByIdAndDelete(req.params.id);
    if (!deletedDiscussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    res.json({ message: 'Discussion deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// Create a new comment for a discussion
router.post('/:discussionId/comments', async (req, res) => {
  try {
      const { content, author } = req.body;
      const newComment = new Comment({
          content,
          author,
          discussion: req.params.discussionId
      });
      const savedComment = await newComment.save();
      res.status(201).json(savedComment);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

// Update a comment for a discussion
router.put('/:discussionId/comments/:commentId', async (req, res) => {
  try {
      const { content } = req.body;
      const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, { content }, { new: true });
      if (!updatedComment) {
          return res.status(404).json({ error: 'Comment not found' });
      }
      res.json(updatedComment);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

// Like a comment for a discussion
router.put('/:discussionId/comments/:commentId/like', async (req, res) => {
  try {
      const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, { $inc: { likes: 1 } }, { new: true });
      if (!updatedComment) {
          return res.status(404).json({ error: 'Comment not found' });
      }
      res.json(updatedComment);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

// Unlike a comment for a discussion
router.put('/:discussionId/comments/:commentId/unlike', async (req, res) => {
  try {
      const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, { $inc: { likes: -1 } }, { new: true });
      if (!updatedComment) {
          return res.status(404).json({ error: 'Comment not found' });
      }
      res.json(updatedComment);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});


module.exports = router;
