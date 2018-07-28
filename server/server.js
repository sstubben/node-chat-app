const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io')

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server)

app.use(express.static('public'))

// io.on let's you register an event listener
// io.on('connection') let's you listen for a new connection
// meaning a client connected to the server
io.on('connection', (socket) => {
  console.log('New user connected')

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

  socket.emit('newMessage', {
    from: 'johndoe',
    text: 'Sending you a message!',
    createdAt: 987654321
  })

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from client')
  })

})

server.listen(port, () => {
  console.log(`Started on port ${port}`);
})

module.exports = {app}
