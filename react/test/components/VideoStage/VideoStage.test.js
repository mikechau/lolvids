var React = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var VideoStage = require('app/components/VideoStage');
var Video = require('app/components/VideoStage/components/Video');
var Metadata = require('app/components/VideoStage/components/Metadata');

var VIDEO = require('app/assets/test.mp4');

var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var SPACEBAR_KEY = 32;

var VIDEOS = [
  {source: VIDEO},
  {source: VIDEO + '?q=1337'}
];

var noopEvent = {
  preventDefault: function() {}
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
      component = ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);

      var videoComponent = ReactTestUtils.findRenderedComponentWithType(component, Video);

      expect(videoComponent).to.be.instanceOf(Video);
    });

    it('renders: a metadata component', function() {
      component = ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);

      var metadataComponent = ReactTestUtils.findRenderedComponentWithType(component, Metadata);

      expect(metadataComponent).to.be.instanceOf(Metadata);
    });
  });

  describe('on component did mount', function() {
    it('attaches: key events', function() {
      var keySpy = sandbox.spy(VideoStage.prototype.__reactAutoBindMap, 'addKeyEvents');
      ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);

      expect(keySpy).to.be.calledOnce;
    });
  });

  describe('on component did unmount', function() {
    it('detaches: key events', function() {
      var keySpy = sandbox.spy(VideoStage.prototype.__reactAutoBindMap, 'removeKeyEvents');
      var nextSpy = sandbox.spy(VideoStage.prototype.__reactAutoBindMap, 'handleNext');

      var reactComponent = ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);
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
    it('calls: next video on right arrow keypress', function() {
      var nextSpy = sandbox.spy(VideoStage.prototype.__reactAutoBindMap, 'handleNext');

      component = ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);

      var keyboardEvent = document.createEvent('HTMLEvents');
      keyboardEvent.initEvent('keydown', true, true);
      keyboardEvent.keyCode = RIGHT_KEY;
      document.body.dispatchEvent(keyboardEvent);

      expect(nextSpy).to.be.calledOnce;
    });

    it('calls: previous video on left arrow keypress', function() {
      var previousSpy = sandbox.spy(VideoStage.prototype.__reactAutoBindMap, 'handlePrevious');

      component = ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);

      var keyboardEvent = document.createEvent('HTMLEvents');
      keyboardEvent.initEvent('keydown', true, true);
      keyboardEvent.keyCode = LEFT_KEY;
      document.body.dispatchEvent(keyboardEvent);

      expect(previousSpy).to.be.calledOnce;
    });

    it('calls: pause on spacebar keypress', function() {
      var pauseSpy = sandbox.spy(VideoStage.prototype.__reactAutoBindMap, 'handlePause');

      component = ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);

      var keyboardEvent = document.createEvent('HTMLEvents');
      keyboardEvent.initEvent('keydown', true, true);
      keyboardEvent.keyCode = SPACEBAR_KEY;
      document.body.dispatchEvent(keyboardEvent);

      expect(pauseSpy).to.be.calledOnce;
    });
  });

  describe('component methods', function() {
    it('#getCurrentVideo', function() {
      component = ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);

      expect(component.getCurrentVideo(), 'it did not get the first video').to.equal(VIDEOS[0]);

      component.setState({
        currentVideoIndex: 1
      });

      expect(component.getCurrentVideo(), 'it did not get the second video').to.equal(VIDEOS[1]);
    });

    it('#getTotalVideos', function() {
      component = ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);

      expect(component.getTotalVideos()).to.equal(1);
    });

    it('#getVideoCounterStart', function() {
      component = ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);

      expect(component.getVideoCounterStart()).to.equal(1);
    });

    it('#getVideoCounterEnd', function() {
      component = ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);

      expect(component.getVideoCounterEnd()).to.equal(2);
    });

    it('#setCurrentVideoIndex', function() {
      component = ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);

      component.setCurrentVideoIndex(1);

      expect(component.getCurrentVideo(), 'it did not get the second video').to.equal(VIDEOS[1]);
    });
  });

  describe('component handlers', function() {
    it('#handleNext', function() {
      component = ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);

      component.handleNext(noopEvent);

      expect(component.state.currentVideoIndex, 'it did not increment').to.equal(1);

      component.handleNext(noopEvent);

      expect(component.state.currentVideoIndex, 'it did not go to the beginning').to.equal(0);
    });

    it('#handlePrevious', function() {
      component = ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);

      component.handlePrevious(noopEvent);

      expect(component.state.currentVideoIndex, 'it did not go to the end').to.equal(1);

      component.handlePrevious(noopEvent);

      expect(component.state.currentVideoIndex, 'it did not decrement').to.equal(0);
    });

    it('#handlePause', function() {
      component = ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);

      var pauseSpy = sandbox.spy(component.refs.videoPlayer, 'togglePauseVideo');

      component.handlePause(noopEvent);

      expect(pauseSpy).to.be.calledOnce;
    });
  });
});
