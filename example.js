$(function() {
  $("#basic").mousewheel(function(e) {
    $(this).html("<strong>Delta:</strong> " + e.delta + "<br />\
                 <strong>X:</strong> " + e.deltaX + "<br />\
                 <strong>Y:</strong> " + e.deltaY);
  });

  $("#direction").mousewheel(function(e) {
    // up, right: positive
    var dir = "";
    if (e.deltaY > 0) { dir = "up"; }
    else if (e.deltaY < 0) { dir = "down"; }
    if (e.deltaX > 0) { dir += " right"; }
    else if (e.deltaX < 0) { dir += " left"; }
    $(this).find("p").text("Direction: " + dir);
  });

  $("#data").mousewheel({ threshold: .25 }, function(e) {
    if (Math.abs(e.deltaY) >= e.data.threshold || Math.abs(e.deltaX) >= e.data.threshold) {
      $(this).text("Threshold met");
    }
    else { $(this).text("Too slow"); }
  });
});
