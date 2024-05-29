import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import CommentBox from './components/CommentBox';

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="App">
      <SearchBar setVideos={setVideos} />
      {selectedVideo && <CommentBox videoId={selectedVideo.id.videoId} />}
      <VideoList videos={videos} selectVideo={setSelectedVideo} />
    </div>
  );
}

export default App;
