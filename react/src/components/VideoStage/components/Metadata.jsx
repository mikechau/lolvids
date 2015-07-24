var React = require('react');

var Metadata = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    timestamp: React.PropTypes.string,
    id: React.PropTypes.string,
    startIndex: React.PropTypes.number,
    endIndex: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      title: 'N/A',
      timestamp: 'N/A',
      id: 'N/A',
      startIndex: 0,
      endIndex: 0
    };
  },

  render: function() {
    return (
      <div id="video-meta-data">
        <div className="col-xs-12 col-sm-12 col-md-3 col-md-offset-1 text-center-xs text-center-sm">
          <h3>
            <span id="video-title">{this.props.title}</span>
            <br />
            <small>
              <span id="video-timestamp">{this.props.timestamp}</span>
            </small>
          </h3>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-4 text-center">
          <br />
          <ul className="list-unstyled">
            <li>ID: <span id="video-id">{this.props.id}</span></li>
            <li>Video: <span id="video-counter-start">{this.props.startIndex}</span>{`/`}<span id="video-counter-end">{this.props.endIndex}</span></li>
          </ul>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-3">
          <h3 className="pull-right-md pull-right-lg pull-right-not-sm pull-right-not-xs text-center-xs text-center-sm">
            <a href="https://www.facebook.com/BestofVines" target="_new">Best of Vines</a>
          </h3>
        </div>
      </div>
    );
  }
});

module.exports = Metadata;
