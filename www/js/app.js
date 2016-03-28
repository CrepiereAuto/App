(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./lib/view":2}],2:[function(require,module,exports){
'use strict';

class view {
  constructor(){
    this.now = null;
    var self = this;
    $(".mdl-navigation__link").click(function(){
      self.set($(this).text());
      $(".mdl-layout__obfuscator").add(".mdl-layout__drawer").removeClass("is-visible");
    });
  }
  set(viewId){
    $('#'+this.now).hide();
    this.now = viewId.toLowerCase();
    $('#'+this.now).show();
    $('#title').text(viewId);
  }
}

module.exports = new view();

},{}]},{},[1]);
