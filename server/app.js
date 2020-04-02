"use strict"

require('dotenv').config()

const cors = require('cors')
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const MONGODB_URI = process.env.MONGODB_URL || 'mongodb://localhost:27017/mdmedia'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false, family: 4 })
    .then(() => {
        console.log('connected')
    })
    .catch(() => {
        console.log('connection failed')
    })

app.use('/', routes)
app.use(errorHandler)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
