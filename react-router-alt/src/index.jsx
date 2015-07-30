var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

var videojs = require('video.js');
videojs.options.flash.swf = require('file?name=[name]-[hash].[ext]!video.js/dist/video-js/video-js.swf');

var Application = require('./components/Application');

require('./stylesheets/bootstrap.less');
require('video.js/dist/video-js/video-js.css');
require('./stylesheets/app.css');

React.render(<Application />, document.getElementById('content'));

// Router.run(routes, Router.HistoryLocation, function(Handler) {
//   React.render(<Handler />, document.getElementById('content'));
// });
