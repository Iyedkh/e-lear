const express = require('express');
const router = express.Router();
const CourseModel = require('../models/course');
const multer = require('multer');
const GridFSBucket = require('mongodb').GridFSBucket;
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

// Database connection
const mongoURI = 'mongodb://127.0.0.1:27017/e_learn';
const client = new MongoClient(mongoURI);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
    try {
        const { title, rating, description, category } = req.body;
        const image = req.files['image'] ? req.files['image'][0] : null;
        const video = req.files['video'] ? req.files['video'][0] : null;

        if (!title || !description || !category || !video) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Upload video to GridFS and get the file ID
        const videoFileId = await uploadToGridFS(video);

        const newCourse = new CourseModel({
            title,
            rating,
            description,
            category,
            videoFileId, // Store GridFS file ID
            imageUrl: image ? `/uploads/${image.filename}` : null
        });

        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        console.error('Error saving course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Function to upload file to GridFS
async function uploadToGridFS(file) {
    const db = client.db('e_learn');
    const bucket = new GridFSBucket(db, { bucketName: 'videos' });
    const uploadStream = bucket.openUploadStream(file.originalname);
    uploadStream.end(file.buffer);
    return uploadStream.id;
}


// Route to get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await CourseModel.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/category/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const courses = await CourseModel.find({ category: category });
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/top-rated', async (req, res) => {
    try {
        const courses = await CourseModel.find().populate('ratings');

        // Filter courses with an averageRating over 3 stars
        const topRatedCourses = courses.filter(course => {
            if (course.ratings.length === 0) return false;
            
            const totalRating = course.ratings.reduce((acc, curr) => acc + curr.stars, 0);
            const avgRating = totalRating / course.ratings.length;
            
            return avgRating > 3;
        });

        res.json(topRatedCourses);
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

router.post('/save', async (req, res) => {
    try {
        const { courseId } = req.body;

        // Check if courseId is provided
        if (!courseId) {
            return res.status(400).json({ error: "Course ID is required" });
        }

        // Here, you can implement the logic to save the courseId to a user's profile or any other storage mechanism
        // For example, if you have a model named SavedCourse, you can create a new entry for the saved course
        const SavedCourse = require('../models/savedCourse'); // Import the SavedCourse model
        const savedCourse = new SavedCourse({ courseId });
        await savedCourse.save();

        res.status(200).json({ message: 'Course saved successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/saved', async (req, res) => {
    try {
        const SavedCourse = require('../models/savedCourse'); // Import the SavedCourse model
        const savedCourses = await SavedCourse.find().populate('courseId'); // Assuming courseId is a reference to the CourseModel
        res.status(200).json(savedCourses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a course by ID
router.get('/:id', async (req, res) => {
    try {
        const courseId = req.params.id;

        // Check if courseId is valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ message: 'Invalid course ID' });
        }

        const course = await CourseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
