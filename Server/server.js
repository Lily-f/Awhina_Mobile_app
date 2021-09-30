const keys = require('./config/keys')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')

const users = require('./routes/api/users')
const mentoringSessions = require('./routes/api/mentoringSessions')
app.use(cors())

// middleware to read body of http requests
app.use(
  express.urlencoded({
    extended: false
  })
)
app.use(express.json())

// Connect to MongoDB
mongoose.connect(keys.database, {useNewUrlParser: true, useUnifiedTopology: true})
const mongooseConnection = mongoose.connection
mongooseConnection.once('open', () => {
  console.log('Succesfully established MongoDB database connection')
})

// Passport middleware for user tokens
app.use(passport.initialize())
require('./config/passport')(passport)

// Routes
app.use('/api/users', users)
app.use('/api/mentoring_sessions', mentoringSessions)

const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: '*'
  }
})
http.listen(keys.port, () => {
  console.log(`listening on port:${keys.port}`)
})

// TODO: move sockets to seperate file?
io.on('connection', (socket) => {
  console.log('new client connected')
  socket.emit('connection', null)
  
  socket.on('login', data => {
    console.log(`user tried to login with ${data.userName} and ${data.password}`)
  })

})
