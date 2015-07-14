var React = require('react');
var cx = require('classnames');
var vjs = require('video.js');
var _ = require('lodash');

var DEFAULT_HEIGHT = 800;
var DEFAULT_WIDTH = 600;
var DEFAULT_ASPECT_RATIO = (9 / 16);
var DEFAULT_ADJUSTED_SIZE = 0;
var DEFAULT_RESIZE_DEBOUNCE_TIME = 500;

function noop() {}

var Video = React.createClass({
  propTypes: {
    src: React.PropTypes.string.isRequired,
    pause: React.PropTypes.bool,
    endless: React.PropTypes.bool,
    options: React.PropTypes.object,
    onReady: React.PropTypes.func,
    eventListeners: React.PropTypes.object,
    resize: React.PropTypes.bool,
    resizeOptions: React.PropTypes.shape({
      aspectRatio: React.PropTypes.number,
      shortWindowVideoHeightAdjustment: React.PropTypes.number,
      defaultVideoWidthAdjustment: React.PropTypes.number,
      debounceTime: React.PropTypes.number
    }),
    vjsDefaultSkin: React.PropTypes.bool,
    vjsBigPlayCentered: React.PropTypes.bool,
    warningComponent: React.PropTypes.element,
    dispose: React.PropTypes.bool,
    onNextVideo: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      pause: false,
      endless: false,
      options: {
        preload: 'auto',
        autoplay: true,
        controls: true
      },
      onReady: noop,
      eventListeners: {},
      resize: false,
      resizeOptions: {},
      vjsDefaultSkin: true,
      vjsBigPlayCentered: true,
      onNextVideo: noop
    };
  },

  componentDidMount: function() {
    this.mountVideoPlayer();
  },

  componentWillReceiveProps: function(nextProps) {
    var isPaused = this.props.pause;
    var willBePaused = nextProps.pause;

    if (isPaused !== willBePaused) {
      var player = this._player;

      if (willBePaused) {
        player.pause();
      } else {
        player.play();
      }
    }

    var isEndless = this.props.endless;
    var willBeEndless = nextProps.endless;

    if (isEndless !== willBeEndless) {
      if (willBeEndless) {
        this.addEndlessMode();
      } else {
        this.removeEndlessMode();
      }
    }

    var isResizable = this.props.resize;
    var willBeResizeable = nextProps.resize;

    if (isResizable !== willBeResizeable) {
      if (willBeResizeable) {
        this.addResizeEventListener();
      } else {
        this.removeResizeEventListener();
      }
    }
  },

  shouldComponentUpdate: function() {
    return false;
  },

  componentWillUnmount: function() {
    this.unmountVideoPlayer();
  },

  getVideoPlayerEl: function() {
    return React.findDOMNode(this.refs.videoPlayer);
  },

  getVideoPlayerOptions: function() {
    return _.defaults({}, this.props.options, {
      height: this.props.resize ? 'auto' : (this.props.options.height || DEFAULT_HEIGHT),
      width: this.props.resize ? 'auto' : (this.props.options.width || DEFAULT_WIDTH)
    });
  },

  getVideoResizeOptions: function() {
    return _.defaults({}, this.props.resizeOptions, {
      aspectRatio: DEFAULT_ASPECT_RATIO,
      shortWindowVideoHeightAdjustment: DEFAULT_ADJUSTED_SIZE,
      defaultVideoWidthAdjustment: DEFAULT_ADJUSTED_SIZE,
      debounceTime: DEFAULT_RESIZE_DEBOUNCE_TIME
    });
  },

  mountVideoPlayer: function() {
    var src = this.props.src;
    var options = this.getVideoPlayerOptions();

    this._player = vjs(this.getVideoPlayerEl(), options);

    var player = this._player;

    player.ready(this.handleVideoPlayerReady);

    _.forEach(this.props.eventListeners, function(val, key) {
      player.on(key, val);
    });

    player.src(src);
  },

  unmountVideoPlayer: function() {
    this.removeResizeEventListener();
    // _.forEach(this.props.eventListeners, function(val, key) {
    //   this._player.off(key);
    // });

    this._player.off();
    this._player.dispose();
  },

  addEndlessMode: function() {
    var player = this._player;

    player.on('ended', this.handleNextVideo);

    if (player.ended()) {
      this.handleNextVideo();
    }
  },

  addResizeEventListener: function() {
    var debounceTime = this.getVideoResizeOptions().debounceTime;

    this._handleVideoPlayerResize = _.debounce(this.handleVideoPlayerResize, debounceTime);
    window.addEventListener('resize', this._handleVideoPlayerResize);
  },

  removeEndlessMode: function() {
    var player = this._player;

    player.off('ended', this.handleNextVideo);
  },

  removeResizeEventListener: function() {
    window.removeEventListener('resize', this._handleVideoPlayerResize);
  },

  handleVideoPlayerReady: function() {
    if (this.props.resize) {
      this.handleVideoPlayerResize();
      this.addResizeEventListener();
    }

    this.props.onReady();
  },

  handleVideoPlayerResize: function() {
    var player = this._player;
    var resizeOptions = this.getVideoResizeOptions();
    var aspectRatio = resizeOptions.aspectRatio;
    var vWidth = this.getVideoPlayerEl().parentElement.parentElement.offsetWidth;
    var vHeight = vWidth * aspectRatio;
    var winHeight = window.innerHeight;
    var defaultVideoWidthAdjustment = resizeOptions.defaultVideoWidthAdjustment;

    if (winHeight < vHeight) {
      var shortWindowVideoHeightAdjustment = resizeOptions.shortWindowVideoHeightAdjustment;
      vHeight = winHeight - shortWindowVideoHeightAdjustment;
    }

    player.width(vWidth - defaultVideoWidthAdjustment).height(vHeight);
  },

  handleNextVideo: function() {
    this.props.onNextVideo();
  },

  renderDefaultWarning: function() {
    return (
      <p className="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>.
      </p>
    );
  },

  render: function() {
    var videoPlayerClasses = cx({
      'video-js': true,
      'vjs-default-skin': this.props.vjsDefaultSkin,
      'vjs-big-play-centered': this.props.vjsBigPlayCentered
    });

    return (
      <video ref="videoPlayer" className={videoPlayerClasses}>
        {this.props.warningComponent || this.renderDefaultWarning()}
      </video>
    );
  }
});

module.exports = Video;
