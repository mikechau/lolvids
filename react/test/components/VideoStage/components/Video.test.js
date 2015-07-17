var React = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Video = require('app/components/VideoStage/components/Video');
var videojs = require('video.js');

var TEST_VIDEO = require('app/assets/test.mp4');

describe('VideoStage: Video', function() {
  var sandbox;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('on initial render', function() {
    it('renders: a videojs video player', function() {
      var component = ReactTestUtils.renderIntoDocument(<Video src={TEST_VIDEO} />);
      var domNode = React.findDOMNode(component);
      var vjsNode = domNode.parentElement;

      expect(domNode.nodeName, 'tag is not <video>').equal('VIDEO');
      expect(vjsNode.className, 'class is missing').to.contain('video-js');
      expect(component.getVideoPlayer().src(), 'src does not match').to.contain(TEST_VIDEO);
    });

    it('renders: with default vjs classes', function() {
      var component = ReactTestUtils.renderIntoDocument(<Video src={TEST_VIDEO} />);
      var domNode = React.findDOMNode(component);
      var vjsNode = domNode.parentElement;

      expect(vjsNode.className).to.contain('vjs-default-skin vjs-big-play-centered');
    });

    it('renders: the default warning', function() {
      var shallowRenderer = ReactTestUtils.createRenderer();
      shallowRenderer.render(<Video src={TEST_VIDEO} />);

      var component = shallowRenderer.getRenderOutput();

      expect(component.props.children.type).to.equal('p');
      expect(component.props.children.props.className).to.equal('vjs-no-js');
      expect(component.props.children.props.children[0]).to.contain('To view this video please enable JavaScript');
    });

    it('renders: a custom warning', function() {
      var shallowRenderer = ReactTestUtils.createRenderer();
      shallowRenderer.render(
        <Video src={TEST_VIDEO}>
          <div className="test">
            ERROR TEST MESSAGE!
          </div>
        </Video>
      );

      var component = shallowRenderer.getRenderOutput();

      expect(component.props.children.type).to.equal('div');
      expect(component.props.children.props.className).to.equal('test');
      expect(component.props.children.props.children).to.equal('ERROR TEST MESSAGE!');
    });
  });

  describe('on component did mount', function() {
    it('mounts: videojs', function() {
      var mountVideoPlayerSpy = sandbox.spy(Video.prototype.__reactAutoBindMap, 'mountVideoPlayer');

      ReactTestUtils.renderIntoDocument(<Video src={TEST_VIDEO} />);

      expect(mountVideoPlayerSpy).to.have.been.calledOnce;
    });
  });

  describe('on mount video player', function() {
    it('attaches: a videojs event listener', function(done) {
      var callback = function() { done(); };

      var component = ReactTestUtils.renderIntoDocument(
        <Video
          src={TEST_VIDEO}
          eventListeners={{
            pause: callback
          }}
        />
      );

      component.pauseVideo();
    });

    it('calls: on ready callback', function(done) {
      var callback = function() { done(); };

      ReactTestUtils.renderIntoDocument(
        <Video
          src={TEST_VIDEO}
          onReady={callback}
        />
      );
    });
  });

  describe('on receive props', function() {
    it('ignores: pause not changing', function() {
      var pauseSpy = sandbox.spy(Video.prototype.__reactAutoBindMap, 'pauseVideo');
      var component = ReactTestUtils.renderIntoDocument(<Video src={TEST_VIDEO} pause />);

      expect(component.getVideoPlayer().paused()).to.be.true;

      component.setProps({
        pause: true
      });

      expect(component.getVideoPlayer().paused()).to.be.true;
      expect(pauseSpy).to.have.been.calledOnce;
    });

    it('ignores: endless mode not changing', function() {
      var endlessSpy = sandbox.spy(Video.prototype.__reactAutoBindMap, 'addEndlessMode');
      var nextVideoSpy = sandbox.spy();
      var component = ReactTestUtils.renderIntoDocument(
        <Video
          src={TEST_VIDEO}
          endless
          onNextVideo={nextVideoSpy}
        />);

      component.getVideoPlayer().trigger('ended');

      component.setProps({
        endless: true
      });

      component.getVideoPlayer().trigger('ended');

      expect(endlessSpy, 'endless mode not attached once').to.have.been.calledOnce;
      expect(nextVideoSpy, '#onNextVideo not called twice').to.have.been.calledTwice;
    });

    it('ignores: resize not changing', function() {
      var resizeSpy = sandbox.spy(Video.prototype.__reactAutoBindMap, 'addResizeEventListener');
      var component = ReactTestUtils.renderIntoDocument(<Video src={TEST_VIDEO} resize />);

      component.setProps({
        resize: true
      });

      expect(resizeSpy).to.have.been.calledOnce;
    });

    it('responds: to pause change', function() {
      var component = ReactTestUtils.renderIntoDocument(<Video src={TEST_VIDEO} />);

      expect(component.getVideoPlayer().paused(), 'video player is not playing').to.be.false;

      component.setProps({
        pause: true
      });

      expect(component.getVideoPlayer().paused(), 'video player is not paused').to.be.true;
    });

    it('responds: to endless mode change', function() {
      var endlessSpy = sandbox.spy(Video.prototype.__reactAutoBindMap, 'addEndlessMode');
      var nextVideoSpy = sandbox.spy();
      var component = ReactTestUtils.renderIntoDocument(
        <Video
          src={TEST_VIDEO}
          onNextVideo={nextVideoSpy}
        />
      );

      component.getVideoPlayer().trigger('ended');
      component.getVideoPlayer().play();

      component.setProps({
        endless: true
      });

      component.getVideoPlayer().trigger('ended');

      expect(endlessSpy).to.have.been.calledOnce;
      expect(nextVideoSpy).to.have.been.calledOnce;
    });

    it('responds: to resize change', function() {
      var resizeSpy = sandbox.spy(Video.prototype.__reactAutoBindMap, 'addResizeEventListener');
      var component = ReactTestUtils.renderIntoDocument(<Video src={TEST_VIDEO} />);

      component.setProps({
        resize: true
      });

      expect(resizeSpy).to.have.been.calledOnce;
    });

    it('toggles: pause', function() {
      var component = ReactTestUtils.renderIntoDocument(<Video src={TEST_VIDEO} pause />);

      expect(component.getVideoPlayer().paused(), 'video player is not paused').to.be.true;

      component.setProps({
        pause: false
      });

      expect(component.getVideoPlayer().paused(), 'video player is not playing').to.be.false;
    });

    it('toggles: endless mode', function() {
      var endlessSpy = sandbox.spy(Video.prototype.__reactAutoBindMap, 'removeEndlessMode');
      var component = ReactTestUtils.renderIntoDocument(<Video src={TEST_VIDEO} endless />);

      component.setProps({
        endless: false
      });

      expect(endlessSpy).to.have.been.calledOnce;
    });

    it('toggles: resize', function() {
      var resizeSpy = sandbox.spy(Video.prototype.__reactAutoBindMap, 'removeResizeEventListener');
      var component = ReactTestUtils.renderIntoDocument(<Video src={TEST_VIDEO} resize />);

      component.setProps({
        resize: false
      });

      expect(resizeSpy).to.have.been.calledOnce;
    });
  });

  describe('on component will unmount', function() {
    it('unmounts: videojs player', function() {
      var unmountVideoPlayerSpy = sandbox.spy(Video.prototype.__reactAutoBindMap, 'unmountVideoPlayer');
      var resizeSpy = sandbox.spy(Video.prototype.__reactAutoBindMap, 'removeResizeEventListener');
      var component = ReactTestUtils.renderIntoDocument(<Video src={TEST_VIDEO} />);
      var domNode = React.findDOMNode(component);
      var vjsId = component.getVideoPlayer().id();

      React.unmountComponentAtNode(domNode.parentNode);

      expect(function() {
        videojs(vjsId);
      }).to.throw(TypeError, 'The element or ID supplied is not valid.');

      expect(unmountVideoPlayerSpy, '#unmountVideoPlayer not called once').to.have.been.calledOnce;
      expect(resizeSpy, '#removeResizeEventListener not called once').to.have.been.calledOnce;
    });
  });

  describe('on resize', function() {
    it('resizes on window resize', function() {
      var resizeOptions = {
        aspectRatio: 1,
        shortWindowVideoHeightAdjustment: 100,
        defaultVideoWidthAdjustment: 100
      };

      var component = ReactTestUtils.renderIntoDocument(
        <Video
          src={TEST_VIDEO}
          resizeOptions={resizeOptions}
        />
      );

      sandbox.stub(Video.prototype.__reactAutoBindMap, '_videoElementWidth').returns(400);
      sandbox.stub(Video.prototype.__reactAutoBindMap, '_windowHeight').returns(400);


    });
  });

  describe('endless mode', function() {
    it('calls: next video callback when endless mode is enabled', function(done) {
      var callback = function() { done(); };

      var component = ReactTestUtils.renderIntoDocument(
        <Video
          src={TEST_VIDEO}
          endless
          onNextVideo={callback}
        />
      );

      component.getVideoPlayer().trigger('ended');
    });

    it('ignores: next video callback when endless mode is disabled', function() {
      var callback = sandbox.spy();

      var component = ReactTestUtils.renderIntoDocument(
        <Video
          src={TEST_VIDEO}
          onNextVideo={callback}
        />
      );

      component.getVideoPlayer().trigger('ended');
      expect(callback).to.not.have.been.called;
    });
  });

  describe('component methods', function() {
    it('#getVideoPlayer', function() {
      var component = ReactTestUtils.renderIntoDocument(<Video src={TEST_VIDEO} />);

      expect(component.getVideoPlayer()).to.exist;
    });

    it('#getVideoPlayerEl', function() {
      var component = ReactTestUtils.renderIntoDocument(<Video src={TEST_VIDEO} />);

      expect(component.getVideoPlayerEl().nodeName).to.equal('VIDEO');
    });

    it('#getVideoPlayerOptions', function() {
      var component = ReactTestUtils.renderIntoDocument(
        <Video
          src={TEST_VIDEO}
          resize
          height={100}
          options={{
            preload: false,
            autoplay: false
          }}
        />
      );

      expect(component.getVideoPlayerOptions()).to.deep.equal({
        height: 'auto',
        width: 'auto',
        preload: false,
        autoplay: false,
        controls: true
      });
    });

    it('#getVideoResizeOptions', function() {
      var component = ReactTestUtils.renderIntoDocument(
        <Video
          src={TEST_VIDEO}
          resize
          resizeOptions={{
            aspectRatio: (10 / 21),
            shortWindowVideoHeightAdjustment: 10
          }}
        />
      );

      expect(component.getVideoResizeOptions()).to.deep.equal({
        aspectRatio: (10 / 21),
        shortWindowVideoHeightAdjustment: 10,
        defaultVideoWidthAdjustment: 0,
        debounceTime: 500
      });
    });

    it('#getResizedVideoPlayerMeasurements', function() {
      sandbox.stub(Video.prototype.__reactAutoBindMap, '_videoElementWidth').returns(800);
      sandbox.stub(Video.prototype.__reactAutoBindMap, '_windowHeight').returns(600);

      var resizeOptions = {
        aspectRatio: 1,
        shortWindowVideoHeightAdjustment: 100,
        defaultVideoWidthAdjustment: 100
      };

      var component = ReactTestUtils.renderIntoDocument(
        <Video
          src={TEST_VIDEO}
          resizeOptions={resizeOptions}
        />
      );

      var measurements = component.getResizedVideoPlayerMeasurements();

      expect(measurements, 'defaults applied').to.deep.equal({
        width: 700,
        height: 500
      });
    });

    it('#pauseVideo', function() {
      var component = ReactTestUtils.renderIntoDocument(<Video src={TEST_VIDEO} />);

      component.pauseVideo();

      expect(component.getVideoPlayer().paused()).to.be.true;
    });

    it('#playVideo', function() {
      var component = ReactTestUtils.renderIntoDocument(<Video src={TEST_VIDEO} pause />);

      component.playVideo();

      expect(component.getVideoPlayer().paused()).to.be.false;
    });
  });

  describe('component handlers', function() {
    it('#handleVideoPlayerReady', function() {
      var handleVideoPlayerResizeSpy = sandbox.spy(Video.prototype.__reactAutoBindMap, 'handleVideoPlayerResize');
      var handleResizeEventListenerSpy = sandbox.spy(Video.prototype.__reactAutoBindMap, 'addResizeEventListener');
      var readyCallback = sandbox.spy();

      ReactTestUtils.renderIntoDocument(
        <Video
          src={TEST_VIDEO}
          resize
          onReady={readyCallback}
        />
      );

      expect(readyCallback).to.be.calledOnce;
      expect(handleVideoPlayerResizeSpy).to.be.calledOnce;
      expect(handleResizeEventListenerSpy).to.be.calledOnce;
    });

    it('#handleVideoPlayerResize', function() {
      sandbox.stub(Video.prototype.__reactAutoBindMap, '_videoElementWidth').returns(800);
      sandbox.stub(Video.prototype.__reactAutoBindMap, '_windowHeight').returns(600);

      var component = ReactTestUtils.renderIntoDocument(
        <Video
          src={TEST_VIDEO}
          resize
          resizeOptions={{
            aspectRatio: 1,
            shortWindowVideoHeightAdjustment: 0,
            defaultVideoWidthAdjustment: 100
          }}
        />
      );

      component.handleVideoPlayerResize();

      expect(component.getVideoPlayer().width()).to.equal(700);
      expect(component.getVideoPlayer().height()).to.equal(600);
    });

    it('#handleNextVideo', function(done) {
      var callback = function() {
        done();
      };

      var component = ReactTestUtils.renderIntoDocument(
        <Video
          src={TEST_VIDEO}
          pause
          onNextVideo={callback}
        />
      );

      component.handleNextVideo();
    });
  });
});
