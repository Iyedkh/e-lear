const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const passport = require('passport');
const router = express.Router();

const JWT_SECRET = 'test'; // Use a secure secret

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/register', upload.single('image'), async (req, res) => {
    console.log('Register route hit');
    const { email, password, username, city, role } = req.body;
    if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).json({ error: 'Password does not meet criteria' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const imagePath = req.file ? req.file.path : null;

    try {
        const user = new User({ email, password: hashedPassword, username, city, role, image: imagePath });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    console.log('Login route hit');
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password does not match');
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
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        console.log('Google callback route hit');
        const token = jwt.sign({ userId: req.user._id, role: req.user.role }, JWT_SECRET, { expiresIn: '4h' });
        console.log('Generated token:', token);
        res.redirect(`http://localhost:3001/home?token=${token}`);
    });

module.exports = router;