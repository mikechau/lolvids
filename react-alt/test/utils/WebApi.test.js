var WebApi = require('app/utils/WebApi');

var MOCK_FETCH_RESPONSE = {
  json: function() {
    return (
      [
        {source: 'test.local/1', name: 'TEST', id: '1', ts: 'T1'},
        {source: 'test.local/2', name: 'TEST2', id: '2', ts: 'T2'}
      ]
    );
  }
};

describe('Utils: WebApi', function() {
  beforeEach(function() {
    WebApi.__Rewire__('fetch', function() { return Promise.resolve(MOCK_FETCH_RESPONSE); });
  });

  afterEach(function() {
    WebApi.__ResetDependency__('fetch');
  });

  describe('on success', function() {
    it('resolves: json response', function(done) {
      var checkResponse = function(response) {
        expect(response).to.eql(MOCK_FETCH_RESPONSE.json());
      };

      WebApi
        .get('//test.local')
        .then(checkResponse)
        .then(done);
    });
  });
});
