var VideosApi = require('app/utils/VideosApi');

var MOCK_RESPONSE = [
  {source: 'test.local/1', name: 'TEST', id: '1', ts: 'T1'},
  {source: 'test.local/2', name: 'TEST2', id: '2', ts: 'T2'}
];

describe('Utils: VideosApi', function() {
  beforeEach(function() {
    VideosApi.__Rewire__('WebApi', {
      get: function get() {
        return Promise.resolve(MOCK_RESPONSE);
      }
    });
  });

  afterEach(function() {
    VideosApi.__ResetDependency__('WebApi');
  });

  describe('on success', function() {
    it('resolves: json response', function(done) {
      var checkResponse = function(response) {
        expect(response).to.eql(MOCK_RESPONSE);
      };

      VideosApi
        .getAll()
        .then(checkResponse)
        .then(done);
    });
  });
});
