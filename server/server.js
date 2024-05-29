const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const commentsRouter = require('./routes/comments')
const connectDB = require('./db');
const fetchAndSaveVideos = require('./server/models/youtubeData');


// Connect to MongoDB
connectDB();

fetchAndSaveVideos('');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// New route to handle search queries
app.post('/search', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    await fetchAndSaveVideos(query);
    res.status(200).json({ message: 'Videos fetched and saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching or saving videos', error: error.message });
  }
});

//


require('dotenv').config()
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(cors())
app.use('/api', commentsRouter)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to mongo on: ', process.env.MONGO_URI)
})

app.get('/', (req, res) => {
    res.send('')
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})