var alt = require('../alt');
var videosActions = require('../actions/VideosActions');
var _findIndex = require('lodash/array/findIndex');

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
        endCounter: this.StoreModel.getEndCounter(),
        nextVideoId: this.StoreModel.getNextVideo('id'),
        previousVideoId: this.StoreModel.getPreviousVideo('id')
      };
    },

    getVideoStateById: function(id) {
      var video = this.StoreModel.getVideoWithIndexById(id);
      var index = video.index;

      return {
        loading: this.StoreModel.state.loading,
        video: video.video,
        startCounter: video.startCounter,
        endCounter: this.StoreModel.getEndCounter(),
        nextVideoId: this.StoreModel.getNextVideo('id', index + 1),
        previousVideoId: this.StoreModel.getPreviousVideo('id', index - 1)
      };
    }
  },

  getVideoWithIndexById: function(id) {
    var videos = this.state.videos;
    var index = _findIndex(videos, {id: id});
    var video = videos[index];

    return {
      startCounter: index + 1,
      video: video,
      index: index
    };
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

  getNextVideo: function(attr, index) {
    var nextIndex = this.getNextIndex(index);
    var video = this.state.videos[nextIndex] || {};

    return attr ? video[attr] : video;
  },

  getPreviousVideo: function(attr, index) {
    var previousIndex = this.getPreviousIndex(index);
    var video = this.state.videos[previousIndex] || {};

    return attr ? video[attr] : video;
  },

  getNextIndex: function(index) {
    var nextIndex = index || 0;

    if ((nextIndex > 0) && (nextIndex <= this.getVideosCount())) {
      return nextIndex;
    } else if (nextIndex === 0) {
      return 1;
    } else {
      return 0;
    }
  },

  getPreviousIndex: function(index) {
    var videosCount = this.getVideosCount();
    var prevIndex = index || 0;

    if (prevIndex < -1) {
      return 0;
    } else if (prevIndex === 0) {
      return videosCount;
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
