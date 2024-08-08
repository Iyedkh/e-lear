const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./routes/auth');
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
const passport = require('./passport');
const { authMiddleware, adminMiddleware } = require('./middleware/auth');


// Load environment variables
require('dotenv').config();

// DATABASE CONNECTION
require('./config/connect');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

// Set up Multer storage configuration for images
const uploadPath = path.join(__dirname, 'uploads');
const storage = multer.diskStorage({
    destination: uploadPath,
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Socket.io connection
io.on('connection', sockets);

// Session and Passport setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'test', // Use a secure secret from environment variables
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
app.use('/uploads', express.static(uploadPath));

// Route for file upload (images)
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
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
