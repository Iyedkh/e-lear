const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model for authors
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;
