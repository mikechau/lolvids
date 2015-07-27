var alt = require('../alt');
var videoActions = require('../actions/VideoActions');

var VideosStore = {
  displayName: 'VideosStore',

  bindListeners: {
    onFetchVideos: videoActions.fetchVideos,
    onUpdateVideos: videoActions.updateVideos
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
