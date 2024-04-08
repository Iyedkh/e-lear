const express = require('express');
const router = express.Router();
const quizData = require('../data/quiz.json');

// Route to get all quiz questions
router.get('/', (req, res) => {
  res.json(quizData);
});

// Route to get a specific quiz question by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const question = quizData[id];
  if (!question) {
    return res.status(404).json({ error: 'Question not found' });
  }
  res.json(question);
});

// Route to submit an answer to a specific quiz question
router.post('/:id/submit', (req, res) => {
  const id = req.params.id;
  const { answer } = req.body;

  if (!answer) {
    return res.status(400).json({ error: 'Answer is required' });
  }

  const question = quizData[id];
  if (!question) {
    return res.status(404).json({ error: 'Question not found' });
  }

  if (question.correctAnswer === answer) {
    res.json({ correct: true, message: 'Correct answer!' });
  } else {
    res.json({ correct: false, message: 'Incorrect answer. Try again!' });
  }
});

module.exports = router;
