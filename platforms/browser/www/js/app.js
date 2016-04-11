// View manager
var view = {
  now: null,
  set: function (viewId) {
    $('#'+this.now).hide();
    this.now = viewId.toLowerCase();
    $('#'+this.now).show();
    $('#title').text(viewId);
  }
};

$(".mdl-navigation__link").click(function(){
  view.set($(this).text());
  $(".mdl-layout__obfuscator").add(".mdl-layout__drawer").removeClass("is-visible");
});

view.set('Home');

//Home manager
$('#progress-bar').on('mdl-componentupgraded', function(){
  $(this)[0].MaterialProgress.setProgress(60);
});

$("#cmd-btn").click(function () {
  $("#cmd-dial")[0].showModal();
});

$("#cmd-dial-close").click(function () {
  $("#cmd-dial")[0].close();
});

//Socket manager
// var socket = io('http://localhost:3030');
// var token = 'Fklk7ThAPcSbgaba';
//
// socket.on('connect', function(){
//   console.log('connected');
//   socket.on('disconnect', function(){
//     console.log('disconnected');
//   });
//
//   socket.emit('start', token);
//
//   socket.on('token', function (data) {
//     token = data
//     console.log(token);
//   })
//
//   socket.on('join', function (data) {
//     console.log(data);
//   })
//
//   setTimeout(function () {
//     socket.emit('join', '123')
//   },5000)
//
//   setTimeout(function () {
//     console.log('update');
//     socket.emit('update', {station: 0, changes: {todo: 25, done: 6}});
//   },10000);
// });
