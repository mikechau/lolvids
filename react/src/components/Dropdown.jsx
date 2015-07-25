var React = require('react');
var cx = require('classnames');
var PropTypes = React.PropTypes;

var Dropdown = React.createClass({
  propTypes: {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ])
  },

  getInitialState: function() {
    return {
      open: false
    };
  },

  componentWillUnmount: function() {
    document.removeEventListener('click', this.handleBodyClick);
  },

  handleBodyClick: function(e) {
    if (this.state.open) {
      this.setState({
        open: false
      }, function() {
        document.removeEventListener('click', this.handleBodyClick);
      });
    }
  },

  handleDropdownClick: function(e) {
    e.stopPropagation();

    var open = this.state.open;

    this.setState({
      open: !open
    }, function() {
      if (this.state.open) {
        document.addEventListener('click', this.handleBodyClick);
      } else {
        document.removeEventListener('click', this.handleBodyClick);
      }
    });
  },

  render: function() {
    var dropdownClasses = cx({
      'dropdown-toggle': true,
      open: this.state.open
    });

    return (
      <li className={dropdownClasses}>
        <a
          href="#"
          className="dropdown-toggle"
          data-toggle="dropdown"
          role="button"
          aria-expanded={this.state.open ? 'true' : 'false'}
          onClick={this.handleDropdownClick}
        >
          {this.props.title} <span className="caret"></span>
        </a>

        <ul className="dropdown-menu" role="menu">
          { this.props.children }
        </ul>
      </li>
    );
  }
});

module.exports = Dropdown;
