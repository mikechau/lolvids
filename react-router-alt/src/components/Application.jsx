var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var TopNavBar = require('./TopNavBar');

var Application = React.createClass({
  propTypes: {
    router: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      router: {}
    };
  },

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
          <RouteHandler endlessMode={this.state.endlessMode} router={this.props.router} />
        </div>
      </div>
    );
  }
});

module.exports = Application;
