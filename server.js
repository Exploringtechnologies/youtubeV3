// server.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Serve the React app
app.use(express.static('build'));

// API route to get the YouTube video ID
app.get('/api/getVideoId', async (req, res) => {
  try {
    let videoId;

    // Check if a search query is provided
    if (req.query.search) {
      // Fetch the YouTube video ID based on the search query
      const searchResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            part: 'snippet',
            q: req.query.search,
            type: 'video',
            key: process.env.YOUTUBE_API_KEY,
          },
        }
      );

      // Extract the video ID from the search response
      videoId = searchResponse.data.items[0]?.id.videoId;
    } else {
      // Use a default video ID if no search query is provided
      videoId = '1oOfDfVttRo'; // Replace with your default video ID
    }

    res.json({ videoId, apiKey: process.env.YOUTUBE_API_KEY });
  } catch (error) {
    console.error('Error fetching video ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
