const mongoose = require('mongoose');

// Define the Mongoose schema for the Course model
const courseSchema = new mongoose.Schema({
    id: Number,
    title: String,
    rating: [{ type: Number, min: 1, max: 5 }],
    comments: [String]
});

// Create a Mongoose model based on the schema
const CourseModel = mongoose.model('Course', courseSchema);

module.exports = CourseModel;