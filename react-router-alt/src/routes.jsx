var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Placeholder = React.createClass({
  mixins: [Router.State],

  render: function() {
    return (
      <div>
        Test: {JSON.stringify(this.getParams())}
      </div>
    );
  }
});

var Application = require('./components/Application');
var VideosContainer = require('./components/VideosContainer');

var routes = (
  <Route handler={Application} path="/?">
    <DefaultRoute handler={VideosContainer} />

    <Route name="videos" path="videos/?">
      <DefaultRoute handler={VideosContainer} />

      <Route name="video" path=":videoId/?">
        <DefaultRoute handler={VideosContainer} />
      </Route>
    </Route>
  </Route>
);

module.exports = routes;