const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  videoId: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
