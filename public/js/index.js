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
  console.log('newMessage', message)
  var li = jQuery('<li></li>')
  li.text(`${message.from}: ${message.text}`)

  jQuery('#messages').append(li)
})

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hi',
// }, function (data) { // this function will fire when the acknoledgement arrives at the client
//   console.log('Got it', data);
// })

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault()
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  })
})
