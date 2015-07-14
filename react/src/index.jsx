var React = require('react');
var Application = require('./components/Application');

require('./stylesheets/bootstrap.less');
require('video.js/dist/video-js/video-js.css');
require('./stylesheets/app.css');

React.render(<Application />, document.getElementById('content'));
