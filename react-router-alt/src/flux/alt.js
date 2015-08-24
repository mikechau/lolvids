var Alt = require('alt');
var alt = new Alt();

if (process.env.NODE_ENV === 'development') {
  var chromeDebug = require('alt/utils/chromeDebug');
  chromeDebug(alt);
}

module.exports = alt;
