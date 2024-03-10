// signInRoute.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error signing in user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
