var React = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var VideoStage = require('app/components/VideoStage');
var Video = require('app/components/VideoStage/components/Video');

var VIDEO = require('app/assets/test.mp4');

var VIDEOS = [
  VIDEO,
  VIDEO + '?q=1337'
];

var noopEvent = {
  preventDefault: function() {}
};

describe('VideoStage', function() {
  var sandbox;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('on initial render', function() {
    it('renders: a video component', function() {
      var component = ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);
      var videoComponent = ReactTestUtils.findRenderedComponentWithType(component, Video);

      expect(videoComponent).to.be.instanceOf(Video);
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

      var component = ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);
      var domNode = React.findDOMNode(component);

      React.unmountComponentAtNode(domNode.parentElement);

      expect(keySpy, 'remove key event was not called').to.be.calledOnce;

      var keyboardEvent = document.createEvent('HTMLEvents');
      keyboardEvent.initEvent('keydown', true, true);
      keyboardEvent.keyCode = 39;
      document.body.dispatchEvent(keyboardEvent);

      expect(nextSpy, 'next video was called').to.not.be.calledOnce;
    });
  });

  describe('on window events', function() {
    it('calls: next video on right arrow keypress', function() {
      var nextSpy = sandbox.spy(VideoStage.prototype.__reactAutoBindMap, 'handleNext');

      ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);

      var keyboardEvent = document.createEvent('HTMLEvents');
      keyboardEvent.initEvent('keydown', true, true);
      keyboardEvent.keyCode = 39;
      document.body.dispatchEvent(keyboardEvent);

      expect(nextSpy).to.be.calledOnce;
    });

    it('calls: previous video on left arrow keypress', function() {
      var previousSpy = sandbox.spy(VideoStage.prototype.__reactAutoBindMap, 'handlePrevious');

      ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);

      var keyboardEvent = document.createEvent('HTMLEvents');
      keyboardEvent.initEvent('keydown', true, true);
      keyboardEvent.keyCode = 37;
      document.body.dispatchEvent(keyboardEvent);

      expect(previousSpy).to.be.calledOnce;
    });

    it('calls: pause on spacebar keypress', function() {
      var pauseSpy = sandbox.spy(VideoStage.prototype.__reactAutoBindMap, 'handlePause');

      ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);

      var keyboardEvent = document.createEvent('HTMLEvents');
      keyboardEvent.initEvent('keydown', true, true);
      keyboardEvent.keyCode = 32;
      document.body.dispatchEvent(keyboardEvent);

      expect(pauseSpy).to.be.calledOnce;
    });
  });

  describe('component methods', function() {
    it('#getCurrentVideo', function() {
      var component = ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);

      expect(component.getCurrentVideo(), 'it did not get the first video').to.equal(VIDEOS[0]);

      component.setState({
        currentVideoIndex: 1
      });

      expect(component.getCurrentVideo(), 'it did not get the second video').to.equal(VIDEOS[1]);
    });

    it('#setCurrentVideoIndex', function() {
      var component = ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);

      component.setCurrentVideoIndex(1);

      expect(component.getCurrentVideo(), 'it did not get the second video').to.equal(VIDEOS[1]);
    });

    it('#setTogglePause', function() {
      var component = ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);

      component.setTogglePause();

      expect(component.state.pause, 'it is not paused').to.be.true;

      component.setTogglePause();

      expect(component.state.pause, 'it is paused').to.be.false;
    });
  });

  describe('component handlers', function() {
    it('#handleNext', function() {
      var component = ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);

      component.handleNext(noopEvent);

      expect(component.state.currentVideoIndex, 'it did not increment').to.equal(1);

      component.handleNext(noopEvent);

      expect(component.state.currentVideoIndex, 'it did not go to the beginning').to.equal(0);
    });

    it('#handlePrevious', function() {
      var component = ReactTestUtils.renderIntoDocument(<VideoStage videos={VIDEOS} />);

      component.handlePrevious(noopEvent);

      expect(component.state.currentVideoIndex, 'it did not go to the end').to.equal(1);

      component.handlePrevious(noopEvent);

      expect(component.state.currentVideoIndex, 'it did not decrement').to.equal(0);
    });
  });
});
