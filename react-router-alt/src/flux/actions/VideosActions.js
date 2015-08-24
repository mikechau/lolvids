var alt = require('../alt');
var VideosApi = require('../../utils/VideosApi');

module.exports = alt.createActions({
  displayName: 'VideosActions',

  fetchVideos: function(videoId) {
    this.dispatch();

    var request = videoId ? VideosApi.getWithAll(videoId) : VideosApi.getAll();

    return request.then(this.actions.updateVideos);
  },

  updateVideos: function(videos) {
    this.dispatch(videos);
  },

  nextVideo: function() {
    this.dispatch();
  },

  previousVideo: function() {
    this.dispatch();
  }
});
