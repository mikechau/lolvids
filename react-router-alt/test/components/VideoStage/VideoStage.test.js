var React = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var VideoStage = require('app/components/VideoStage');
var Video = require('app/components/VideoStage/components/Video');
var Metadata = require('app/components/VideoStage/components/Metadata');

var TEST_VIDEO_SOURCE = require('app/assets/test.mp4');

var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var SPACEBAR_KEY = 32;

var VIDEO = {
  source: TEST_VIDEO_SOURCE,
  name: 'test video',
  ts: 'test_time',
  id: 'test_video_01'
};

describe('VideoStage', function() {
  var sandbox;
  var component;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    component = null;
  });

  afterEach(function() {
    sandbox.restore();

    if (component) {
      React.unmountComponentAtNode(React.findDOMNode(component).parentNode);
    }
  });

  describe('on initial render', function() {
    it('renders: a video component', function() {
      component = ReactTestUtils.renderIntoDocument(
        <VideoStage
          endlessMode={false}
          video={VIDEO}
          startCounter={1}
          endCounter={1}
        />
      );

      var videoComponent = ReactTestUtils.findRenderedComponentWithType(component, Video);

      expect(videoComponent).to.be.instanceOf(Video);
    });

    it('renders: a metadata component', function() {
      component = ReactTestUtils.renderIntoDocument(
        <VideoStage
          endlessMode={false}
          video={VIDEO}
          startCounter={1}
          endCounter={1}
        />
      );

      var metadataComponent = ReactTestUtils.findRenderedComponentWithType(component, Metadata);

      expect(metadataComponent).to.be.instanceOf(Metadata);
    });
  });

  describe('on component did mount', function() {
    it('attaches: key events', function() {
      var keySpy = sandbox.spy(VideoStage.prototype.__reactAutoBindMap, 'addKeyEvents');

      component = ReactTestUtils.renderIntoDocument(
        <VideoStage
          endlessMode={false}
          video={VIDEO}
          startCounter={1}
          endCounter={1}
        />
      );

      expect(keySpy).to.be.calledOnce;
    });
  });

  describe('on component did unmount', function() {
    it('detaches: key events', function() {
      var keySpy = sandbox.spy(VideoStage.prototype.__reactAutoBindMap, 'removeKeyEvents');
      var nextSpy = sandbox.spy(VideoStage.prototype.__reactAutoBindMap, 'handleNext');

      var reactComponent = ReactTestUtils.renderIntoDocument(
        <VideoStage
          endlessMode={false}
          video={VIDEO}
          startCounter={1}
          endCounter={1}
        />
      );

      var domNode = React.findDOMNode(reactComponent);

      React.unmountComponentAtNode(domNode.parentElement);

      expect(keySpy, 'remove key event was not called').to.be.calledOnce;

      var keyboardEvent = document.createEvent('HTMLEvents');
      keyboardEvent.initEvent('keydown', true, true);
      keyboardEvent.keyCode = RIGHT_KEY;
      document.body.dispatchEvent(keyboardEvent);

      expect(nextSpy, 'next video was called').to.not.be.calledOnce;
    });
  });

  describe('on window events', function() {
    it('calls: next video on right arrow keypress', function(done) {
      component = ReactTestUtils.renderIntoDocument(
        <VideoStage
          endlessMode={false}
          video={VIDEO}
          startCounter={1}
          endCounter={1}
          onNextVideo={function() {
            done();
          }}
        />
      );

      var keyboardEvent = document.createEvent('HTMLEvents');
      keyboardEvent.initEvent('keydown', true, true);
      keyboardEvent.keyCode = RIGHT_KEY;
      document.body.dispatchEvent(keyboardEvent);
    });

    it('calls: previous video on left arrow keypress', function(done) {
      component = ReactTestUtils.renderIntoDocument(
        <VideoStage
          endlessMode={false}
          video={VIDEO}
          startCounter={1}
          endCounter={1}
          onPreviousVideo={function() {
            done();
          }}
        />
      );

      var keyboardEvent = document.createEvent('HTMLEvents');
      keyboardEvent.initEvent('keydown', true, true);
      keyboardEvent.keyCode = LEFT_KEY;
      document.body.dispatchEvent(keyboardEvent);
    });

    it('calls: pause on spacebar keypress', function() {
      var pauseSpy = sandbox.spy(VideoStage.prototype.__reactAutoBindMap, 'handlePause');

      component = ReactTestUtils.renderIntoDocument(
        <VideoStage
          endlessMode={false}
          video={VIDEO}
          startCounter={1}
          endCounter={1}
        />
      );

      var keyboardEvent = document.createEvent('HTMLEvents');
      keyboardEvent.initEvent('keydown', true, true);
      keyboardEvent.keyCode = SPACEBAR_KEY;
      document.body.dispatchEvent(keyboardEvent);

      expect(pauseSpy).to.be.calledOnce;
    });
  });

  describe('component handlers', function() {
    it('#handleNext', function(done) {
      component = ReactTestUtils.renderIntoDocument(
        <VideoStage
          endlessMode={false}
          video={VIDEO}
          startCounter={1}
          endCounter={1}
          onNextVideo={done}
        />
      );

      component.handleNext();
    });

    it('#handlePrevious', function(done) {
      component = ReactTestUtils.renderIntoDocument(
        <VideoStage
          endlessMode={false}
          video={VIDEO}
          startCounter={1}
          endCounter={1}
          onPreviousVideo={done}
        />
      );

      component.handlePrevious();
    });

    it('#handlePause', function() {
      component = ReactTestUtils.renderIntoDocument(
        <VideoStage
          endlessMode={false}
          video={VIDEO}
          startCounter={1}
          endCounter={1}
        />
      );

      var pauseSpy = sandbox.spy(component.refs.videoPlayer, 'togglePauseVideo');

      component.handlePause();

      expect(pauseSpy).to.be.calledOnce;
    });
  });
});
