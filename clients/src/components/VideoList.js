import React from 'react';

function VideoList({ videos, selectVideo }) {
  return (
    <ul>
      {videos.map((video) => (
        <li key={video.id.videoId} onClick={() => selectVideo(video)}>
          <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
          <p>{video.snippet.title}</p>
        </li>
      ))}
    </ul>
  );
}

export default VideoList;
