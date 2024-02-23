// routes/faq.js

const express = require('express');
const router = express.Router();
const faqData = require('../data/faq.json');

// Route to fetch all FAQ data
router.get('/', (req, res) => {
    res.json(faqData);
});

// Route to search for FAQs
router.get('/search', (req, res) => {
    const searchTerm = req.query.q;
    
    // If searchTerm is not provided, return empty array
    if (!searchTerm) {
        return res.json([]);
    }

    // Implement search logic
    const matchingFAQs = faqData.filter(faq => {
        // Case-insensitive search by comparing lowercase values
        const lowercaseQuestion = faq.question.toLowerCase();
        const lowercaseSearchTerm = searchTerm.toLowerCase();
        return lowercaseQuestion.includes(lowercaseSearchTerm);
    });

    res.json(matchingFAQs);
});

module.exports = router;
