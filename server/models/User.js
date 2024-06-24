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
    
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String, 
        required: false
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
