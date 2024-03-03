const express = require('express');
const router = express.Router();
const CommunityChapter = require('../models/CommunityChapter');

// Get all chapters
router.get('/', async (req, res) => {
    try {
        const chapters = await CommunityChapter.find();
        res.json(chapters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single chapter by ID
router.get('/:id', async (req, res) => {
    try {
        const chapter = await CommunityChapter.findById(req.params.id);
        if (!chapter) {
            return res.status(404).json({ error: 'Chapter not found' });
        }
        res.json(chapter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new chapter
router.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;
        const newChapter = new CommunityChapter({
            name,
            description
        });
        const savedChapter = await newChapter.save();
        res.status(201).json(savedChapter);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a chapter by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedChapter = await CommunityChapter.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedChapter) {
            return res.status(404).json({ error: 'Chapter not found' });
        }
        res.json(updatedChapter);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a chapter by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedChapter = await CommunityChapter.findByIdAndDelete(req.params.id);
        if (!deletedChapter) {
            return res.status(404).json({ error: 'Chapter not found' });
        }
        res.json({ message: 'Chapter deleted successfully', deletedChapter });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;
