const express = require('express');
const http = require('http');
require('./config/connect');
const faqRouter = require('./routes/faq');
const socketIo = require('socket.io');
const path = require('path');
const sockets = require('./sockets');
const ratingRoutes = require('./routes/rating');
const searchRoutes = require('./routes/search');
const messagingRoutes = require('./routes/messaging');
const commentingRoutes = require('./routes/commenting');
const courseRouter = require('./routes/courseRouter');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);
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
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
