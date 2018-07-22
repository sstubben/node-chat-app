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
  console.log('New user connected');
  socket.on('disconnect', () => {
    console.log('Disconnected from client');
  })
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
})

module.exports = {app}
