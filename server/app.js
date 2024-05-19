const express = require('express');
const http = require('http'); 
const socketIo = require('socket.io');
const path = require('path');
const multer = require('multer');
const cors = require('cors');

// DATABASE CONNECTION
require('./config/connect'); // Ensure this file correctly connects to your database

// Import Routes
const authRoutes = require('./routes/auth');
const { authMiddleware, adminMiddleware } = require('./middleware/auth');
const faqRouter = require('./routes/faq');
const ratingRoutes = require('./routes/rating');
const searchRoutes = require('./routes/search');
const messagingRoutes = require('./routes/messaging');
const commentingRoutes = require('./routes/commenting');
const courseRouter = require('./routes/courseRouter');
const certificateRoutes = require('./routes/certificateRoutes');
const progressRoutes = require('./routes/progressRoutes');
const rankRoutes = require('./routes/rankRoutes');
const quizData = require('./routes/quizRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const postRoutes = require('./routes/postRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const communityChaptersRoutes = require('./routes/communityChaptersRoutes');
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
    destination: 'C:\\Users\\user\\Desktop\\e-lear\\e-lear\\uploads', // Verify this path
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // File naming convention
    }
});
const upload = multer({ storage: storage });

// Socket.io connection
io.on('connection', sockets);

// Routes
app.use('/auth', authRoutes);
app.use('/admin', authMiddleware, adminMiddleware, (req, res) => {
    res.send('Admin area');
});
app.use('/category', category);
app.use('/rate-course', ratingRoutes);
app.use('/search', searchRoutes);
app.use('/message', messagingRoutes);
app.use('/comment', commentingRoutes);
app.use('/courses', courseRouter);
app.use('/api/faq', faqRouter);
app.use('/certificates', certificateRoutes);
app.use('/api', progressRoutes);
app.use('/api', rankRoutes);
app.use('/discussion', discussionRoutes); 
app.use('/api', postRoutes);
app.use('/recommendations', recommendationRoutes);
app.use('/community-chapters', communityChaptersRoutes);
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
app.use('/uploads', express.static('C:\\Users\\user\\Desktop\\e-lear\\e-lear\\uploads')); // Ensure this path

// Route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).json({ message: 'File uploaded successfully' });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
