const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = 'test'; // Ensure this is the same as used in your auth routes

// Middleware to check if user is authenticated
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Middleware to check if user is admin
const adminMiddleware = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        const user = await User.findById(req.user.userId);
        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied, admin only' });
        }
        next();
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { authMiddleware, adminMiddleware };
