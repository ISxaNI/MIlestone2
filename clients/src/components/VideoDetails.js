import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

async function fetchVideoById(videoId) {
    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
        params: {
          part: 'snippet',
          id: videoId,
          key: process.env.REACT_APP_YOUTUBE_API_KEY
        }
      });
      return response.data.items[0];
    } catch (error) {
      console.error('Error fetching video data:', error);
    }
  }

function VideoDetails({ video }) {
  const { videoId } = useParams();
  const [currentVideo, setCurrentVideo] = useState(video);

  useEffect(() => {
    if (!video || video.id.videoId !== videoId) {
      // Fetch the video details based on videoId if video is not already set or if the videoId is different
      // Assume fetchVideoById is a function to fetch video details by ID
      fetchVideoById(videoId).then((fetchedVideo) => setCurrentVideo(fetchedVideo));
    }
  }, [videoId, video]);

  const videoSrc = `https://www.youtube.com/embed/${videoId}`;

  if (!currentVideo) return <div>Loading...</div>;

  return (
    <div>
      <iframe
        title="video player"
        src={videoSrc}
        allowFullScreen
        frameBorder="0"
      />
      <h2>{currentVideo.snippet.title}</h2>
      <p>{currentVideo.snippet.description}</p>
    </div>
  );
}

export default VideoDetails;
