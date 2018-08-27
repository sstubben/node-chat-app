//initiating the request from the client to the server and keep it open
var socket = io();

const scrollToBottom = () => {
  // Selectors:
  var messages = jQuery('#messages')
  var newMessage = messages.children('li:last-child')
  // Heights: 
  var clientHeight = messages.prop('clientHeight')
  var scrollTop = messages.prop('scrollTop')
  var scrollHeight = messages.prop('scrollHeight')
  var newMessageHeight = newMessage.innerHeight()
  var lastMessageHeight = newMessage.prev().innerHeight()

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight)    
  }
}
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
  var template = jQuery('#message-template').html()
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: moment(message.createdAt).format('h:mm a')
  })
  jQuery('#messages').append(html)
  scrollToBottom()

})

socket.on('newLocationMessage', function (message) {
  var template = jQuery('#location-message-template').html()
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: moment(message.createdAt).format('h:mm a')
  })
  jQuery('#messages').append(html)
  scrollToBottom()
})


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
