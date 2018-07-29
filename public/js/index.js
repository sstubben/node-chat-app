//initiating the request from the client to the server and keep it open
var socket = io();
// listen on connect event
socket.on('connect', function() {
  console.log('New user connected to server')

  // socket.emit('createMessage', {
  //   from: 'johndoe',
  //   text: 'I created a new message'
  // })
})

socket.on('disconnect', function() {
  console.log('Disconnected from server')
})

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
})
