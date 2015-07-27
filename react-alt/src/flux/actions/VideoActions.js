var alt = require('../alt');
var VideosApi = require('../../utils/VideosApi');

module.exports = alt.createActions({
  displayName: 'VideoActions',

  fetchVideos: function() {
    this.dispatch();

    return VideosApi
      .getAll()
      .then(this.actions.updateVideos);
  },

  updateVideos: function(videos) {
    this.dispatch(videos);
  }
});
