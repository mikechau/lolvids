var $ = require('jquery');
var videojs = require('video.js');

function noop() {}

// Set up a object literal to help us manage state.
var App = {

  // This is where the video data response will go.
  data: [{}],

  // Default to 0.
  index: 0,

  // Reference to videojs.
  player: { src: noop },

  // Our initialzer, we will pass data as a option param and then bootstrap videojs.
  init: function(options) {
    this.data = options.data;
    this.index = 0;

    this.player = videojs('video-player', {
      height: 'auto',
      width: 'auto',
      preload: 'auto',
      autoplay: true,
      controls: true
    });

    // Setup videojs event listeners.
    var resizePlayer = this._resizeVjsPlayer.bind(this);

    this.player.ready(resizePlayer);

    this.player.on('play', function() {
      this._updateVideoMetaDataUI();
    }.bind(this));

    this.player.on('error', function() {
      this.next();
    }.bind(this));

    // Make videojs responsive by listening to the onresize event handler.
    window.onresize = resizePlayer;

    // Update the source to the first item from our videos data response.
    // Autoplay is set to true, so the video will automatically play
    // upon source update. When the video plays, the 'play' event is triggered
    // and videojs will call #_updateVideoMetaDataUI which will update the
    // metadata.
    this.player.src(options.data[0].source);
  },

  // Serialization function, this is called when #_updateVideoMetaDataUI is triggered.
  serialize: function() {
    var video = this.video();

    return {
      // Set the index to + 1 because index starts at 0.
      index: this.index + 1,
      total: this.length(),
      title: video.name,
      id: video.id,
      timestamp: video.ts
    };
  },

  // Returns the current video object.
  video: function() {
    return this.data[this.index];
  },

  // Return the total amount of videos
  // This will be used by #_updateIndex. We subtract 1
  // because our indexes start at 0 not 1.
  total: function() {
    return this.data.length - 1;
  },

  // Returns the length of data
  length: function() {
    return this.data.length;
  },

  // Moves the index back by 1 and updates the player source.
  previous: function() {
    this._updateIndex(-1);

    var video = this.video();

    this.player.src(video.source);

    return video;
  },

  // Moves the index forward by 1 and updates the player source.
  next: function() {
    this._updateIndex(1);

    var video = this.video();

    this.player.src(video.source);

    return video;
  },

  // Switches the player status between playing/paused.
  // If the player is paused, call play.
  // If the player is playing, call pause.
  togglePause: function() {
    var isPaused = this.player.paused();

    if (isPaused) {
      this.player.play();
    } else {
      this.player.pause();
    }
  },

  // Update index function, pass it an amount to increment or decrement
  // the index by. Has guards to check if we are reaching indexes that don't exist.
  // If we are on the last index (data.length - 1), and we increment, reset to 0.
  // If we are on the first index (0), and we decrement, jump to the #total.
  _updateIndex: function(amount) {
    var newIndex = this.index + amount;
    var totalVideos = this.total();

    if (newIndex > totalVideos) {
      this.index = 0;

      return this.index;
    }

    if (newIndex < 0) {
      this.index = totalVideos;

      return this.index;
    }

    this.index = newIndex;

    return this.index;
  },

  // Updates the metadata content, first calls #serialize to fetch the correct data.
  _updateVideoMetaDataUI: function() {
    var metadata = this.serialize();

    $('#video-counter-start').text(metadata.index);
    $('#video-counter-end').text(metadata.total);
    $('#video-title').text(metadata.title);
    $('#video-id').text(metadata.id);
    $('#video-timestamp').text(metadata.timestamp);
  },

  // Makes videojs responsive...sorta.
  _resizeVjsPlayer: function() {
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

module.exports = App;
