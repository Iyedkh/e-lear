// routes/courses.js
const express = require('express');
const router = express.Router();
const filterMiddleware = require('../middleware/filterMiddleware');
const CourseModel = require('../models/course');

router.get('/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const courses = await CourseModel.find({ category: category });
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Route to get courses with optional filtering by category
router.get('/', filterMiddleware, async (req, res) => {
  try {
    const courses = await CourseModel.find();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
