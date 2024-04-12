const mongoose = require('mongoose');

// Define the Comment schema
const commentSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // Assuming you have a Course model
        required: true
    },
    content: {
        type: String,
        required: true
    },
   /* userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true
    }, */
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
});

// Create the Comment model
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
