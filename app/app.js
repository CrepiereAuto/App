// var $ = require('jquery');
var view = require('./view');
// var P2P = require('socket.io-p2p');
var io = require('socket.io-client');
var socket = io('http://localhost:3030');

var token = null;

view.set('Home');

socket.on('connect', function(){
  console.log('connected')
  socket.on('disconnect', function(){
    console.log('disconnected')
  })

  socket.emit('start', token)

  socket.on('token', function (data) {
    token = data
    console.log(token);
    socket.emit('join', '123')
  })
})
