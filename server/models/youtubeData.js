const axios = require('axios');
const Video = require('./models/Video');
require('dotenv').config();

const fetchAndSaveVideos = async (query) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      },
    });

    const videos = response.data.items;

    for (const video of videos) {
      const videoData = {
        videoId: video.id.videoId,
        title: video.snippet.title,
        description: video.snippet.description,
        publishedAt: video.snippet.publishedAt,
        thumbnails: video.snippet.thumbnails,
      };

      // Save video to MongoDB
      const newVideo = new Video(videoData);
      await newVideo.save();
    }

    console.log('Videos saved successfully');
  } catch (error) {
    console.error('Error fetching or saving videos:', error.message);
  }
};

fetchAndSaveVideos()
