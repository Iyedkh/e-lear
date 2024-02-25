const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');

// Route to get progress data
router.get('/progress', async (req, res) => {
    try {
        // Fetch progress data from the database
        const progressData = await Progress.find();
        res.json(progressData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
