import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ setVideos }) {
  const [query, setQuery] = useState('');

  const searchYouTube = async (e) => {
    e.preventDefault();
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
      params: {
        part: 'snippet',
        q: query,
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
        maxResults: 10
      }
    });
    setVideos(response.data.items);
  };

  return (
    <form onSubmit={searchYouTube}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search YouTube"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;

