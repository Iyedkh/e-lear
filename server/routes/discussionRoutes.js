const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussionController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

// Route to handle POST requests to create a new discussion
router.post('/', authenticationMiddleware, discussionController.createDiscussion);

module.exports = router;
