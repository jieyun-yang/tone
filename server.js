var io = require('socket.io-client');
var socket = io.connect('http://localhost:8888');
socket.on('message', function (data) {
  console.log(data);
});