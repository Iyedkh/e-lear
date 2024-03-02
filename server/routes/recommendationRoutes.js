const express = require('express');
const router = express.Router();
const Course = require('../models/course');

// GET recommended courses based on ratings
router.get('/recommendations', async (req, res) => {
    try {
        // Fetch courses sorted by ratings in descending order
        const recommendedCourses = await Course.find().sort({ ratings: -1 }).limit(10); // Limit to top 10 courses
        res.json(recommendedCourses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
