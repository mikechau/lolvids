var React = require('react');
var Router = require('react-router');

var videosStore = require('../flux/stores/VideosStore').videosStore;
var videosActions = require('../flux/actions/VideosActions');

var VideoStage = require('./VideoStage');
var Spinner = require('./Spinner');

var VideosContainer = React.createClass({
  propTypes: {
    endlessMode: React.PropTypes.bool.isRequired
  },

  // mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    return videosStore.getVideoState();
  },

  componentDidMount: function() {
    videosStore.listen(this.handleVideosUpdate);

    videosActions.fetchVideos();
  },

  componentWillUnmount: function() {
    videosStore.unlisten(this.handleChange);
  },

  handleVideosUpdate: function() {
    this.setState(videosStore.getVideoState());
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
        onNextVideo={videosActions.nextVideo}
        onPreviousVideo={videosActions.previousVideo}
      />
    );
  }
});

module.exports = VideosContainer;
