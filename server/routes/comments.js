const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Get comments by video ID
router.get('/:videoId', async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId }).sort({ timestamp: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comments', error: error.message });
  }
});

// Post a new comment
router.post('/', async (req, res) => {
  const { username, comment, videoId } = req.body;

  if (!username || !comment || !videoId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newComment = new Comment({
      username,
      comment,
      videoId
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to post comment', error: error.message });
  }
});

module.exports = router;
