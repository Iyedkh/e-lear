const express = require('express');
const router = express.Router();
const Course = require('../models/course');

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