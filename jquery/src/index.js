var $ = require('jquery');
window.$ = $;
window.jQuery = $;

require('bootstrap');

$(document).ready(function() {
  var VIDEOS;
  var initialVideo;

  $.getJSON('http://jetclips.herokuapp.com/api/v1/videos/170901143077174', function(data) {
    VIDEOS = data;
    initialVideo = data[0] || {};

    $('#video-counter-start').text(1);
    $('#video-counter-end').text(data.length);
    $('#video-title').text(initialVideo.name);
    $('#video-id').text(initialVideo.id);
    $('#video-timestamp').text(initialVideo.ts);
  });
});
