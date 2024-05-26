const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String, // URL of the user's profile image
        required: false
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
