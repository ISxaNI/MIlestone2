import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ setVideos }) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchYouTube = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: 'snippet',
          q: query,
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
          maxResults: 10
        }
      });
      setVideos(response.data.items);
    } catch (err) {
      setError('Failed to fetch videos');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={searchYouTube}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search YouTube"
        />
        <button type="submit">Search</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default SearchBar;
