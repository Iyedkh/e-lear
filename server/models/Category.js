const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate category names
  },
  description: String,
  image: { // Optional image for the category
    type: String,
  },
});

module.exports = mongoose.model('Category', categorySchema);
