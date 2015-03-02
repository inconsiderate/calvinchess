$('document').ready(function() {
	$('#gamecanvas').hide();
});


// Background music toggle on and off
$("#music-toggle-off").hide()
$("#music-toggle-on").click(function() {
  $("#music-toggle-on").hide()
  $("#music-toggle-off").show()
  window.backgroundMusic.pause()
});
$("#music-toggle-off").click(function() {
  $("#music-toggle-on").show()
  $("#music-toggle-off").hide()
  window.backgroundMusic.play()
});
