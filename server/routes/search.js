const express = require('express');
const router = express.Router();

// Sample course data (can be replaced with a database)
let courses = [
    { id: 1, name: 'Course A', rating: 0 },
    { id: 2, name: 'Course B', rating: 0 },
    { id: 3, name: 'Course C', rating: 0 }
];

// Route to handle course search
router.get('/', (req, res) => {
    // Check if the 'q' parameter exists in the query string
    if (req.query.q) {
        // Convert the query parameter to lowercase for case-insensitive search
        const query = req.query.q.toLowerCase();

        // Filter courses based on whether the name contains the query string
        const results = courses.filter(course => course.name.toLowerCase().includes(query));
        
        // Send the filtered results as JSON response
        res.json(results);
    } else {
        // If 'q' parameter is not provided, send an error response
        res.status(400).json({ error: 'Missing search query parameter' });
    }
});

module.exports = router;
