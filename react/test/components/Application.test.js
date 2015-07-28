var React = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Application = require('app/components/Application');

var TopNavBar = require('app/components/TopNavBar');
var Spinner = require('app/components/Spinner');
var VideoStage = require('app/components/VideoStage');

var TEST_VIDEO = require('app/assets/test.mp4');

var RESPONSE = {
  json: function() {
    return (
      [
        {source: TEST_VIDEO, name: 'TEST', id: '1', ts: 'T1'},
        {source: TEST_VIDEO + '?q=1337', name: 'TEST2', id: '2', ts: 'T2'}
      ]
    );
  }
};

describe('Application', function() {
  var sandbox;
  var component;

  beforeEach(function() {
    Application.__Rewire__('fetch', function() { return Promise.resolve(RESPONSE); });

    sandbox = sinon.sandbox.create();

    component = null;
  });

  afterEach(function() {
    Application.__ResetDependency__('fetch');

    sandbox.restore();

    if (component) {
      React.unmountComponentAtNode(React.findDOMNode(component).parentNode);
    }
  });

  describe('on initial render', function() {
    it('renders: a top nav bar component', function() {
      sandbox.stub(Application.prototype, 'componentDidMount').returns(true);

      component = ReactTestUtils.renderIntoDocument(<Application />);

      var topNavBarComponent = ReactTestUtils.findRenderedComponentWithType(component, TopNavBar);

      expect(topNavBarComponent).to.be.instanceOf(TopNavBar);
    });

    it('renders: a spinner component when loading', function() {
      sandbox.stub(Application.prototype, 'componentDidMount').returns(true);
      sandbox.stub(Application.prototype.__reactAutoBindMap, 'fetchVideos').returns(true);

      component = ReactTestUtils.renderIntoDocument(<Application />);

      var spinnerComponent = ReactTestUtils.findRenderedComponentWithType(component, Spinner);

      expect(spinnerComponent).to.be.instanceOf(Spinner);
    });
  });

  describe('on component did mount', function() {
    it('calls: #fetchVideos', function(done) {
      sandbox.stub(Application.prototype.__reactAutoBindMap, 'fetchVideos').returns(done());

      component = ReactTestUtils.renderIntoDocument(<Application />);
    });
  });

  describe('on fetch videos (success)', function() {
    it('calls: #setVideos', function(done) {
      sandbox.stub(Application.prototype, 'componentDidMount').returns(true);

      var setVideosSpy = sandbox.spy(Application.prototype.__reactAutoBindMap, 'setVideos');

      component = ReactTestUtils.renderIntoDocument(<Application />);

      var checkForSetVideosCall = function() {
        expect(setVideosSpy).to.be.calledOnce;
        done();
      };

      component
        .fetchVideos()
        .then(checkForSetVideosCall);
    });

    it('renders: a video stage component', function(done) {
      sandbox.stub(Application.prototype, 'componentDidMount').returns(true);

      component = ReactTestUtils.renderIntoDocument(<Application />);

      var checkForVideoStage = function() {
        var videoStageComponent = ReactTestUtils.findRenderedComponentWithType(component, VideoStage);
        expect(videoStageComponent).to.be.instanceOf(VideoStage);
        done();
      };

      component
        .fetchVideos()
        .then(checkForVideoStage);
    });
  });

  describe('component methods', function() {
    it('#setVideos', function() {
      sandbox.stub(Application.prototype, 'componentDidMount').returns(true);

      component = ReactTestUtils.renderIntoDocument(<Application />);

      component.setVideos([]);

      expect(component.state.videos).to.eql([]);
    });
  });

  describe('component handlers', function() {
    it('#handleEndlessModeClick', function() {
      sandbox.stub(Application.prototype, 'componentDidMount').returns(true);

      component = ReactTestUtils.renderIntoDocument(<Application />);

      component.handleEndlessModeClick();

      expect(component.state.endlessMode, 'endlessMode did not update to false').to.be.false;

      component.handleEndlessModeClick();

      expect(component.state.endlessMode, 'endlessMode did not update to true').to.be.true;
    });
  });
});
