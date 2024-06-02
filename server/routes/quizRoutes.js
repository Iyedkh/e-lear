//Quiz.js route
const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Create a new quiz
router.post('/create', async (req, res) => {
    try {
        const { title, questions } = req.body; // Extract title and questions from request body
        const newQuiz = new Quiz({
            title,
            questions
        });
        await newQuiz.save();
        res.status(201).json(newQuiz);
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ error: 'Failed to create quiz' });
    }
});

// Pass a quiz and calculate the score
router.post('/pass/:quizId', async (req, res) => {
    try {
        const { answers } = req.body;
        const quizId = req.params.quizId;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        
        let correct = 0;
        let incorrect = 0;

        for (let i = 0; i < quiz.questions.length; i++) {
            // Compare user answers with correct answers for each question
            if (quiz.questions[i].correctAnswer === answers[i]) {
                correct++;
            } else {
                incorrect++;
            }
        }

        // Calculate the score and send the response
        const totalQuestions = quiz.questions.length;
        const score = (correct / totalQuestions) * 100;
        res.status(200).json({ score, correct, incorrect });
    } catch (error) {
        console.error('Error passing quiz:', error);
        res.status(500).json({ error: 'Failed to pass quiz' });
    }
});

// Get all quizzes
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        res.status(500).json({ error: 'Failed to fetch quiz questions' });
    }
});

// Get a quiz by ID
router.get('/:quizId', async (req, res) => {
    try {
        const quizId = req.params.quizId;
        const quiz = await Quiz.findById(quizId);
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
        const { title, questions } = req.body; // Extract title and questions from request body
        const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, { title, questions }, { new: true });
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
