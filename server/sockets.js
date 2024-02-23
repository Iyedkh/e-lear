// sockets.js

// Sample data (can be replaced with a database)
let users = [];

module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Add user to the list of online users
        socket.on('join', (username) => {
            users.push({ id: socket.id, username });
            io.emit('userList', users.map(user => user.username));
        });

        // Handle private messaging
        socket.on('private message', (data) => {
            const { sender, recipient, message } = data;

            // Find recipient's socket ID
            const recipientSocket = users.find(user => user.username === recipient);

            if (recipientSocket) {
                // Send the message to the recipient
                io.to(recipientSocket.id).emit('private message', { sender, message });
            } else {
                // Notify sender that recipient is not online
                io.to(socket.id).emit('error', 'Recipient is not online');
            }
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
            
            // Remove user from the list of online users
            users = users.filter(user => user.id !== socket.id);
            io.emit('userList', users.map(user => user.username));
        });
    });
};
