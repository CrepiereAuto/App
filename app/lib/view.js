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
