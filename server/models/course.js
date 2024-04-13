const mongoose = require('mongoose');

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
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }] // Reference array to store comment IDs
});

const CourseModel = mongoose.model('Course', courseSchema);

module.exports = CourseModel;