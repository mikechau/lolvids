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
    .when(/I click the "$string" video action/, function(clickAction, done) {
      var $selector = '#video-' + clickAction + '-action';

      this
        .browser
        .click($selector)
        .then(null, receiveError.bind(this, $selector))
        .call(done);
    })
    .when(/I resize the window to "$string" by "$string"/, function(widthString, heightString, done) {
      var width = parseInt(widthString);
      var height = parseInt(heightString);

      this
        .browser
        .windowHandleSize({ width: width, height: height })
        .call(done)
    })
    .when(/I press the "spacebar" key/, function(done) {
      this
        .browser
        .execute(function() {
          var player = videojs('#video-player');
          player.play();
          return true;
        })
        .keys('Space')
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
    })
    .then(/I see the video has resized to "$string" by "$string"/, function(rawWidth, rawHeight, done) {
      var expectedWidth = parseInt(rawWidth);
      var expectedHeight = parseInt(rawHeight);

      this
        .browser
        .getCssProperty('#video-player', 'width')
        .then(function(width) {
          var roundedWidth = Math.round(width.parsed.value);
          expect(roundedWidth).to.be.within(roundedWidth - 1, roundedWidth + 1);
        })
        .getCssProperty('#video-player', 'height')
        .then(function(height) {
          var roundedHeight = Math.round(height.parsed.value);

          expect(roundedHeight).to.be.within(roundedHeight - 1, roundedHeight + 1);
        })
        .call(done);
    })
    .then(/the video is paused/, function(done) {
      this
        .browser
        .execute(function() {
          var player = videojs('#video-player');
          return player.paused();
        })
        .then(function(status) {
          expect(status.value).to.be.true;
        })
        .call(done);
    });
};

module.exports = videoSteps;
