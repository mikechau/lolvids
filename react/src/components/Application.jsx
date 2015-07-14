var React = require('react');
var TopNavBar = require('./TopNavBar');
var VideoStage = require('./VideoStage');

var Application = React.createClass({
  render: function() {
    return (
      <div>
        <TopNavBar />

        <div className="container">
          <VideoStage />
        </div>
      </div>
    );
  }
});

module.exports = Application;
