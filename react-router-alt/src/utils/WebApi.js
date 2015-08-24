var fetch = require('isomorphic-fetch');

function get(url) {
  return (
    fetch(url)
      .then(function(response) {
        return response.json();
      })
  );
}

module.exports = {
  get: get
};
