const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  ratings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rating' // Reference to the Rating model
  }],
  description: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Reference to the Category model
    required: true
  },
  videoUrl: {
    type: String,
    required: false
  },
  imageUrl: {
    type: String,
    required: true
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }], // Reference array to store comment IDs
  quizzes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz' // Reference to the Quiz model
  }]
});

// Virtual property to compute average rating
courseSchema.virtual('averageRating').get(function() {
  if (!this.ratings || this.ratings.length === 0) {
    return 0;
  }

  const totalRating = this.ratings.reduce((acc, curr) => acc + curr.stars, 0);
  return totalRating / this.ratings.length;
});

// Apply virtuals to JSON output
courseSchema.set('toJSON', { virtuals: true });

const CourseModel = mongoose.model('Course', courseSchema);

module.exports = CourseModel;
