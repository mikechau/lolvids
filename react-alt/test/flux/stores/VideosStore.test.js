var alt = require('app/flux/alt');
var videosStore = require('app/flux/stores/VideosStore').videosStore;
var videosActions = require('app/flux/actions/VideosActions');

var VIDEOS_MOCK_PAYLOAD = [
  {source: 'test.local/1'}
];

describe('Store: VideosStore', function() {
  beforeEach(function() {
    alt.recycle();
  });

  it('listens for a fetch videos action', function() {
    alt.dispatcher.dispatch({action: videosActions.FETCH_VIDEOS});

    var state = videosStore.getState();

    expect(state.loading, 'loading is not true').to.be.true;
    expect(state.videos, 'videos are not empty').to.be.empty;
  });

  it('listens for a update videos action', function() {
    alt.dispatcher.dispatch({action: videosActions.UPDATE_VIDEOS, data: VIDEOS_MOCK_PAYLOAD});

    var state = videosStore.getState();

    expect(state.loading, 'loading is not false').to.be.false;
    expect(state.videos, 'videos does not match').to.eql(VIDEOS_MOCK_PAYLOAD);
  });
});
