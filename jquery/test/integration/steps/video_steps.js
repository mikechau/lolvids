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
        }, receiveError.bind(this, $selector))
        .call(done);
    })
    .then(/the video has a source/, function(done) {
      var $selector = '#video-player';

      this.browser
        .getAttribute($selector, 'source')
        .then(function(attr) {
          expect(attr).to.exist;
          expect(attr).to.not.be.empty;
        })
        .call(done);
    })
    .then(/I see the "$string" is( not)? (\d+|empty|"$string")/, function(selectorId, not, expectedValue, expectedString, done) {
      var $selector = '#' + selectorId.replace(/\s/g,'-');

      this.browser
        .waitForText($selector, 2500)
        .getText($selector)
        .then(function(text) {
          if (expectedValue !== 'empty' && !expectedString) {
            if (not) {
              expect(text).to.not.equal(expectedValue);
            } else {
              expect(text).to.equal(expectedValue);
            };
            return true;
          }

          if (expectedValue === 'empty' && !expectedString) {
            if (not) {
              expect(text).to.not.equal('');
            } else {
              expect(text).to.equal('');
            }
            return true;
          }

          if (expectedString) {
            if (not) {
              expect(text).to.not.equal(expectedString);
            } else {
              expect(text).to.equal(expectedString);
            }
            return true;
          }
        }, receiveError.bind(this, $selector))
        .call(done);
    });
};

module.exports = videoSteps;
