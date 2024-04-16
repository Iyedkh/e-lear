// models/Rating.js

const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // Reference to the Course model
        required: true
    },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Rating', ratingSchema);
