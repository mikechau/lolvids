var $ = require('./jquery.init');
var App = require('./app');
var VIDEOS_URL = '//jetclips.herokuapp.com/api/v1/videos/170901143077174';

// Map key codes.
var KEYS = {
  arrow: {
    left: 37,
    up: 38,
    right: 39,
    down: 40
  },
  spacebar: 32
};

// Include bootstrap javascript.
require('bootstrap');

// Include stylesheets.
require('video.js/dist/video-js/video-js.css');
require('./styles.css');

// Wait for DOM to be ready.
$(document).ready(function() {
  // Fetch VIDEOS.
  $.getJSON(VIDEOS_URL, function(data) {
    // Feed JSON into App.
    App.init({ data: data, $el: { spinner: $('#spinner'), content: $('#content') } });

    // Set up event listeners for key presses (right/left/spacebar).
    $('body').keydown(function(e) {
      var keyCode = e.which;

      switch (keyCode) {
        case KEYS.arrow.right:
          // Move to the next video.
          App.next();
          return true;
        case KEYS.arrow.left:
          // Move to the previous video.
          App.previous();
          return true;
        case KEYS.spacebar:
          // Pause or unpause video.
          App.togglePause();
          return true;
        default:
          return true;
      }
    });

    // Set up event listeners for click events (prev/next).
    $('.js-video-action').on('click', function(e) {
      // Capture the data attr from the event target
      // the user could be clicking the menu icon so
      // we need to find the closest .js-video-action
      // class to capture the correct data attribute.
      var action = $(e.target)
        .closest('.js-video-action')
        .data('video-action');

      // We call our app function, action could be
      // 'previous' or 'next'.
      App[action]();
    });

    // Attach event listeners for endless mode toggling.
    // Automatically calls App#next when enabled.
    // If endless mode off, enable it.
    // If endless mode on, disable it.
    $('#endless-mode-action').on('click', function(e) {
      e.preventDefault();

      App.toggleEndless();

      $(e.target)
        .parent()
        .toggleClass('active')
        .find('#endless-mode-status')
        .toggleText('Off', 'On');
    });
  });
});
