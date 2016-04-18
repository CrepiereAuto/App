// View manager
var View = {
  now: null,
  set: function (viewId) {
    $('#'+this.now).hide();
    this.now = viewId.toLowerCase();
    $('#'+this.now).show();
    $('#title').text(viewId);
  }
};

$(".mdl-navigation__link").click(function(){
  View.set($(this).text());
  $(".mdl-layout__obfuscator").add(".mdl-layout__drawer").removeClass("is-visible");
});

View.set('Home');

// Commands manager
var Command = {
  items: [{id: 0, date: "", todo: 5, done: 1}],
  add: function (params) {
    this.items.push(params);
  },
  updates: function (params) {

  }
};

// View Home
$('#progress-bar').on('mdl-componentupgraded', function(){
  $(this)[0].MaterialProgress.setProgress(60);
});

$("#cmd-btn").click(function () {
  $("#cmd-dial")[0].showModal();
  $('#cmd-datetime-date').val(moment().format("YYYY-MM-DD"));
  $('#cmd-datetime-time').val(moment().format("HH:mm"));
});

$("#cmd-dial-close").click(function () {
  $("#cmd-dial")[0].close();
});

$("#cmd-dial-add").click(function () {
  var id = Command.items[Command.items.length-1].id + 1;
  var todo = $("#form-quantity").val();
  if (todo) {
    Command.add({
      id: id,
      date: null,
      todo: $("#form-quantity").val(),
      done: null
  });
} else {
  console.log('We need at least one');
}
  $("#cmd-dial")[0].close();
});

$("#datetime-btn").click(function () {
  $("#cmd-datetime")[0].showModal();
});

$("#cmd-datetime-close").click(function () {
  $("#cmd-datetime")[0].close();
});

$("#cmd-datetime-validate").click(function () {
  var date = $('#cmd-datetime-date').val();
  var time = $('#cmd-datetime-time').val();
  var hours = time.split(":")[0];
  var minutes = time.split(":")[1];
  var dt = moment(date);
  dt.add(hours, "h");
  dt.add(minutes, "m");
  $("#datetime-txt").text(dt.format("HH:mm DD-MM-YY"));
  $("#cmd-datetime")[0].close();
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

// Fonctions
function viewCompile(name, data) {
  $.get('templates/'+name+'.html', function (file) {
    console.log( Handlebars.compile(file)(data));
    return Handlebars.compile(file)(data);
  });
}
