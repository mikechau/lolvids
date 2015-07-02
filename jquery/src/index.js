var $ = require('jquery');
window.$ = $;
window.jQuery = $;
window.VIDEOS = [];

require('bootstrap');

$(document).ready(function() {
  var video;

  $.getJSON('http://jetclips.herokuapp.com/api/v1/videos/170901143077174', function(data) {
    window.VIDEOS = data;
    video = data[0];

    $('#video-counter-start').text(1);
    // $('#video-counter-end').text(data.length);
  });
});
