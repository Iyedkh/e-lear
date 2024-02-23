const express = require('express');
const router = express.Router();

// Sample course data (can be replaced with a database)
let courses = [
    { id: 1, name: 'Course A', comments: [] },
    { id: 2, name: 'Course B', comments: [] },
    { id: 3, name: 'Course C', comments: [] }
];

// Route to handle course commenting
router.post('/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const { comment } = req.body;

    // Update the course comments (this is a simplified example)
    const course = courses.find(course => course.id === courseId);
    if (course) {
        course.comments.push(comment);
        res.status(200).send('Comment added successfully');
    } else {
        res.status(404).send('Course not found');
    }
});

module.exports = router;
