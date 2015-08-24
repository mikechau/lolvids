var React = require('react');
var Router = require('react-router');

var videosStore = require('../flux/stores/VideosStore').videosStore;
var videosActions = require('../flux/actions/VideosActions');

var VideoStage = require('./VideoStage');
var Spinner = require('./Spinner');

var VideosContainer = React.createClass({
  propTypes: {
    endlessMode: React.PropTypes.bool.isRequired,
    router: React.PropTypes.object
  },

  mixins: [Router.State, Router.Navigation],

  getDefaultProps: function() {
    return {
      router: {}
    };
  },

  getInitialState: function() {
    return videosStore.getVideoState();
  },

  componentDidMount: function() {
    videosStore.listen(this.handleVideosUpdate);

    var videoId = this.getParams().videoId;
    videosActions.fetchVideos(videoId);
  },

  componentWillUpdate: function(nextProps) {
    var currentVideoId = this.props.router.params.videoId;
    var nextVideoId = nextProps.router.params.videoId;
    var nextRouterAction = nextProps.router.action;

    if ((currentVideoId !== nextVideoId) && (nextRouterAction === 'pop')) {
      var videoId = nextProps.router.params.videoId;
      var video = videosStore.getVideoStateById(videoId);

      this.setState(video);
    }
  },

  componentWillUnmount: function() {
    videosStore.unlisten(this.handleChange);
  },

  handleVideosUpdate: function() {
    var videoState = videosStore.getVideoState();

    if (this.isMounted()) {
      this.setState(videoState);
    }
  },

  handleNextVideo: function() {
    var nextVideoId = this.state.nextVideoId;

    this._transitionToVideo(nextVideoId);
  },

  handlePreviousVideo: function() {
    var previousVideoId = this.state.previousVideoId;

    this._transitionToVideo(previousVideoId);
  },

  _transitionToVideo: function(videoId) {
    this.transitionTo('video', {videoId: videoId});

    if (this.isMounted()) {
      var video = videosStore.getVideoStateById(videoId);
      this.setState(video);
    }
  },

  render: function() {
    if (this.state.loading || (this.state.video && !this.state.video.source)) {
      return <Spinner />;
    }

    return (
      <VideoStage
        endlessMode={this.props.endlessMode}
        video={this.state.video}
        startCounter={this.state.startCounter}
        endCounter={this.state.endCounter}
        onNextVideo={this.handleNextVideo}
        onPreviousVideo={this.handlePreviousVideo}
      />
    );
  }
});

module.exports = VideosContainer;
