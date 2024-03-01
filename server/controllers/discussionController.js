const Discussion = require('../models/discussion');

// Controller function to create a new discussion
exports.createDiscussion = async (req, res) => {
    try {
      const { title, content } = req.body;
      const authorId = req.user._id;
      // Set a default author ID or use another mechanism to associate discussions
      const newDiscussion = new Discussion({
        title,
        content,
        author: authorId
         });
      const savedDiscussion = await newDiscussion.save();
      res.status(201).json(savedDiscussion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Controller function to get all discussions
exports.getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find().populate('author', 'username');
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get a single discussion by ID
exports.getDiscussionById = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id).populate('author', 'username');
    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update a discussion by ID
exports.updateDiscussionById = async (req, res) => {
  try {
    const updatedDiscussion = await Discussion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDiscussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    res.json(updatedDiscussion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to delete a discussion by ID
exports.deleteDiscussionById = async (req, res) => {
  try {
    const deletedDiscussion = await Discussion.findByIdAndDelete(req.params.id);
    if (!deletedDiscussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    res.json(deletedDiscussion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
