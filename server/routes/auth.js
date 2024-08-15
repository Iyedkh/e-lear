const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const passport = require('passport');
const User = require('../models/User');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { OAuth2Client } = require('google-auth-library');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'test'; // Use environment variable for secret
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

// Create a Google OAuth2 client
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

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

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const imagePath = req.file ? req.file.path : null;

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

  try {
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
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


// Google OAuth route
router.get('/google', (req, res, next) => {
  console.log('Redirecting to Google OAuth...');
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false  // Ensure session is not used
  })(req, res, next);
});


// Google OAuth callback route
router.get('/google/callback', passport.authenticate('google', { session: false }), async (req, res) => {
  try {
    if (!req.user) {
      console.error('Authentication failed: No user found');
      return res.status(400).json({ error: 'Authentication failed.' });
    }

    console.log('Google OAuth successful');
    console.log('User:', req.user);

    // Create a JWT token
    const token = jwt.sign(
      { id: req.user.id, role: req.user.role },
      process.env.JWT_SECRET || 'test',
      { expiresIn: '1h' } // Ensure token expiration is as needed
    );

    console.log('Generated token:', token);

    // Redirect to client-side with the token
    res.redirect(`http://localhost:3001/home?token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmEzYmFiMDk3YTRjYzFmYjFkMDQ4MSIsImlhdCI6MTcyMzQ5MjUyMSwiZXhwIjoxNzIzNDk2MTIxfQ.QVZ4NLuUqcwVoyYEk8X8iBMdHFXcMiUihi-jgvI9tn4'`);
  } catch (error) {
    console.error('Error in Google OAuth callback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






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
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
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
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
