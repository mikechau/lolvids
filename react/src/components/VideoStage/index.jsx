var React = require('react');
var TransitionButton = require('./components/TransitionButton');
var Video = require('./components/Video');
var Metadata = require('./components/Metadata');

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
    videos: React.PropTypes.array,
    endlessMode: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      videos: [],
      endlessMode: false
    };
  },

  getInitialState: function() {
    return {
      currentVideoIndex: 0
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
    return this.props.videos[currentVideoIndex] || {};
  },

  getTotalVideos: function() {
    return Math.max(0, this.props.videos.length - 1);
  },

  getVideoCounterStart: function() {
    return this.state.currentVideoIndex + 1;
  },

  getVideoCounterEnd: function() {
    return this.props.videos.length;
  },

  setCurrentVideoIndex: function(newIndex) {
    this.setState({
      currentVideoIndex: newIndex
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
        this.handlePrevious();
        break;
      case KEYS.arrow.right:
        this.handleNext();
        break;
      case KEYS.spacebar:
        this.handlePause();
        break;
      default:
        return true;
    }
  },

  handleNext: function() {
    var nextIndex = this.state.currentVideoIndex + 1;
    var newIndex;

    if ((nextIndex > -1) && (nextIndex <= this.getTotalVideos())) {
      newIndex = nextIndex;
    } else {
      newIndex = 0;
    }

    this.setCurrentVideoIndex(newIndex);
  },

  handlePrevious: function() {
    var prevIndex = this.state.currentVideoIndex - 1;
    var newIndex;

    if (prevIndex < 0) {
      newIndex = this.getTotalVideos();
    } else {
      newIndex = prevIndex;
    }

    this.setCurrentVideoIndex(newIndex);
  },

  handlePause: function() {
    this.refs.videoPlayer.togglePauseVideo();
  },

  render: function() {
    var currentVideo = this.getCurrentVideo();

    return (
      <div>
        <div className="row vertical-align">
          <TransitionButton id="video-previous-action" direction="left" onClick={this.handlePrevious} />

          <div className="col-xs-10 col-md-10 text-center">
            <Video
              ref="videoPlayer"
              src={currentVideo.source}
              endlessMode={this.props.endlessMode}
              resize
              resizeOptions={{
                aspectRatio: (10 / 21),
                shortWindowVideoHeightAdjustment: 80,
                defaultVideoWidthAdjustment: 30
              }}
              onNextVideo={this.handleNext}
            />
          </div>

          <TransitionButton id="video-next-action" direction="right" onClick={this.handleNext} />
        </div>

        <div className="row">
          <Metadata
            title={currentVideo.name}
            timestamp={currentVideo.ts}
            id={currentVideo.id}
            startIndex={this.getVideoCounterStart()}
            endIndex={this.getVideoCounterEnd()}
          />
        </div>
      </div>
    );
  }
});

module.exports = VideoStage;
