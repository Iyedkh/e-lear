// Assuming you have a 'Course' and 'Rating' model
const express = require('express');
const CourseModel = require('../models/course');
const Rating = require('../models/Rating');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const courses = await CourseModel.find();

        // Calculate average rating for each course
        const coursesWithAverageRating = await Promise.all(courses.map(async (course) => {
            const ratings = await Rating.find({ courseId: course._id });
            const averageRating = calculateAverageRating(ratings);
            return { ...course.toObject(), averageRating };
        }));

        res.status(200).json(coursesWithAverageRating);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Function to calculate average rating
function calculateAverageRating(ratings) {
    if (ratings.length === 0) {
        return 0;
    }

    const totalRating = ratings.reduce((acc, curr) => acc + curr.stars, 0);
    return totalRating / ratings.length;
}

module.exports = router;
