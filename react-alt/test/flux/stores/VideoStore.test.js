var alt = require('app/flux/alt');
var videoStore = require('app/flux/stores/VideoStore').videoStore;
var videoActions = require('app/flux/actions/VideoActions');

var VIDEOS_MOCK_PAYLOAD = [
  {source: 'test.local/1'}
];

describe('Store: VideoStore', function() {
  beforeEach(function() {
    alt.recycle();
  });

  it('listens for a fetch videos action', function() {
    alt.dispatcher.dispatch({action: videoActions.FETCH_VIDEOS});

    var state = videoStore.getState();

    expect(state.loading, 'loading is not true').to.be.true;
    expect(state.videos, 'videos are not empty').to.be.empty;
  });

  it('listens for a update videos action', function() {
    alt.dispatcher.dispatch({action: videoActions.UPDATE_VIDEOS, data: VIDEOS_MOCK_PAYLOAD});

    var state = videoStore.getState();

    expect(state.loading, 'loading is not false').to.be.false;
    expect(state.videos, 'videos does not match').to.eql(VIDEOS_MOCK_PAYLOAD);
  });
});
