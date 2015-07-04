var $ = require('jquery');
var videojs = require('video.js');
var KEYS = {
  arrow: {
    left: 37,
    up: 38,
    right: 39,
    down: 40
  }
};

window.$ = $;
window.jQuery = $;

require('bootstrap');
require('video.js/dist/video-js/video-js.css');

function noop() {}

$(document).ready(function() {
  var LOLVIDS = {
    data: [{}],
    index: 0,
    player: { src: noop },
    init: function(options) {
      this.data = options.data;
      this.index = 0;

      this.player = videojs('video-player', {
        height: 'auto',
        width: 'auto',
        preload: 'true',
        autoplay: 'true'
      });

      var resizePlayer = this._resizeVjsPlayer.bind(this);

      this.player.ready(resizePlayer);

      this.player.on('play', function() {
        this._updateVideoMetaDataUI();
      }.bind(this));

      window.onresize = resizePlayer;

      this.player.src(options.data[0].source);
    },
    serialize: function() {
      var video = this.video();

      return {
        index: this.index + 1,
        total: this.length() + 1,
        title: video.name,
        id: video.id,
        timestamp: video.ts
      };
    },
    video: function() {
      return this.data[this.index];
    },
    length: function() {
      return this.data.length;
    },
    next: function() {
      this._updateIndex(1);

      var video = this.video();

      this.player.src(video.source);

      return video;
    },
    _updateIndex: function(amount) {
      var newIndex = this.index + amount;
      var length = this.length();

      if (newIndex > length) {
        this.index = 0;

        return this.index;
      }

      if (newIndex < 0) {
        this.index = length;

        return this.index;
      }

      this.index = newIndex;

      return this.index;
    },
    _updateVideoMetaDataUI: function() {
      var metadata = this.serialize();

      $('#video-counter-start').text(metadata.index);
      $('#video-counter-end').text(metadata.total);
      $('#video-title').text(metadata.title);
      $('#video-id').text(metadata.id);
      $('#video-timestamp').text(metadata.timestamp);
    },
    _resizeVjsPlayer: function() {
      var player = this.player;
      var aspectRatio = 10 / 21;
      var vWidth = document.getElementById(player.id()).parentElement.offsetWidth;
      var vHeight = vWidth * aspectRatio;
      var winHeight = window.innerHeight;

      if (winHeight < vHeight) {
        vHeight = winHeight - 80;
      }

      player.width(vWidth - 30).height(vHeight);
    }
  };

  $.getJSON('http://jetclips.herokuapp.com/api/v1/videos/170901143077174', function(data) {
    LOLVIDS.init({ data: data });

    $('body').keydown(function(e) {
      var keyCode = e.which;

      switch (keyCode) {
        case KEYS.arrow.right:
          LOLVIDS.next();
          return true;
        default:
          return true;
      }
    });
  });
});
