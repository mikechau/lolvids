var React = require('react');
var TopNavBar = require('./TopNavBar');

var Application = React.createClass({
  render: function() {
    return (
      <div>
        <TopNavBar />
      </div>
    );
  }
});

module.exports = Application;
