const express = require('express');
const router = express.Router();
const Course = require('../models/course');

// Sample course data (can be replaced with a database)


// Route to retrieve all courses
router.get('/', (req, res) => {
    res.json(courses);
});

// Route to search courses by title
router.get('/search', (req, res) => {
    // Extract the search query from the URL query parameters
    const { title } = req.query;

    // If title is missing or empty, return all courses
    if (!title || title.trim() === '') {
        return res.json(courses);
    }

    // Filter courses whose titles contain the search query (case-insensitive)
    const results = courses.filter(course => 
        course.title.toLowerCase().includes(title.toLowerCase())
    );

    // Return the filtered results
    res.json(results);
});
module.exports = router;
