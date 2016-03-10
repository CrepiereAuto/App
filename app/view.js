'use strict';

var $ = require('jquery');

class view {
  constructor(){
    this.now = null;
    $(".mdl-navigation__link").click(function(){
      this.set($(this).text());
      $(".mdl-layout__obfuscator").add(".mdl-layout__drawer").removeClass("is-visible")
    });
  }
  set(viewId){
    $('#'+this.now).hide();
    this.now = viewId.toLowerCase();
    $('#'+this.now).show();
    $('#title').text(viewId);
  }
}

module.exports = new view;
