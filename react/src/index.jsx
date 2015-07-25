var React = require('react');
var Application = require('./components/Application');
var videojs = require('video.js');

videojs.options.flash.swf = require('file?name=[name]-[hash].[ext]!video.js/dist/video-js/video-js.swf');

require('./stylesheets/bootstrap.less');
require('video.js/dist/video-js/video-js.css');
require('./stylesheets/app.css');

React.render(<Application />, document.getElementById('content'));
