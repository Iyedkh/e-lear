const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = 'test';

// Define a simplified regex pattern for password validation
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Register route
router.post('/register', async (req, res) => {
    const { email, password, username, city, role } = req.body;

    // Validate password format
    if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one number.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = new User({ email, password: hashedPassword, username, city, role });
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

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.json({
        token,
        username: user.username,
        email: user.email,
        city: user.city,
        role: user.role
    });
});

module.exports = router;
