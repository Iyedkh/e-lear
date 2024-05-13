const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate category names
  },
  description: String,
  image: String, // Assuming image will be a string representing the image URL
});

module.exports = mongoose.model('Category', categorySchema);
