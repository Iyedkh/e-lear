const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    city: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    },
    image: {
        type: String
    },
    googleId: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
