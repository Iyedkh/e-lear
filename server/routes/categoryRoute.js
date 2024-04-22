const express = require('express');
const router = express.Router();
const CategoryModel = require('../models/Category');
const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for category images
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

// Route to create a new category with photo upload
router.post('/', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        
        try {
            const { name, description } = req.body;
            const newCategory = new CategoryModel({
                name,
                description,
                image: req.file ? '/uploads/' + req.file.filename : null // Construct the correct image URL
            });

            const savedCategory = await newCategory.save();

            res.status(201).json(savedCategory);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
});

router.get('/', async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a category by ID
router.get('/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Check if categoryId is valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        const category = await CategoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Route to update a category
router.put('/:id', async (req, res) => {
    try {
        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to delete a category
router.delete('/:id', async (req, res) => {
    try {
        await CategoryModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
