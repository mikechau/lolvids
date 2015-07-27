var alt = require('../alt');
var videosActions = require('../actions/VideosActions');

var VideosStore = {
  displayName: 'VideosStore',

  bindListeners: {
    onFetchVideos: videosActions.fetchVideos,
    onUpdateVideos: videosActions.updateVideos
  },

  state: {
    loading: false,
    videos: []
  },

  onFetchVideos: function() {
    this.setState({
      loading: true
    });
  },

  onUpdateVideos: function(videos) {
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
