var React = require('react');
var cx = require('classnames');

var noop = function() {};

var TransitionButton = React.createClass({
  propTypes: {
    direction: React.PropTypes.oneOf([
      'left',
      'right'
    ]).isRequired,
    onClick: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      onClick: noop
    };
  },

  handleClick: function(e) {
    e.preventDefault();

    this.props.onClick();
  },

  _isRight: function() {
    return this.props.direction === 'right';
  },

  _isLeft: function() {
    return this.props.direction === 'left';
  },

  render: function() {
    var iconClasses = cx({
      glyphicon: true,
      'glyphicon-menu-right': this._isRight(),
      'glyphicon-menu-left': this._isLeft()
    });

    return (
      <div className="col-xs-1 col-sm-1 col-md-1 col-video-transition" onClick={this.handleClick}>
        <span className={iconClasses} aria-hidden="true"></span>
      </div>
    );
  }
});

module.exports = TransitionButton;
