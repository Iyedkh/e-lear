const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;
