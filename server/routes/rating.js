const express = require('express');
const router = express.Router();

// Sample course data (can be replaced with a database)
let courses = [
    { id: 1, name: 'Course A', rating: 0 },
    { id: 2, name: 'Course B', rating: 0 },
    { id: 3, name: 'Course C', rating: 0 }
];

// Route to handle course rating
router.post('/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const { rating } = req.body;

    // Update the course rating (this is a simplified example)
    const course = courses.find(course => course.id === courseId);
    if (course) {
        course.rating = rating;
        res.status(200).send('Course rated successfully');
    } else {
        res.status(404).send('Course not found');
    }
});

module.exports = router;
