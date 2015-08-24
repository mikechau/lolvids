var React = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Router = require('react-router');
var Route = Router.Route;
var TestLocation = Router.TestLocation;
var stubRouterContext = require('./StubRouterContext');

var TestContext = {
  getRouterComponent: function(targetNode, targetComponent, props) {
    // create components
    var component;
    var mainComponent;

    // and routes
    var routes = (
      <Route name="test" path="/test" handler={targetComponent} />
    );

    // create router history
    var location = new TestLocation(['/test']);

    // run router
    Router.run(routes, location, function(Handler) {
      // stub out router context
      var TestSubject = stubRouterContext(Handler, props);

      // return render main component into dom
      mainComponent = React.render(<TestSubject />, targetNode);

      // and utility component
      component = ReactTestUtils.findRenderedComponentWithType(mainComponent, targetComponent);
    });

    return {
      component: component,
      mainComponent: mainComponent,
      location: TestLocation
    };
  }
};

module.exports = TestContext;
