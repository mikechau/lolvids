var WebApi = require('../WebApi');

var VIDEOS_URL = '//jetclips.herokuapp.com/api/v1/videos/170901143077174.json';

var VideosApi = {
  getAll: function() {
    return WebApi.get(VIDEOS_URL);
  }
};

module.exports = VideosApi;
