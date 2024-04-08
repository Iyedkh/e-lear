// routes/quiz.js

const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Route to create a new quiz
router.post('/create', async (req, res) => {
    try {
        const { question, choices, correctAnswer } = req.body;
        const newQuiz = new Quiz({
            question,
            choices,
            correctAnswer
        });
        await newQuiz.save();
        res.status(201).json(newQuiz);
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ error: 'Failed to create quiz' });
    }
});

// Route to pass the quiz and get result
router.post('/pass', async (req, res) => {
    try {
        const { answers } = req.body;
        const quiz = await Quiz.find(); // Assuming all quizzes are passed in one request for simplicity
        let correct = 0;
        let incorrect = 0;
        for (let i = 0; i < quiz.length; i++) {
            if (quiz[i].correctAnswer === answers[i]) {
                correct++;
            } else {
                incorrect++;
            }
        }
        res.status(200).json({ correct, incorrect });
    } catch (error) {
        console.error('Error passing quiz:', error);
        res.status(500).json({ error: 'Failed to pass quiz' });
    }
});

// Route to get all quiz questions
router.get('/', async (req, res) => {
  try {
      const quizzes = await Quiz.find();
      res.status(200).json(quizzes);
  } catch (error) {
      console.error('Error fetching quiz questions:', error);
      res.status(500).json({ error: 'Failed to fetch quiz questions' });
  }
});

module.exports = router;
