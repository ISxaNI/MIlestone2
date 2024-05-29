const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  publishedAt: Date,
  thumbnails: {
    default: { url: String, width: Number, height: Number },
    medium: { url: String, width: Number, height: Number },
    high: { url: String, width: Number, height: Number },
  },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
