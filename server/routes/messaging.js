const express = require('express');
const router = express.Router();

// Sample data (can be replaced with a database)
let conversations = [];

// Route to handle sending a message
router.post('/send', (req, res) => {
    const { sender, recipient, message } = req.body;

    // Find or create a conversation between sender and recipient
    let conversation = conversations.find(convo => 
        (convo.sender === sender && convo.recipient === recipient) || 
        (convo.sender === recipient && convo.recipient === sender)
    );

    if (!conversation) {
        conversation = { sender, recipient, messages: [] };
        conversations.push(conversation);
    }

    // Add the message to the conversation
    conversation.messages.push({ sender, message });

    res.status(200).send('Message sent successfully');
});

// Route to handle retrieving messages in a conversation
router.get('/conversation', (req, res) => {
    const { user1, user2 } = req.query;

    // Find the conversation between user1 and user2
    const conversation = conversations.find(convo => 
        (convo.sender === user1 && convo.recipient === user2) || 
        (convo.sender === user2 && convo.recipient === user1)
    );

    if (conversation) {
        res.json(conversation.messages);
    } else {
        res.status(404).send('Conversation not found');
    }
});

module.exports = router;
