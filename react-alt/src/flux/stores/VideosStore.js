var alt = require('../alt');
var videoActions = require('../actions/VideoActions');

var VideosStore = {
  displayName: 'VideosStore',

  bindListeners: {
    handleFetchVideos: videoActions.fetchVideos,
    handleUpdateVideos: videoActions.updateVideos
  },

  state: {
    loading: false,
    videos: []
  },

  handleFetchVideos: function() {
    this.setState({
      loading: true
    });
  },

  handleUpdateVideos: function(videos) {
    this.setState({
      loading: false,
      videos: videos
    });
  }
};

module.exports = {
  videosStore: alt.createStore(VideosStore),
  VideosStore: VideosStore
};
