var React = require('react');
var Dropdown = require('./Dropdown');
var cx = require('classnames');

var TopNavBar = React.createClass({
  propTypes: {
    endlessMode: React.PropTypes.bool,
    onEndlessModeClick: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      endlessMode: false,
      onEndlessModeClick: function(e) {
        e.preventDefault();
      }
    };
  },

  getInitialState: function() {
    return {
      showCollapseNav: false
    };
  },

  handleEndlessModeClick: function(e) {
    e.preventDefault();
    this.props.onEndlessModeClick(e);
  },

  handleCollapseNavClick: function(e) {
    this.setState({
      showCollapseNav: !this.state.showCollapseNav
    });
  },

  render: function() {
    var endlessModeStatus = this.props.endlessMode ? 'On' : 'Off';
    var endlessModeLiClasses = cx({
      active: this.props.endlessMode
    });

    var collapsedNavMenuClasses = cx({
      'navbar-collapse': !this.state.showCollapseNav,
      collapse: !this.state.showCollapseNav
    });

    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button ref="collapseNavMenuButton" type="button" className="navbar-toggle collapsed" onClick={this.handleCollapseNavClick}>
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/jquery">lolvids-react</a>
          </div>

          <div ref="collapsedNavMenuOptions" className={collapsedNavMenuClasses}>
            <ul className="nav navbar-nav">
              <li className="active"><a href="/react">Home <span className="sr-only">(current)</span></a></li>
              <li><a href="https://github.com/mikechau/lolvids">GitHub</a></li>
              <li ref="endlessModeToggle" className={endlessModeLiClasses} onClick={this.handleEndlessModeClick}>
                <a id="endless-mode-action" href="#autoplay">
                <i className="glyphicon glyphicon-refresh"></i>&nbsp;&nbsp;Endless Mode (<span id="endless-mode-status">{endlessModeStatus}</span>)
                </a>
              </li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <Dropdown title="Other Examples">
                <li><a href="/jquery">jquery</a></li>
                <li className="divider"></li>
                <li className="active"><a href="/react">react</a></li>
                <li><a href="/react-alt">react-alt</a></li>
                <li className="divider"></li>
                <li><a href="/react-router">react-router</a></li>
                <li><a href="/react-router-alt">react-router-alt</a></li>
              </Dropdown>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = TopNavBar;
