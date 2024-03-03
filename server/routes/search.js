const express = require('express');
const router = express.Router();
const Course = require('../models/course');

// Route to get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get courses by title
router.get('/search', async (req, res) => {
    try {
        const { title } = req.query;

        if (!title) {
            return res.status(400).json({ error: 'Title parameter is required' });
        }

        // Perform a case-insensitive search for courses that match the title
        const courses = await Course.find({
            title: { $regex: title, $options: 'i' }
        });

        // Return the search results
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
