const express = require('express');
const router = express.Router();

// Sample course data (can be replaced with a database)
let courses = [
    { id: 1, name: 'Mathematics 101', rating: 4.5 },
    { id: 2, name: 'Physics Basics', rating: 3.8 },
    { id: 3, name: 'Computer Science Fundamentals', rating: 4.2 }
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
        if (results.length > 0) {
            res.json(results);
        } else {
            res.status(404).json({ error: 'No matching courses found' });
        }
    } else {
        // If 'q' parameter is not provided, send an error response
        res.status(400).json({ error: 'Missing search query parameter' });
    }
});

module.exports = router;
