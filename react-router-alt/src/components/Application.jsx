var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var TopNavBar = require('./TopNavBar');
var VideosContainer = require('./VideosContainer');

var Application = React.createClass({
  getInitialState: function() {
    return {
      endlessMode: true
    };
  },

  handleEndlessModeClick: function() {
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
          <VideosContainer endlessMode={this.state.endlessMode} />
        </div>
      </div>
    );
  }
});

module.exports = Application;
