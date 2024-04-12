const express = require('express');
const router = express.Router();


// Create a saved course
router.post('/save', async (req, res) => {
    try {
        const { courseId } = req.body;
        // Here, you can implement the logic to save the courseId to a user's profile or any other storage mechanism
        res.status(200).json({ message: 'Course saved successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all saved courses
router.get('/', async (req, res) => {
    try {
        const savedCourses = await SavedCourse.find();
        res.json(savedCourses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get a saved course by ID
router.get('/:id', async (req, res) => {
    try {
        const savedCourse = await SavedCourse.findById(req.params.id);
        if (!savedCourse) {
            return res.status(404).json({ message: 'Saved course not found' });
        }
        res.json(savedCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete a saved course by ID
router.delete('/:id', async (req, res) => {
    try {
        const savedCourse = await SavedCourse.findByIdAndDelete(req.params.id);
        if (!savedCourse) {
            return res.status(404).json({ message: 'Saved course not found' });
        }
        res.json({ message: 'Saved course deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
