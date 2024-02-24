const express = require('express');
const router = express.Router();


// Import the Course model or course data
const Course = require('../models/course');

// Route to submit a new rating for a course
router.post('/courses/:courseId/ratings', async (req, res) => {
    const courseId = req.params.courseId;
    const { rating } = req.body; // Assuming the rating is provided in the request body

    try {
        // Fetch the course from the database
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Update the course's rating
        course.rating = rating;
        await course.save();

        res.status(201).json({ message: 'Rating submitted successfully' });
    } catch (error) {
        console.error('Error submitting rating:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
