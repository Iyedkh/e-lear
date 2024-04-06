const express = require('express');
const http = require('http');
//DATABASE
require('./config/connect');
//Njyb Fl Routes
const faqRouter = require('./routes/faq');
const socketIo = require('socket.io');
const path = require('path');
const sockets = require('./sockets');
const ratingRoutes = require('./routes/rating');
const searchRoutes = require('./routes/search');
const messagingRoutes = require('./routes/messaging');
const commentingRoutes = require('./routes/commenting');
const courseRouter = require('./routes/courseRouter');
const certificateRoutes = require('./routes/certificateRoutes');
const progressRoutes = require('./routes/progressRoutes');
const rankRoutes = require('./routes/rankRoutes');

const discussionRoutes = require('./routes/discussionRoutes'); // Import discussion routes
const postRoutes = require('./routes/postRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const communityChaptersRoutes = require('./routes/communityChaptersRoutes');
const signInRoute = require('./routes/signinRoute'); 
const saveCourseRoute = require('./routes/save');
const multer = require('multer');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const cors = require('cors');

app.use(cors());
app.use(express.json());
// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: 'C:\\Users\\user\\Desktop\\e-lear\\e-lear\\uploads', // Specify the destination directory
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // File naming convention
    }
});


// Socket.io connection
io.on('connection', sockets);

// Routes
app.use('/rate-course', ratingRoutes);
app.use('/search', searchRoutes);
app.use('/message', messagingRoutes);
app.use('/comment-course', commentingRoutes);
app.use('/courses', courseRouter);
app.use('/api/faq', faqRouter);
app.use('/certificates', certificateRoutes);
app.use('/api', progressRoutes);
app.use('/api', rankRoutes);
app.use('/discussion', discussionRoutes); 
app.use('/api', postRoutes);
app.use('/recommendations', recommendationRoutes);
app.use('/community-chapters', communityChaptersRoutes);
app.use('/api/auth', signInRoute);
app.use('/api/savecourse', saveCourseRoute);


// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Set up Multer middleware
const upload = multer({ storage: storage });

// Route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
    // Handle file upload here (e.g., save file details to database)
    res.status(200).json({ message: 'File uploaded successfully' });
});


// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
