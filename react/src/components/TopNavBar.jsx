var React = require('react');
var Dropdown = require('./Dropdown');

var TopNavBar = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/jquery">lolvids-react</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active"><a href="/react">Home <span className="sr-only">(current)</span></a></li>
              <li><a href="https://github.com/mikechau/lolvids">GitHub</a></li>
              <li><a href="#autoplay" id="endless-mode-action"><i className="glyphicon glyphicon-refresh"></i>&nbsp;&nbsp;Endless Mode (<span id="endless-mode-status">Off</span>)</a></li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <Dropdown title="Other Examples">
                <li><a href="/jquery">jquery</a></li>
                <li className="divider"></li>
                <li className="active"><a href="/react">react</a></li>
                <li><a href="/react-router">react-router</a></li>
                <li className="divider"></li>
                <li><a href="/react-alt">react-alt</a></li>
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
