var videojs = require('video.js');

videojs.options.flash.swf = require('file?name=[name]-[hash].[ext]!video.js/dist/video-js/video-js.swf');

var vjs = {
  init: function() {
    this.player = videojs('video-player', {
      height: 'auto',
      width: 'auto',
      preload: 'auto',
      autoplay: true,
      controls: true
    });
  },

  resize: function() {
    var player = this.player;
    var aspectRatio = 10 / 21;
    var vWidth = document.getElementById(player.id()).parentElement.offsetWidth;
    var vHeight = vWidth * aspectRatio;
    var winHeight = window.innerHeight;

    // Ensures videojs fits to the users viewable screen.
    if (winHeight < vHeight) {
      vHeight = winHeight - 80;
    }

    player.width(vWidth - 30).height(vHeight);
  }
};

module.exports = videojs;
