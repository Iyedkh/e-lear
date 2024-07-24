const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./routes/auth'); // Ensure correct path to authRoutes
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
const sockets = require('./sockets');
const passport = require('./passport'); // Ensure passport.js is correctly configured
const { authMiddleware, adminMiddleware } = require('./middleware/auth');
// DATABASE CONNECTION
require('./config/connect'); // Ensure this file correctly connects to your database

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: 'C:\\Users\\user\\Desktop\\e-lear\\e-lear\\uploads', // Verify this path
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Socket.io connection
io.on('connection', sockets);

// Session and Passport setup
app.use(session({
    secret: 'test', // Use a secure secret
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes); // Ensure auth routes are set up correctly
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
app.use('/uploads', express.static('C:\\Users\\user\\Desktop\\e-lear\\e-lear\\uploads')); // Adjust this path as needed

// Route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).json({ message: 'File uploaded successfully' });
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
