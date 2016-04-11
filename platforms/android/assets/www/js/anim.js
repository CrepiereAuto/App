$(document).ready(function () {

  $('#progress-bar').on('mdl-componentupgraded', function(){
    $(this)[0].MaterialProgress.setProgress(60);
  });

  $('#cmd-btn').click(function () {
    $(this).hide("slide", {direction: "down"}, 100, function () {
      $(".cmd-machines").show("slide", {direction: "down"}, 300);
      $('#progress-bar')[0].MaterialProgress.setProgress(20);
    });
  });
  
});
