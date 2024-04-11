const express = require('express');
const router = express.Router();
const SavedCourse = require('../models/SavedCourse');

// Create a saved course
router.post('/', async (req, res) => {
    try {
        const { courseId } = req.body;
        const savedCourse = new SavedCourse({ courseId });
        const result = await savedCourse.save();
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get all saved courses
router.get('/', async (req, res) => {
    try {
        const savedCourses = await SavedCourse.find();
        res.json(savedCourses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get a saved course by ID
router.get('/:id', async (req, res) => {
    try {
        const savedCourse = await SavedCourse.findById(req.params.id);
        if (!savedCourse) {
            return res.status(404).json({ message: 'Saved course not found' });
        }
        res.json(savedCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete a saved course by ID
router.delete('/:id', async (req, res) => {
    try {
        const savedCourse = await SavedCourse.findByIdAndDelete(req.params.id);
        if (!savedCourse) {
            return res.status(404).json({ message: 'Saved course not found' });
        }
        res.json({ message: 'Saved course deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
