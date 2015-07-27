var React = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');

var videosActions = require('app/flux/actions/VideosActions');

var Application = require('app/components/Application');
var TopNavBar = require('app/components/TopNavBar');
var Spinner = require('app/components/Spinner');
var VideoStage = require('app/components/VideoStage');

var TEST_VIDEO = require('app/assets/test.mp4');

var MOCK_RESPONSE = [
  {source: TEST_VIDEO, name: 'TEST', id: '1', ts: 'T1'},
  {source: TEST_VIDEO + '?q=1337', name: 'TEST2', id: '2', ts: 'T2'}
];

describe('Application', function() {
  var sandbox;
  var component;

  beforeEach(function() {
    videosActions.__Rewire__('VideosApi', {
      getAll: function() {
        return Promise.resolve(MOCK_RESPONSE);
      }
    });

    sandbox = sinon.sandbox.create();

    component = null;
  });

  afterEach(function() {
    videosActions.__ResetDependency__('VideosApi');

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

      component = ReactTestUtils.renderIntoDocument(<Application />);

      var spinnerComponent = ReactTestUtils.findRenderedComponentWithType(component, Spinner);

      expect(spinnerComponent).to.be.instanceOf(Spinner);
    });
  });

  describe('on component did mount', function() {
    it('calls: #fetchVideos action', function() {
      var fetchVideosSpy = sandbox.spy(videosActions, 'fetchVideos');

      component = ReactTestUtils.renderIntoDocument(<Application />);

      expect(fetchVideosSpy).to.be.calledOnce;
    });
  });

  describe('on fetch videos (success)', function() {
    it('renders: a video stage component', function(done) {
      sandbox.stub(Application.prototype, 'componentDidMount').returns(true);

      component = ReactTestUtils.renderIntoDocument(<Application />);

      var checkForVideoStage = function() {
        var videoStageComponent = ReactTestUtils.findRenderedComponentWithType(component, VideoStage);
        expect(videoStageComponent).to.be.instanceOf(VideoStage);
        done();
      };

      videosActions
        .fetchVideos()
        .then(checkForVideoStage);
    });
  });

  describe('component handlers', function() {
    it('#handleEndlessModeClick', function() {
      sandbox.stub(Application.prototype, 'componentDidMount', function() {
        return true;
      });

      component = ReactTestUtils.renderIntoDocument(<Application />);

      component.handleEndlessModeClick();

      expect(component.state.endlessMode, 'endlessMode did not update to false').to.be.false;

      component.handleEndlessModeClick();

      expect(component.state.endlessMode, 'endlessMode did not update to true').to.be.true;
    });
  });
});
