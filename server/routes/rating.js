//rating.js route
const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const Rating = require('../models/Rating'); // Corrected model import

router.post('/courses/:courseId/ratings', async (req, res) => {
    const courseId = req.params.courseId;
    const { stars } = req.body; // Assuming the rating is provided in the request body

    try {
        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        // Create a new rating document
        const newRating = new Rating({
            courseId: courseId,
            stars: stars
        });
        // Save the new rating
        await newRating.save();
        // Add the rating's ObjectId to the course's ratings array
        course.ratings.push(newRating._id);
        await course.save();

        res.status(201).json({ message: 'Rating submitted successfully', rating: newRating });
    } catch (error) {
        console.error('Error submitting rating:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Route to get all ratings for a course
router.get('/courses/:courseId/ratings', async (req, res) => {
    const courseId = req.params.courseId;

    try {
        // Fetch the course from the database
        const course = await Course.findById(courseId).populate('ratings');
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json({ ratings: course.ratings });
    } catch (error) {
        console.error('Error getting ratings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to update a rating for a course
router.put('/courses/:courseId/ratings/:ratingId', async (req, res) => {
    const courseId = req.params.courseId;
    const ratingId = req.params.ratingId;
    const { stars } = req.body;

    try {
        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Check if the rating exists
        const rating = await Rating.findById(ratingId);
        if (!rating) {
            return res.status(404).json({ error: 'Rating not found' });
        }

        // Update the rating stars
        rating.stars = stars;
        await rating.save();

        res.status(200).json({ message: 'Rating updated successfully', rating: rating });
    } catch (error) {
        console.error('Error updating rating:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to delete a rating for a course
router.delete('/courses/:courseId/ratings/:ratingId', async (req, res) => {
    const courseId = req.params.courseId;
    const ratingId = req.params.ratingId;

    try {
        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Remove the rating from the course's ratings array
        course.ratings.pull(ratingId);
        await course.save();

        // Delete the rating document
        await Rating.findByIdAndDelete(ratingId);

        res.status(200).json({ message: 'Rating deleted successfully' });
    } catch (error) {
        console.error('Error deleting rating:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
