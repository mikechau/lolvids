var _uniq = require('lodash/array/uniq');

var WebApi = require('./WebApi');

var BASE_URL = 'https://jetclips.herokuapp.com/api/v1';
var VIDEOS_URL = BASE_URL + '/videos/170901143077174.json';
var VIDEO_URL = BASE_URL + '/video';

var VideosApi = {
  get: function(videoId) {
    return WebApi.get(VIDEO_URL + '/' + videoId + '.json');
  },

  getAll: function() {
    return WebApi.get(VIDEOS_URL);
  },

  getWithAll: function(videoId) {
    return Promise.all([
      this.get(videoId),
      this.getAll()
    ]).then(function(results) {
      var mergedVideos = [results[0]].concat(results[1]);
      var videos = _uniq(mergedVideos, 'id');

      return videos;
    });
  },
};

module.exports = VideosApi;
