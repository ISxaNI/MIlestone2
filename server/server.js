const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const commentsRouter = require('./routes/comments');
const http = require('http');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/Milestone2';

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/comments', commentsRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const serverOptions = {
  maxHeaderSize: 32768
};

const server = http.createServer(serverOptions, app);

// MongoDB connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Catch-all handler for any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start server
server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
