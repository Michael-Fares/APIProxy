require('dotenv').config()
const express = require('express')
const cors = require('cors')
// rate limiting for any and all routes
const rateLimit = require('express-rate-limit')

const app = express()

//rate limiter

const limiter = rateLimit({
  windowMS: 60 * 1000, // 1min
  max: 25
})

app.use(limiter)

app.use(express.json())

app.use('/educationapi', require('./routes/education.js'))

app.use(cors())

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))
