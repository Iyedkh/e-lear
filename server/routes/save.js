const express = require('express');
const router = express.Router();
const SavedCourse = require('../models/SavedCourse');

// Endpoint to save a course for a user
router.post('/save', async (req, res) => {
    try {
        const { userId, courseId } = req.body;
        const savedCourse = new SavedCourse({ userId, courseId });
        await savedCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to retrieve saved courses for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const savedCourses = await SavedCourse.find({ userId }).populate('courseId');
        res.json(savedCourses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
