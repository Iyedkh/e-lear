const express = require('express');
const router = express.Router();
const Discussion = require('../models/discussion');
const DiscussionController = require('../controllers/discussionController');
// Create a new discussion
router.post('/create', DiscussionController.createDiscussion);

// Get all discussions
router.get('/', DiscussionController.getAllDiscussions);

// Get a single discussion by ID
router.get('/:id', DiscussionController.getDiscussionById);

// Update a discussion by ID
router.put('/:id', DiscussionController.updateDiscussionById);

// Delete a discussion by ID
router.delete('/:id', DiscussionController.deleteDiscussionById);

module.exports = router;
