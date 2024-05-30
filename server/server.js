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

app.use(express.static(path.join(__dirname, 'clients/build')));

require('dotenv').config()
const PORT = process.env.PORT || 5000;
app.use(express.json())
app.use(cors())
app.use('/api/comments', commentsRouter)

mongoose.connect('mongodb://localhost:27017/Milestone2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
    res.send('')
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})