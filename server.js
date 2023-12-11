// server.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Serve the React app
app.use(express.static('build'));

// API route to get the YouTube video details based on the video ID
app.get('/api/getVideoDetails', async (req, res) => {
  try {
    // Check if a video ID is provided
    if (!req.query.videoId) {
      return res.status(400).json({ error: 'Video ID is required.' });
    }

    // Fetch video details using the provided video ID
    const videoDetailsResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos`,
      {
        params: {
          part: 'snippet,contentDetails,statistics',
          id: req.query.videoId,
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );

    // Check if the video ID corresponds to an unlisted video
    const isVideoUnlisted =
      videoDetailsResponse.data.items.length > 0 &&
      videoDetailsResponse.data.items[0].status.privacyStatus === 'unlisted';

    if (!isVideoUnlisted) {
      return res.status(404).json({ error: 'Unlisted video not found.' });
    }

    // Return the video details
    res.json({
      videoId: req.query.videoId,
      apiKey: process.env.YOUTUBE_API_KEY,
    });
  } catch (error) {
    console.error('Error fetching video details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
