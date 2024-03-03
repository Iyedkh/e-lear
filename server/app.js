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
const authRoutes = require('./routes/auth');
const discussionRoutes = require('./routes/discussionRoutes'); // Import discussion routes
const postRoutes = require('./routes/postRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const communityChaptersRoutes = require('./routes/communityChaptersRoutes');



const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const cors = require('cors');

app.use(cors());
app.use(express.json());


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
app.use('/auth', authRoutes);
app.use('/discussion', discussionRoutes); 
app.use('/api', postRoutes);
app.use('/recommendations', recommendationRoutes);
app.use('/community-chapters', communityChaptersRoutes);




// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
