import React from 'react';

var Spinner = React.createClass({
  render: function() {
    return (
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%'
        }}
      >
        <div className="whirly-loader">
          Loading…
        </div>
      </div>
    );
  }
});

module.exports = Spinner;
