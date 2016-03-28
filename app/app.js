view = require('./lib/view');
view.set('Home');

var socket = io('http://localhost:3030');
var token = 'Fklk7ThAPcSbgaba';

socket.on('connect', function(){
  console.log('connected');
  socket.on('disconnect', function(){
    console.log('disconnected');
  });

  socket.emit('start', token);

  // socket.on('token', function (data) {
  //   token = data
  //   console.log(token);
  // })
  //
  // socket.on('join', function (data) {
  //   console.log(data);
  // })
  //
  // setTimeout(function () {
  //   socket.emit('join', '123')
  // },5000)

  setTimeout(function () {
    console.log('update');
    socket.emit('update', {station: 0, changes: {todo: 25, done: 6}});
  },10000);
});
