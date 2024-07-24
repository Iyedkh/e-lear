const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const session = require('express-session');
const passport = require('./passport'); // Ensure passport.js is correctly configured

// DATABASE CONNECTION
require('./config/connect'); // Ensure this file correctly connects to your database

// Import Routes
const authRoutes = require('./routes/auth');
const { authMiddleware, adminMiddleware } = require('./middleware/auth');
const faqRouter = require('./routes/faq');
const ratingRoutes = require('./routes/rating');
const searchRoutes = require('./routes/search');
const commentingRoutes = require('./routes/commenting');
const courseRouter = require('./routes/courseRouter');
const quizData = require('./routes/quizRoutes');
const saveCourseRoute = require('./routes/save');
const category = require('./routes/categoryFilter');
const categoryRoutes = require('./routes/categoryRoute');
const etlScript = require('./etlScript');
const averageRatings = require('./routes/averageRating');
const sockets = require('./sockets'); // Socket.io event handlers

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'uploads'), // Use path.join for better compatibility
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // File naming convention
    }
});
const upload = multer({ storage: storage });

// Socket.io connection
io.on('connection', sockets);

// Session and Passport setup
app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/admin', authMiddleware, adminMiddleware, (req, res) => {
    res.send('Admin area');
});
app.use('/category', category);
app.use('/rate-course', ratingRoutes);
app.use('/search', searchRoutes);
app.use('/comment', commentingRoutes);
app.use('/courses', courseRouter);
app.use('/api/faq', faqRouter);
app.use('/savecourse', saveCourseRoute);
app.use('/quiz', quizData);
app.use('/categories', categoryRoutes);
app.use('/average', averageRatings);

// ETL Route
app.get('/transformed-data', async (req, res) => {
    try {
        const transformedData = await etlScript.etl();
        res.json(transformedData);
    } catch (error) {
        console.error('Error fetching transformed data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Use path.join for better compatibility

// Route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).json({ message: 'File uploaded successfully' });
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));
  
  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });
// Middleware to check if user is authenticated
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

// Example of a protected route
app.get('/protected', isLoggedIn, (req, res) => {
    res.send('Hello, ' + req.user.username);
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
