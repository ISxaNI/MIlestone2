const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 3001;
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to mongo on: ', process.env.MONGO_URI)
})

app.get('/', (req, res) => {
    res.send('eat a dick')
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})