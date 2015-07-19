var React = require('react');
var TopNavBar = require('./TopNavBar');
var VideoStage = require('./VideoStage');

var Application = React.createClass({
  render: function() {
    return (
      <div>
        <TopNavBar />

        <div className="container">
          <VideoStage videos={[require('app/assets/test.mp4'), require('app/assets/test.mp4') + '?q=292992']} />
        </div>
      </div>
    );
  }
});

module.exports = Application;
