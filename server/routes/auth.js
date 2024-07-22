const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const router = express.Router();

const JWT_SECRET = 'test';

// Define a simplified regex pattern for password validation
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Add a unique timestamp to the filename
    }
});

const upload = multer({ storage: storage });

// Register route
router.post('/register', upload.single('image'), async (req, res) => {
    const { email, password, username, city, role } = req.body;

    if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one number.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const imagePath = req.file ? req.file.path : null;

    try {
        const user = new User({ email, password: hashedPassword, username, city, role, image: imagePath });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '4h' });

    res.json({
        token,
        username: user.username,
        email: user.email,
        city: user.city,
        role: user.role,
        image: user.image
    });
});

// Protect all routes below with authMiddleware
router.use(authMiddleware);

// Update user route (admin only)
router.put('/:id', adminMiddleware, upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { email, password, username, city, role } = req.body;
    const imagePath = req.file ? req.file.path : null;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update fields only if provided in the request body
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);
        if (username) user.username = username;
        if (city) user.city = city;
        if (role) user.role = role;
        if (imagePath) user.image = imagePath;

        await user.save();
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete user route (admin only)
router.delete('/:id', adminMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        console.log('Received DELETE request for user deletion'); 

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('User found:', user); 

        await User.findByIdAndDelete(id);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(400).json({ error: 'An error occurred during deletion' });
    }
});

// Get user profile by ID
router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select('-password'); // Exclude the password field
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get current authenticated user
router.get('/user', authMiddleware, (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            city: user.city,
            role: user.role,
            image: user.image,
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
