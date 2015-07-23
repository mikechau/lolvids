var React = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Video = require('app/components/VideoStage/components/Video');
var videojs = require('video.js');

var TEST_VIDEO = require('app/assets/test.mp4');

describe('VideoStage: Video', function() {
  var sandbox;

  beforeEach(function() {
    Video.__Rewire__('_debounce', function(func) { return func; });

    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    Video.__ResetDependency__('_debounce');

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

  describe('on will receive props', function() {
    it('ignores: src not changing', function() {
      var srcSpy = sandbox.spy(Video.prototype.__reactAutoBindMap, 'setVideoPlayerSrc');

      var component = ReactTestUtils.renderIntoDocument(
        <Video
          src={TEST_VIDEO}
        />
      );

      component.setProps({
        src: TEST_VIDEO
      });

      expect(srcSpy).to.not.be.called;
    });

    it('ignores: endlessMode not changing', function() {
      var endlessModeSpy = sandbox.spy(Video.prototype.__reactAutoBindMap, 'addEndlessMode');
      var nextVideoSpy = sandbox.spy();
      var component = ReactTestUtils.renderIntoDocument(
        <Video
          src={TEST_VIDEO}
          endlessMode
          onNextVideo={nextVideoSpy}
        />);

      component.getVideoPlayer().trigger('ended');

      component.setProps({
        endlessMode: true
      });

      component.getVideoPlayer().trigger('ended');

      expect(endlessModeSpy, '#addEndlessMode not attached once').to.have.been.calledOnce;
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

    it('responds: to src not changing and endless mode not changing', function() {
      var restartSpy = sandbox.spy(Video.prototype.__reactAutoBindMap, 'restartVideo');
      var component = ReactTestUtils.renderIntoDocument(
        <Video
          src={TEST_VIDEO}
          endless
        />
      );

      component.setProps({
        src: TEST_VIDEO
      });

      expect(restartSpy).to.be.calledOnce;
    });

    it('responds: to src change', function() {
      var srcSpy = sandbox.spy(Video.prototype.__reactAutoBindMap, 'setVideoPlayerSrc');
      var component = ReactTestUtils.renderIntoDocument(<Video src={TEST_VIDEO} />);

      component.setProps({
        src: TEST_VIDEO + '?q=1337'
      });

      expect(srcSpy).to.be.calledOnce;
    });

    it('responds: to endlessMode change', function() {
      var endlessModeSpy = sandbox.spy(Video.prototype.__reactAutoBindMap, 'addEndlessMode');
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
        endlessMode: true
      });

      component.getVideoPlayer().trigger('ended');

      expect(endlessModeSpy).to.have.been.calledOnce;
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

    it('toggles: endlessMode', function() {
      var endlessModeSpy = sandbox.spy(Video.prototype.__reactAutoBindMap, 'removeEndlessMode');
      var component = ReactTestUtils.renderIntoDocument(<Video src={TEST_VIDEO} endlessMode />);

      component.setProps({
        endlessMode: false
      });

      expect(endlessModeSpy).to.have.been.calledOnce;
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

  describe('on resize (window)', function() {
    it('resizes on window resize', function() {
      var resizeOptions = {
        aspectRatio: 1,
        shortWindowVideoHeightAdjustment: 100,
        defaultVideoWidthAdjustment: 100
      };

      sandbox
        .stub(Video.prototype.__reactAutoBindMap, '_videoElementWidth')
          .onFirstCall().returns(800)
          .onSecondCall().returns(400);

      sandbox
        .stub(Video.prototype.__reactAutoBindMap, '_windowHeight')
          .onFirstCall().returns(600)
          .onSecondCall().returns(400);

      var component = ReactTestUtils.renderIntoDocument(
        <Video
          src={TEST_VIDEO}
          resize
          resizeOptions={resizeOptions}
        />
      );

      var videoDomNode = React.findDOMNode(component).parentElement;

      var resizeEvent = document.createEvent('Event');
      resizeEvent.initEvent('resize', true, true);
      window.dispatchEvent(resizeEvent);

      var videoWidth = videoDomNode.style.width;
      var videoHeight = videoDomNode.style.height;

      expect(videoWidth, 'video width did not match').to.equal('300px');
      expect(videoHeight, 'video height did not match').to.equal('300px');
    });
  });

  describe('endless mode', function() {
    it('calls: next video callback when endless mode is enabled', function(done) {
      var callback = function() { done(); };

      var component = ReactTestUtils.renderIntoDocument(
        <Video
          src={TEST_VIDEO}
          endlessMode
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

    it('#setVideoPlayerSrc', function() {
      var NEW_VIDEO = TEST_VIDEO + '?q=1337';
      var component = ReactTestUtils.renderIntoDocument(<Video src={TEST_VIDEO} />);

      component.setVideoPlayerSrc(NEW_VIDEO);

      expect(component.getVideoPlayer().src()).to.contain(NEW_VIDEO);
    });

    it('#pauseVideo', function() {
      var component = ReactTestUtils.renderIntoDocument(<Video src={TEST_VIDEO} />);

      component.pauseVideo();

      expect(component.getVideoPlayer().paused()).to.be.true;
    });

    it('#playVideo', function() {
      var component = ReactTestUtils.renderIntoDocument(<Video src={TEST_VIDEO} />);

      component.pauseVideo();
      component.playVideo();

      expect(component.getVideoPlayer().paused()).to.be.false;
    });

    it('#restartVideo', function() {
      var component = ReactTestUtils.renderIntoDocument(<Video src={TEST_VIDEO} />);

      component.pauseVideo();
      component.restartVideo();

      expect(component.getVideoPlayer().paused()).to.be.false;
    });

    it('#togglePauseVideo', function() {
      var component = ReactTestUtils.renderIntoDocument(<Video src={TEST_VIDEO} />);

      component.getVideoPlayer().pause();
      component.togglePauseVideo();

      expect(component.getVideoPlayer().paused(), 'video is not playing').to.be.false;

      component.togglePauseVideo();

      expect(component.getVideoPlayer().paused(), 'video is not paused').to.be.true;
    });
  });

  describe('component handlers', function() {
    it('#handleVideoPlayerReady', function() {
      var handleVideoPlayerResizeSpy = sandbox.spy(Video.prototype.__reactAutoBindMap, 'handleVideoPlayerResize');
      var handleResizeEventListenerSpy = sandbox.spy(Video.prototype.__reactAutoBindMap, 'addResizeEventListener');
      var readyCallback = sandbox.spy();

      var component = ReactTestUtils.renderIntoDocument(
        <Video
          src={TEST_VIDEO}
          resize
          onReady={readyCallback}
        />
      );

      var vjsParentEl = component.getVideoPlayerEl().parentElement;

      expect(vjsParentEl.getAttribute('data-reactid')).to.not.exist;
      expect(readyCallback, 'on ready callback not called once').to.be.calledOnce;
      expect(handleVideoPlayerResizeSpy, '#handleVideoPlayerResize not called once').to.be.calledOnce;
      expect(handleResizeEventListenerSpy, '#addResizeEventListener not called once').to.be.calledOnce;
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
          onNextVideo={callback}
        />
      );

      component.handleNextVideo();
    });
  });
});
