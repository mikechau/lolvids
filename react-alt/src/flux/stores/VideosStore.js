var alt = require('../alt');
var videosActions = require('../actions/VideosActions');

var VideosStore = {
  displayName: 'VideosStore',

  bindListeners: {
    handleFetchVideos: videosActions.fetchVideos,
    handleUpdateVideos: videosActions.updateVideos
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
