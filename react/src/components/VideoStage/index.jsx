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
            src="https://video.xx.fbcdn.net/hvideo-xpf1/v/t42.1790-2/11679940_681915141943798_520763199_n.mp4?efg=eyJybHIiOjU5NSwicmxhIjo1MTJ9&rl=595&vabr=331&oh=be8d4cb34b02eb02111dd1e750bbf0ac&oe=55A406D6"
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
