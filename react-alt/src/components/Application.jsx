var React = require('react');

var videosStore = require('../flux/stores/VideosStore').videosStore;
var videosActions = require('../flux/actions/VideosActions');

var AltContainer = require('alt/AltContainer');
var TopNavBar = require('./TopNavBar');
var VideoStage = require('./VideoStage');
var Spinner = require('./Spinner');

var Application = React.createClass({
  getInitialState: function() {
    return {
      endlessMode: true
    };
  },

  componentDidMount: function() {
    videosActions.fetchVideos();
  },

  handleEndlessModeClick: function() {
    this.setState({
      endlessMode: !this.state.endlessMode
    });
  },

  renderContent: function(props) {
    if (props.loading || !props.videos.length) {
      return <Spinner />;
    }

    return (
      <VideoStage
        endlessMode={this.state.endlessMode}
        videos={props.videos}
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
          <AltContainer
            store={videosStore}
            render={this.renderContent}
          />
        </div>
      </div>
    );
  }
});

module.exports = Application;
