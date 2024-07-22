const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz'); // Adjust the path as per your project structure
const Course = require('../models/course'); // Assuming you have a Course model

// Create a new quiz
router.post('/create', async (req, res) => {
    try {
        const { title, questions, courseId } = req.body; // Extract title, questions, and courseId from request body
        if (!courseId) {
            return res.status(400).json({ error: 'Course ID is required' });
        }

        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Create a new quiz associated with the course
        const newQuiz = new Quiz({
            title,
            questions,
            course: courseId
        });
        await newQuiz.save();

        res.status(201).json(newQuiz);
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ error: 'Failed to create quiz' });
    }
});

// Get all quizzes
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('course', 'title'); // Populate the 'course' field with 'title'
        res.status(200).json(quizzes);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
});

// Get a quiz by ID
router.get('/:quizId', async (req, res) => {
    try {
        const quizId = req.params.quizId;
        const quiz = await Quiz.findById(quizId).populate('course', 'title'); // Populate the 'course' field with 'title'
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.status(200).json(quiz);
    } catch (error) {
        console.error('Error fetching quiz by ID:', error);
        res.status(500).json({ error: 'Failed to fetch quiz' });
    }
});

// Update a quiz by ID
router.put('/:quizId', async (req, res) => {
    try {
        const quizId = req.params.quizId;
        const { title, questions, courseId } = req.body; // Extract title, questions, and courseId from request body
        
        const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, { title, questions, course: courseId }, { new: true });
        if (!updatedQuiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.status(200).json(updatedQuiz);
    } catch (error) {
        console.error('Error updating quiz:', error);
        res.status(500).json({ error: 'Failed to update quiz' });
    }
});

// Delete a quiz by ID
router.delete('/:quizId', async (req, res) => {
    try {
        const quizId = req.params.quizId;
        const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
        if (!deletedQuiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        console.error('Error deleting quiz:', error);
        res.status(500).json({ error: 'Failed to delete quiz' });
    }
});

module.exports = router;
