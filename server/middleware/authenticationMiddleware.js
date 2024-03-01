const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware function to authenticate user using JWT token
const authenticateUser = async (req, res, next) => {
    try {
        // Get token from request headers
        const token = req.header('Authorization').replace('Bearer ', '');
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user by ID and token
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        // Attach user and token to request for further usage
        req.token = token;
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};

module.exports = authenticateUser;
