import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import CommentBox from './components/CommentBox';

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="App">
      <h1>OurTube</h1>
      <SearchBar setVideos={setVideos} />
      {selectedVideo ? (
        <>
          <div className="video-detail">
            <iframe
              title={selectedVideo.snippet.title}
              src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
              allowFullScreen
              frameBorder="0"
            ></iframe>
            <h2>{selectedVideo.snippet.title}</h2>
            <p>{selectedVideo.snippet.description}</p>
          </div>
          <CommentBox videoId={selectedVideo.id.videoId} />
        </>
      ) : (
        <p>No video selected. Please search and select a video.</p>
      )}
      <VideoList videos={videos} selectVideo={setSelectedVideo} />
    </div>
  );
}

export default App;
