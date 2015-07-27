var alt = require('app/flux/alt');
var videosActions = require('app/flux/actions/VideosActions');

var MOCK_RESPONSE = [
  {source: 'test.local/1', name: 'TEST', id: '1', ts: 'T1'},
  {source: 'test.local/2', name: 'TEST2', id: '2', ts: 'T2'}
];

describe('Actions: VideosActions', function() {
  var sandbox;

  beforeEach(function() {
    alt.recycle();

    sandbox = sinon.sandbox.create();

    videosActions.__Rewire__('VideosApi', {
      getAll: function getAll() {
        return Promise.resolve(MOCK_RESPONSE);
      }
    });
  });

  afterEach(function() {
    sandbox.restore();

    videosActions.__ResetDependency__('VideosApi');
  });

  describe('#fetchVideos', function() {
    it('fetches videos from videos api', function(done) {
      var dispatcherSpy = sandbox.spy(alt.dispatcher, 'dispatch');

      videosActions
        .fetchVideos()
          .then(function() {
            var dispatcherArgs = dispatcherSpy.args;
            expect(dispatcherSpy).to.be.calledTwice;

            var firstDispatchArgs = dispatcherArgs[0][0];
            expect(firstDispatchArgs.action, '1st dispatch: action name did not match').to.equal('VideosActions.fetchVideos');
            expect(firstDispatchArgs.data, '1st dispatch: data did not match').to.not.exist;

            var secondDispatchArgs = dispatcherArgs[1][0];
            expect(secondDispatchArgs.action, '2nd dispatch: action name did not match').to.equal('VideosActions.updateVideos');
            expect(secondDispatchArgs.data, '2nd dispatch: data did not match').to.eql(MOCK_RESPONSE);
          })
          .then(done)
          .catch(done);
    });
  });

  describe('#updateVideos', function() {
    it('dispatches videos payload', function() {
      var mockPayload = [{test: '123'}];
      var dispatcherSpy = sandbox.spy(alt.dispatcher, 'dispatch');

      videosActions.updateVideos(mockPayload);

      var dispatcherArgs = dispatcherSpy.args;
      expect(dispatcherSpy).to.be.calledOnce;

      var firstDispatchArgs = dispatcherArgs[0][0];
      expect(firstDispatchArgs.action, '1st dispatch: action name did not match').to.equal('VideosActions.updateVideos');
      expect(firstDispatchArgs.data, '1st dispatch: data did not match').to.eql(mockPayload);
    });
  });
});
