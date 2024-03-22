const mongoose = require('mongoose');

// Define the Mongoose schema for the Course model
const courseSchema = new mongoose.Schema({
    title: String,
    rating: [{ type: Number, min: 1, max: 5 }],
    description: String,
    category: {
        type: String,
        required: true
    },
    videoUrl: String,
    imageUrl: {
        type: String, // Store the URL of the image
        required: true
    }
});

// Create a Mongoose model based on the schema
const CourseModel = mongoose.model('Course', courseSchema);

module.exports = CourseModel;
