const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const commentsRouter = require('./routes/comments')
const path = require('path')

app.use(express.static(path.join(__dirname, 'client/build')));

require('dotenv').config()
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(cors())
app.use('/api', commentsRouter)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to mongo on: ', process.env.MONGO_URI)
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });

app.get('/', (req, res) => {
    res.send('eat a dick')
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})