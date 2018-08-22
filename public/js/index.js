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
  var formattedTime = moment(message.createdAt).format('h:mm a')
  var li = jQuery('<li></li>')
  li.text(`${message.from} ${formattedTime}: ${message.text}`)

  jQuery('#messages').append(li)
})

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a')
  var li = jQuery('<li></li>')
  var a = jQuery('<a target="_blank">My current location</a>')

  li.text(`${message.from} ${formattedTime}: `)
  a.attr('href', message.url)
  li.append(a)
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
  var sendMessageButton = jQuery('#send-message')
  var messageTextbox = jQuery('[name=message]')
  sendMessageButton.attr("disabled", "disabled")
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('')
    sendMessageButton.removeAttr('disabled')
  })
})

var locationButton = jQuery('#send-location')
locationButton.on('click', function (e) {
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser')
  }

  var sendLocationButton = jQuery('#send-location')
  sendLocationButton.attr("disabled", "disabled")
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    sendLocationButton.removeAttr('disabled')
  }, function () {
    alert('Unable to fetch location')
    sendLocationButton.removeAttr('disabled')
  })
})
