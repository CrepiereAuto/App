import iot from 'socket.io-iot'
import Views from './views'

// Collections
let commands = [{room: 'ex', progress: 60, todo: 4, done:2, name: 'Exemple'}]
let machines = [{name: "Exemple", room: 'ex'}]

// Initialisation of socket
var rsb = new iot('http://82.240.88.61:3030', "client")
rsb.on('connect', () => {
  console.log('co')
})

// Initialisation of views
let views  = new Views(['home', 'machines', 'configure'])

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
    return item.room == id
  })
  $(this)[0].MaterialProgress.setProgress(command.progress);
})

// Machines dialog
$(document).on('click', '#mchn-btn', function () {
  $("#machine-dial")[0].showModal();
})
$(document).on('click', '#machine-cancel', function () {
  resetMachine()
})
$(document).on('submit', '#machine-form', function (e) {
  e.preventDefault()
  let name = $("#machine-name").val()
  let code = $("#machine-code").val()
  rsb.link(code).then((room) => {
    machines.push({name, room})
    views.edit('machines', {machines})
    views.edit('home', {commands, machines})
    rsb.send('get', {}, room)
  }).catch((err) => {
    console.error(err);
  })
  resetMachine()
})
function resetMachine() {
  $('#machine-form').trigger("reset")
  $('#machine-dial')[0].close()
}

// Home add dialog
$(document).on('click', '#cmd-btn', function () {
  $(".cmd-machines").show()
  $(this).hide()
  // $("#cmd-dial")[0].showModal();
  // $('#cmd-datetime-date').val(moment().format("YYYY-MM-DD"));
  // $('#cmd-datetime-time').val(moment().format("HH:mm"));
})
$(document).on('click', '.cmd-machine-btn', function () {
  let room = $(this).attr('id').split('#')[1]
  $("#add-dial")[0].showModal();
  $("#add-room").val(room)
  $(".cmd-machines").hide()
  $("#cmd-btn").show()
  // $('#cmd-datetime-date').val(moment().format("YYYY-MM-DD"));
  // $('#cmd-datetime-time').val(moment().format("HH:mm"));
  // $('#form-room').val(room)
})
// $(document).on('click', '#cmd-dial-close', function () {
//   $("#cmd-dial")[0].close();
// })
$(document).on('submit', '#add-form', function (e) {
  e.preventDefault()
  let todo = $("#add-quantity").val();
  let room = $("#add-room").val();
  console.log(room);
  if (todo) {
    console.log(todo, room);
    let i = commands.findIndex((o) => {
      return o.room == room
    })
    if (i == -1) {
      rsb.send('command', {todo}, room)
    } else {
      // $("#snackbar")[0].MaterialSnackbar.showSnackbar({
      //   message: 'Machin occupied'
      // });
    }
  } else {
    // $("#snackbar")[0].MaterialSnackbar.showSnackbar({
    //   message: 'Need something to do'
    // });
  }
  addReset()
})
$(document).on('click', '#add-cancel', () => {
  addReset()
})
// $(document).on('click', '#datetime-btn', function () {
//   $("#cmd-datetime")[0].showModal();
// })
// $(document).on('click', '#cmd-datetime-close', function () {
//   $("#cmd-datetime")[0].close();
// })
// $(document).on('click', '#cmd-datetime-validate', function () {
//   var date = $('#cmd-datetime-date').val();
//   var time = $('#cmd-datetime-time').val();
//   var hours = time.split(":")[0];
//   var minutes = time.split(":")[1];
//   var dt = moment(date);
//   dt.add(hours, "h");
//   dt.add(minutes, "m");
//   $("#datetime-txt").text(dt.format("HH:mm DD-MM-YY"));
//   $("#cmd-datetime")[0].close();
// })
function addReset() {
  $('#add-form').trigger("reset")
  $('#add-dial')[0].close()
}

// Home modify dialog
$(document).on('click', '.modify-btn', function() {
  let r = $(this).parents('.demo-card-wide').attr('id')
  $('#modify-room').val(r)
  $('#modify-dial')[0].showModal()
})
$(document).on('submit', '#modify-form', (e) => {
  e.preventDefault()
  let room = $('#modify-room').val()
  let todo = $('#modify-quantity').val()
  let i = commands.findIndex((o) => {
    return o.room == room
  })
  if (todo > commands[i].done) {
    rsb.send('command', {todo}, room)
  }
  modifyReset()
})
$(document).on('click', '#modify-cancel', () => {
  modifyReset()
})
function modifyReset() {
  $('#modify-form').trigger("reset")
  $('#modify-dial')[0].close()
}

// Rasberry events
rsb.on('command', (c) => {
  let y = indexCommand(c)
  if (y > -1) {
    c.name = commands[y].name
    commands[y] = c
  } else {
    let i = indexMachine(c)
    if (i > -1) {
      c.name = machines[i].name
    } else {
      c.name = 'unknown'
    }
    if (c.todo > 0 && c.todo > c.done) {
      commands.push(c)
    }
  }
  if (c.todo == c.done) {
    setTimeout(() => {
      let y = indexCommand(c)
      if (y > -1) {
        commands.splice(y,1)
        views.edit('home', {commands, machines})
      }
    }, 2000)
  }
  views.edit('home', {commands, machines})
})
function indexCommand(c) {
  return commands.findIndex((o) => {
    return o.room == c.room
  })
}
function indexMachine(c) {
  return machines.findIndex((o) => {
    return o.room == c.room
  })
}

views.edit('machines', {machines})
views.edit('home', {commands, machines})
