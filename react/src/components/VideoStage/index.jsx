var React = require('react');
var TransitionButton = require('./components/TransitionButton');
var Video = require('./components/Video');

var KEYS = {
  arrow: {
    left: 37,
    up: 38,
    right: 39,
    down: 40
  },
  spacebar: 32
};

var VideoStage = React.createClass({
  propTypes: {
    videos: React.PropTypes.array
  },

  getDefaultProps: function() {
    return {
      videos: []
    };
  },

  getInitialState: function() {
    return {
      currentVideoIndex: 0,
      pause: false
    };
  },

  componentDidMount: function() {
    this.addKeyEvents();
  },

  componentWillUnmount: function() {
    this.removeKeyEvents();
  },

  getCurrentVideo: function() {
    var currentVideoIndex = this.state.currentVideoIndex;
    return this.props.videos[currentVideoIndex];
  },

  getTotalVideos: function() {
    return Math.max(0, this.props.videos.length - 1);
  },

  setCurrentVideoIndex: function(newIndex) {
    this.setState({
      currentVideoIndex: newIndex
    });
  },

  setTogglePause: function() {
    var pauseState = this.state.pause;

    this.setState({
      pause: !pauseState
    });
  },

  addKeyEvents: function() {
    document.body.addEventListener('keydown', this.handleKeyPress);
  },

  removeKeyEvents: function() {
    document.body.removeEventListener('keydown', this.handleKeyPress);
  },

  handleKeyPress: function(e) {
    var keyCode = e.keyCode;

    switch (keyCode) {
      case KEYS.arrow.left:
        this.handlePrevious(e);
        break;
      case KEYS.arrow.right:
        this.handleNext(e);
        break;
      case KEYS.spacebar:
        this.handlePause(e);
        break;
      default:
        return true;
    }
  },

  handleNext: function(e) {
    e.preventDefault();

    var nextIndex = this.state.currentVideoIndex + 1;
    var newIndex;

    if ((nextIndex > -1) && (nextIndex <= this.getTotalVideos())) {
      newIndex = nextIndex;
    } else {
      newIndex = 0;
    }

    this.setCurrentVideoIndex(newIndex);
  },

  handlePrevious: function(e) {
    e.preventDefault();

    var prevIndex = this.state.currentVideoIndex - 1;
    var newIndex;

    if (prevIndex < 0) {
      newIndex = this.getTotalVideos();
    } else {
      newIndex = prevIndex;
    }

    this.setCurrentVideoIndex(newIndex);
  },

  handlePause: function(e) {
    e.preventDefault();

    this.setTogglePause();
  },

  render: function() {
    var currentVideo = this.getCurrentVideo();
    var pause = this.state.pause;

    return (
      <div className="row vertical-align">
        <TransitionButton direction="left" onClick={this.handlePrevious} />

        <div className="col-xs-10 col-md-10 text-center">
          <Video
            src={currentVideo}
            pause={pause}
            resize
            resizeOptions={{
              aspectRatio: (10 / 21),
              shortWindowVideoHeightAdjustment: 80,
              defaultVideoWidthAdjustment: 30
            }}
          />
        </div>

        <TransitionButton direction="right" onClick={this.handleNext} />
      </div>
    );
  }
});

module.exports = VideoStage;
