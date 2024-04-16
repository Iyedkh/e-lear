// models/Course.js

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  ratings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rating' // Reference to the Rating model
  }],
 
  description: String,
  category: {
    type: String,
    required: true
  },
  videoUrl: String,
  imageUrl: {
    type: String,
    required: true
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }] // Reference array to store comment IDs
});

// Virtual populate for comments (Optional)
courseSchema.virtual('populatedComments', {
  ref: 'Comment',
  localField: 'comments',
  foreignField: '_id',
  justOne: false // Set to false to populate an array of comments
});

courseSchema.set('toJSON', { virtuals: true });
courseSchema.set('toObject', { virtuals: true });

const CourseModel = mongoose.model('Course', courseSchema);

module.exports = CourseModel;
