const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Create a new blog post
router.post('/posts', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = new Post({ title, content, author: req.user._id });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all blog posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single blog post by ID
router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username');
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a blog post by ID
router.put('/posts/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a blog post by ID
router.delete('/posts/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(deletedPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
