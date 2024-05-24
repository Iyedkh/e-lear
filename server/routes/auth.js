const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const router = express.Router();

const JWT_SECRET = 'test';

// Define a simplified regex pattern for password validation
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Register route
router.post('/register', async (req, res) => {
    const { email, password, username, city, role } = req.body;

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

// Protect all routes below with authMiddleware
router.use(authMiddleware);

// Update user route (admin only)
router.put('/:id', adminMiddleware, async (req, res) => {
    const { id } = req.params;
    const { email, password, username, city, role } = req.body;

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
        console.log('Received DELETE request for user deletion'); // Debug point 1

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('User found:', user); // Debug point 2

        await User.findByIdAndDelete(id);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(400).json({ error: 'An error occurred during deletion' });
    }
});
module.exports = router;
