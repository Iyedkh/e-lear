const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Reference to the User model if you have one
    },
    courseProgress: {
        type: Number,
        default: 0 // Default progress value
    },
    quizScores: [{
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Quiz' // Reference to the Quiz model if you have one
        },
        score: {
            type: Number,
            required: true
        }
    }],
    // Add more fields as needed
});

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
