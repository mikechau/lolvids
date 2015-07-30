var alt = require('../alt');
var videosActions = require('../actions/VideosActions');

var VideosStore = {
  displayName: 'VideosStore',

  bindListeners: {
    handleFetchVideos: videosActions.fetchVideos,
    handleUpdateVideos: videosActions.updateVideos,
    handleNextVideo: videosActions.nextVideo,
    handlePreviousVideo: videosActions.previousVideo
  },

  state: {
    loading: false,
    videos: [],
    currentIndex: 0
  },

  publicMethods: {
    getVideoState: function() {
      return {
        loading: this.StoreModel.state.loading,
        video: this.StoreModel.getCurrentVideo(),
        startCounter: this.StoreModel.getStartCounter(),
        endCounter: this.StoreModel.getEndCounter()
      };
    }
  },

  getCurrentVideo: function() {
    var currentIndex = this.state.currentIndex;
    return this.state.videos[currentIndex] || {};
  },

  getVideosCount: function() {
    return Math.max(0, this.state.videos.length - 1);
  },

  getStartCounter: function() {
    return this.state.currentIndex + 1;
  },

  getEndCounter: function() {
    return this.state.videos.length;
  },

  getNextIndex: function() {
    var nextIndex = this.state.currentIndex + 1;

    if ((nextIndex > -1) && (nextIndex <= this.getVideosCount())) {
      return nextIndex;
    } else {
      return 0;
    }
  },

  getPreviousIndex: function() {
    var prevIndex = this.state.currentIndex - 1;

    if (prevIndex < 0) {
      return this.getVideosCount();
    } else {
      return prevIndex;
    }
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
  },

  handleNextVideo: function() {
    this.setState({
      currentIndex: this.getNextIndex()
    });
  },

  handlePreviousVideo: function() {
    this.setState({
      currentIndex: this.getPreviousIndex()
    });
  }
};

module.exports = {
  videosStore: alt.createStore(VideosStore),
  VideosStore: VideosStore
};
