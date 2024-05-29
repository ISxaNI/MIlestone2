import React from 'react';

function VideoList({ videos, selectVideo }) {
  return (
    <ul>
      {videos.map((video) => (
        <li key={video.id.videoId} onClick={() => selectVideo(video)}>
                    <p>{video.snippet.title}</p>
          <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
        </li>
      ))}
    </ul>
  );
}

export default VideoList;
