var React = require('react');
var TopNavBar = require('./TopNavBar');
var VideoStage = require('./VideoStage');
var Spinner = require('./Spinner');
var fetch = require('isomorphic-fetch');

var VIDEOS_URL = '//jetclips.herokuapp.com/api/v1/videos/170901143077174.json';

var Application = React.createClass({
  getInitialState: function() {
    return {
      endlessMode: true,
      videos: []
    };
  },

  componentDidMount: function() {
    this.fetchVideos();
  },

  fetchVideos: function() {
    return fetch(VIDEOS_URL)
      .then(function(response) {
        return response.json();
      })
      .then(this.setVideos)
      .catch(function(err) {
        console.error(err);
      });
  },

  setVideos: function(videos) {
    this.setState({
      videos: videos
    });
  },

  handleEndlessModeClick: function() {
    this.setState({
      endlessMode: !this.state.endlessMode
    });
  },

  renderVideoStage: function() {
    return (
      <VideoStage
        videos={this.state.videos}
        endlessMode={this.state.endlessMode}
      />
    );
  },

  render: function() {
    return (
      <div>
        <TopNavBar
          endlessMode={this.state.endlessMode}
          onEndlessModeClick={this.handleEndlessModeClick}
        />

        <div className="container">
          {this.state.videos.length ? this.renderVideoStage() : <Spinner />}
        </div>
      </div>
    );
  }
});

module.exports = Application;
