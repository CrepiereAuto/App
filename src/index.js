import iot from 'socket.io-iot'
import Views from './views'

// Collections
let commands = [{id: 2, progress: 60, todo: 4, done:2, name: 'Coucou'}]
let machins = []

// Initialisation of views
let views  = new Views(['home', 'machines', 'recipes', 'configure'])

$(".mdl-navigation__link").click(function(){
  let v = $(this).text()
  views.load(v.toLowerCase(), () => {
    $('#title').text(v);
  });
  $(".mdl-layout__obfuscator").add(".mdl-layout__drawer").removeClass("is-visible");
});

$(document).on('mdl-componentupgraded', '.mdl-progress', function() {
  let id = $(this).parents('.demo-card-wide').attr('id')
  let command = views.vdata.home.commands.find((item) => {
    return item.id == id
  })
  $(this)[0].MaterialProgress.setProgress(command.progress);
})

// Machines dialog
$(document).on('click', '#mchn-btn', function () {
  $("#mchn-dial")[0].showModal();
})
$(document).on('click', '#mchn-cancel', function () {
  $("#mchn-dial")[0].close();
})
$(document).on('click', '#mchn-add', function () {
  console.log($("#mchn-code").val());
  $("#mchn-dial")[0].close();
})

// Home add dialog
$(document).on('click', '#cmd-btn', function () {
  $("#cmd-dial")[0].showModal();
  $('#cmd-datetime-date').val(moment().format("YYYY-MM-DD"));
  $('#cmd-datetime-time').val(moment().format("HH:mm"));
})
$(document).on('click', '#cmd-dial-close', function () {
  $("#cmd-dial")[0].close();
})
$(document).on('click', '#cmd-dial-add', function () {
  var id = commands.length;
  var todo = $("#form-quantity").val();
  if (todo) {
    console.log(todo);
    // Command.add({
    //   id: id,
    //   date: null,
    //   todo: todo,
    //   done: null
    // });
  } else {
    console.log('We need at least one');
  }
  $("#cmd-dial")[0].close();
})
$(document).on('click', '#datetime-btn', function () {
  $("#cmd-datetime")[0].showModal();
})
$(document).on('click', '#cmd-datetime-close', function () {
  $("#cmd-datetime")[0].close();
})
$(document).on('click', '#cmd-datetime-validate', function () {
  var date = $('#cmd-datetime-date').val();
  var time = $('#cmd-datetime-time').val();
  var hours = time.split(":")[0];
  var minutes = time.split(":")[1];
  var dt = moment(date);
  dt.add(hours, "h");
  dt.add(minutes, "m");
  $("#datetime-txt").text(dt.format("HH:mm DD-MM-YY"));
  $("#cmd-datetime")[0].close();
})

views.edit('home', {commands: commands})
