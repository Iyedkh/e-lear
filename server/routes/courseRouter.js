const express = require('express');
const router = express.Router();
const CourseModel = require('../models/course');
const multer = require('multer');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // File naming convention
    }
});
// Check file type
function checkFileType(file, cb) {
    const allowedTypes = /jpeg|jpg|png/;
    const isAllowedType = allowedTypes.test(file.mimetype);
    if (isAllowedType) {
        return cb(null, true);
    } else {
        cb('Error: Images only!');
    }
}

// Multer upload instance
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb); // Validate file type
    }
});

// Route to fetch all courses
router.get('/', async (req, res) => {
    try {
        const courses = await CourseModel.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to fetch a specific course by ID
router.get('/:id', async (req, res) => {
    try {
        const course = await CourseModel.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to create a new course with photo upload
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const newCourse = new CourseModel({
            title: req.body.title,
            rating: req.body.rating,
            description: req.body.description,
            category: req.body.category,
            videoUrl: req.body.videoUrl,
            imageData: req.file.buffer // Store the image data in the database
        });

        const savedCourse = await newCourse.save();

        res.status(201).json(savedCourse);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to update a course by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedCourse = await CourseModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(updatedCourse);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to delete a course by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedCourse = await CourseModel.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(deletedCourse);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
