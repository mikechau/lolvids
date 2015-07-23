var React = require('react');
var TopNavBar = require('./TopNavBar');
var VideoStage = require('./VideoStage');

var Application = React.createClass({
  getInitialState: function() {
    return {
      endlessMode: true,
      videos: [
        'https://video.xx.fbcdn.net/hvideo-xpf1/v/t42.1790-2/11739989_623616014472349_1266833156_n.mp4?efg=eyJybHIiOjY0NiwicmxhIjo1MTJ9&rl=646&vabr=359&oh=b81c5b26ecfdc95e2e51ebba2bc11b16&oe=55B0B830'
      ]
    };
  },

  handleEndlessModeClick: function(e) {
    this.setState({
      endlessMode: !this.state.endlessMode
    });
  },

  render: function() {
    return (
      <div>
        <TopNavBar
          endlessMode={this.state.endlessMode}
          onEndlessModeClick={this.handleEndlessModeClick}
        />

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
