const axios = require('axios');
const Video = require('./models/Video');
require('dotenv').config();

const fetchAndSaveVideos = async (query) => {
  if (!query) {
    console.error('No query provided for fetching videos');
    return;
  }

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        key: process.env.REACT_APP_YOUTUBE_API_KEY, 
      },
    });

    const videos = response.data.items.map(video => ({
      videoId: video.id.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      publishedAt: video.snippet.publishedAt,
      thumbnails: video.snippet.thumbnails,
    }));

    // Save all videos concurrently
    await Promise.all(videos.map(videoData => {
      const newVideo = new Video(videoData);
      return newVideo.save();
    }));

    console.log('Videos saved successfully');
  } catch (error) {
    console.error('Error fetching or saving videos:', error.message);
    throw error; 
  }
};

fetchAndSavevideos('commentsData');  // Example usage
