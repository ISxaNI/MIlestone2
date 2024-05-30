const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const commentsRouter = require('./routes/comments')
const path = require('path')

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
    res.send('eat a dick')
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})