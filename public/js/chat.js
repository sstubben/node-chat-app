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
  var params = jQuery.deparam(window.location.search)

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err)
      window.location.href = '/'
    } else {
      console.log('No error')
    }

  })
})

socket.on('disconnect', function() {
  console.log('User disconnected');
})

socket.on('updateUserList', function (users)  {
  var ol = jQuery('<ol></ol>')

  users.forEach(function(user) {
    ol.append(jQuery('<li></li>').text(user))
  });
  
  jQuery('#users').html(ol)
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
