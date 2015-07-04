var _ = require('lodash');

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
    .when(/I press the "$string" arrow key/, function(keyDirection, done) {
      var keyChar = _.capitalize(keyDirection) + ' arrow';

      this
        .browser
        .keys(keyChar)
        .call(done);
    })
    .then(/I see a video/, function(done) {
      var $selector = 'video#video-player_html5_api';

      this.browser
        .waitForExist($selector, 2500)
        .getTagName($selector)
        .then(function(tagName) {
          expect(tagName).to.equal('video');
        }, receiveError.bind(this, $selector))
        .call(done);
    })
    .then(/the video has a source/, function(done) {
      var $selector = 'video#video-player_html5_api';

      this.browser
        .waitUntil(function() {
          return this
            .getAttribute($selector, 'src')
            .then(function(attr) {
              return (attr && attr !== '');
            });
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
    })
    .then(/I see I am on the last video/, function(done) {
      var $start = '#video-counter-start';
      var $end = '#video-counter-end';

      var currentPosition;

      this
        .browser
        .waitForText($start)
        .getText($start)
        .then(function(text) {
          expect(text).to.not.be.empty;
          currentPosition = text;
        })
        .waitForText($end)
        .getText($end)
        .then(function(text) {
          expect(text).to.not.be.empty;
          expect(text).to.equal(currentPosition);
        })
        .call(done);
    });
};

module.exports = videoSteps;
