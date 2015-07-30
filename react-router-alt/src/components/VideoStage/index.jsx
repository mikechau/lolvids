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

function noop() {}

var VideoStage = React.createClass({
  propTypes: {
    video: React.PropTypes.shape({
      id: React.PropTypes.string,
      name: React.PropTypes.string,
      source: React.PropTypes.string,
      ts: React.PropTypes.string
    }).isRequired,
    endlessMode: React.PropTypes.bool,
    startCounter: React.PropTypes.number.isRequired,
    endCounter: React.PropTypes.number.isRequired,
    onNextVideo: React.PropTypes.func,
    onPreviousVideo: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      endlessMode: false,
      onNextVideo: noop,
      onPreviousVideo: noop
    };
  },

  componentDidMount: function() {
    this.addKeyEvents();
  },

  componentWillUnmount: function() {
    this.removeKeyEvents();
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
    this.props.onNextVideo();
  },

  handlePrevious: function() {
    this.props.onPreviousVideo();
  },

  handlePause: function() {
    this.refs.videoPlayer.togglePauseVideo();
  },

  render: function() {
    var video = this.props.video;

    return (
      <div>
        <div className="row vertical-align">
          <TransitionButton id="video-previous-action" direction="left" onClick={this.handlePrevious} />

          <div className="col-xs-10 col-md-10 text-center">
            <Video
              ref="videoPlayer"
              src={video.source}
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
            title={video.name}
            timestamp={video.ts}
            id={video.id}
            startIndex={this.props.startCounter}
            endIndex={this.props.endCounter}
          />
        </div>
      </div>
    );
  }
});

module.exports = VideoStage;
