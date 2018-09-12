const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users')

const port = process.env.PORT || 3000
var app = express();
var server = http.createServer(app)
var io = socketIO(server)
var users = new Users()

app.use(express.static('public'))

// io.on let's you register an event listener
// io.on('connection') let's you listen for a new connection
// meaning a client connected to the server
io.on('connection', (socket) => {
  console.log('New user connected')


  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required')
    }

    socket.join(params.room)
    users.removeUser(socket.id)
    users.addUser(socket.id,params.name,params.room)

    // socket.leave([roomName])

    // io.emit -- emit message to everyone connected
    // io.to([roomName]).emit -- send message to everyone connected to room
    // socket.broadcast -- everyone connected to the server except for the current user
    // socket.broadcast.to([roomName]).emit -- send to everyone in the room except for the current room
    // socket.emit -- emits event specifically to one user

    // socket.emit emits/sends a message to a single connection

    io.to(params.room).emit('updateUserList', users.getUserList(params.room))
    socket.emit('newMessage', generateMessage('Admin', `Welcome to ${params.room}`))

    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`))

    callback()
  })


  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message)
    io.emit('newMessage', generateMessage(message.from,message.text))
    callback('This is from the server')
    // io.emit emits an event to every single connection
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })

    // broadcasting is the term for emitting an event to everybody,
    // but one specific user
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room))
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))
    }
    
  })

  // socket.emit from Admin with text: "Welcome to the chat app"
  // socket.broadcast.emit from Admin with text: "New user joined"

  // socket has a method emit that will be used both in client and server
  // emit is really similar to listeners (on), although instead of listening
  // to events, emit creates events.
  // socket.emit('newEmail', {
  //   from:'hello@doe.com',
  //   text: 'This is a test',
  //   createdAt: '12345'
  // })
  //
  // socket.on('createEmail', (newEmail) => {
  //   console.log('Create email', newEmail)
  // })
})

server.listen(port, () => {
  console.log(`Started on port ${port}`);
})

module.exports = {app}
