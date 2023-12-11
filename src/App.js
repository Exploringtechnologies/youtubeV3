// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [videoId, setVideoId] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = async () => {
    try {
      // Fetch video details using the provided video ID
      const response = await axios.get('/api/getVideoDetails', {
        params: {
          videoId: searchInput,
        },
      });

      // Set the video ID to play
      setVideoId(response.data.videoId);
    } catch (error) {
      console.error('Error fetching video details:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <header className="bg-gray-800 text-white p-4">
        <nav>
          <div className="text-xl font-bold">YouTube Player</div>
        </nav>
      </header>
      <main className="flex flex-col items-center mt-4">
        <div className="w-full max-w-screen-md">
          <div className="relative aspect-w-16 aspect-h-9 mb-4">
            {videoId && (
              <iframe
                title="YouTube Video Player"
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter YouTube Video ID"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Search
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
