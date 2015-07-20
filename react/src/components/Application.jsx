var React = require('react');
var TopNavBar = require('./TopNavBar');
var VideoStage = require('./VideoStage');

var Application = React.createClass({
  getInitialState: function() {
    return {
      endlessMode: true,
      videos: []
    };
  },

  render: function() {
    return (
      <div>
        <TopNavBar endlessMode={this.state.endlessMode} />

        <div className="container">
          <VideoStage
            videos={this.state.videos}
            endlessMode={this.state.endlessMode}
          />
        </div>
      </div>
    );
  }
});

module.exports = Application;
