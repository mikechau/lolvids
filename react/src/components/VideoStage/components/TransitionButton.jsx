import React from 'react';
import cx from 'classnames';

var TransitionButton = React.createClass({
  propTypes: {
    right: React.PropTypes.bool,
    left: React.PropTypes.bool
  },

  render: function() {
    var iconClasses = cx({
      glyphicon: true,
      'glyphicon-menu-right': this.props.right,
      'glyphicon-menu-left': this.props.left
    });

    return (
      <div className="col-xs-1 col-sm-1 col-md-1 col-video-transition">
        <span className={iconClasses} aria-hidden="true"></span>
      </div>
    );
  }
});

module.exports = TransitionButton;
