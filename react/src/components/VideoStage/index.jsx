var React = require('react');
var TransitionButton = require('./components/TransitionButton');
var Video = require('./components/Video');

var VideoStage = React.createClass({
  render: function() {
    return (
      <div className="row vertical-align">
        <TransitionButton direction="left" />

        <div className="col-xs-10 col-md-10 text-center">
          <Video
            src={require('app/assets/test.mp4')}
            resize
            resizeOptions={{
              aspectRatio: (10 / 21),
              shortWindowVideoHeightAdjustment: 80,
              defaultVideoWidthAdjustment: 30
            }}
          />
        </div>

        <TransitionButton direction="right" />
      </div>
    );
  }
});

module.exports = VideoStage;
