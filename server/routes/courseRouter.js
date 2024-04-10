const express = require('express');
const router = express.Router();
const CourseModel = require('../models/course');
const multer = require('multer');
const path = require('path');

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
}).single('image'); // Specify field name for single file upload

// Route to create a new course with photo upload
router.post('/', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        
        try {
            const newCourse = new CourseModel({
                title: req.body.title,
                rating: req.body.rating,
                description: req.body.description,
                category: req.body.category,
                videoUrl: req.body.videoUrl,
                imageUrl: req.file ? '/uploads/' + req.file.filename : null // Construct the correct image URL
            });

            const savedCourse = await newCourse.save();

            res.status(201).json(savedCourse);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
});
// Route to get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await CourseModel.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/top-rated', async (req, res) => {
    try {
        const courses = await CourseModel.find({ rating: { $gt: 3 } }).exec();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Route to update a course
router.put('/:id', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err });
        }

        try {
            const updatedFields = {
                title: req.body.title,
                rating: req.body.rating,
                description: req.body.description,
                category: req.body.category,
                videoUrl: req.body.videoUrl
            };

            if (req.file) {
                updatedFields.imageUrl = '/uploads/' + req.file.filename;
            }

            const updatedCourse = await CourseModel.findByIdAndUpdate(
                req.params.id,
                updatedFields,
                { new: true }
            );

            res.status(200).json(updatedCourse);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
});

// Route to delete a course
router.delete('/:id', async (req, res) => {
    try {
        await CourseModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.get('/courses/category/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const courses = await Course.find({ category: category });
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = router;
