const mongoose = require('mongoose');

// Define the Comment schema
const commentSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
      },
      content: {
        type: String,
        required: true
      },
      // userId: {  // Optional, uncomment if you want to associate comments with users
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: 'User',
      //   required: true
      // },
      createdAt: {
        type: Date,
        default: Date.now
      },
      likes: {
        type: Number,
        default: 0
      }
});

// Create the Comment model
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
