const Discussion = require('../models/Discussion');

exports.createDiscussion = async (req, res) => {
    try {
        const { content } = req.body;
        const newDiscussion = new Discussion({
            author: req.user, // Assuming req.user contains the ID of the logged-in user
            content
        });
        const savedDiscussion = await newDiscussion.save();
        res.status(201).json(savedDiscussion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
