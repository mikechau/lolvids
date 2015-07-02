function receiveError(tag, err) {
  var tag = tag || 'ERROR';
  var message = '(' + tag + ')';

  if (err && err.message) {
    message = message + ' ' + err.message;
  }

  try {
      expect(err).to.equal(undefined, message);
  } catch(e) {
      expect(err).to.equal(null, message);
  }
}

function videoSteps() {
  this
    .given(/I am a user/, function(done) {
      done();
    })
    .when(/I go to the base url/, function(done) {
      this.browser
        .url(this.baseUrl)
        .call(done);
    })
    .when(/I go to the path "$string"/, function(urlPath, done) {
      this.browser
        .url(`${this.baseUrl}/${urlPath}`)
        .call(done);
    })
    .then(/I see a video/, function(done) {
      var $selector = '#video-player';

      this.browser
        .getTagName($selector)
        .then(function(tagName) {
          expect(tagName).to.equal('video');
        }, receiveError.bind($selector))
        .call(done);
    })
    .then(/I see the video counter at "$string"/, function(count, done) {
      var $selector = '#video-counter-start';

      this.browser
        .waitForText($selector, 2500)
        .getText($selector)
        .then(function(text) {
          expect(text).to.equal(count);
        }, receiveError.bind($selector))
        .call(done);
    })
    .then(/I see the video title/, function(done) {
      var $selector = '#video-title';

      this.browser
        .waitForText($selector, 2500)
        .getText($selector)
        .then(function(text) {
          expect(text).to.not.equal('');
        }, receiveError.bind($selector))
        .call(done);
    });
};

module.exports = videoSteps;
