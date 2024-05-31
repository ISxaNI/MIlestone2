import React from 'react';

function VideoList({ videos, selectVideo }) {
  return (
    <ul>
      {videos.map((video) => (
        <li 
          key={video.id.videoId} 
          onClick={() => selectVideo(video)}
          role="button"
          tabIndex="0"
          onKeyDown={(e) => { if (e.key === 'Enter') selectVideo(video); }}
          style={{ cursor: 'pointer', listStyleType: 'none', margin: '10px 0' }}
        >
          <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
          <p>{video.snippet.title}</p>
        </li>
      ))}
    </ul>
  );
}

export default VideoList;
