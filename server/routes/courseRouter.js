// routes/courseRoutes.js

const express = require('express');
const router = express.Router();
const CourseModel = require('../models/course');
const filterMiddleware = require('../middleware/filterMiddleware');

// Route to get all courses
router.get('/', filterMiddleware, async (req, res) => {
    try {
        const courses = await CourseModel.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a specific course by ID
router.get('/:id', async (req, res) => {
    try {
        const course = await CourseModel.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to create a new course
router.post('/', async (req, res) => {
    try {
        // Create a new course instance based on the request body
        const newCourse = new CourseModel({
            id: req.body.id,
            title: req.body.title,
            rating: req.body.rating, // Use provided rating
            comments: req.body.comments, // Use provided comments array
            category: req.body.category // Add category field
        });

        // Save the new course to the database
        const savedCourse = await newCourse.save();

        // Send the saved course as the response
        res.status(201).json(savedCourse);
    } catch (error) {
        // Handle errors and send an appropriate error response
        res.status(400).json({ error: error.message });
    }
});

// Route to update a course by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedCourse = await CourseModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(updatedCourse);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to delete a course by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedCourse = await CourseModel.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(deletedCourse);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
