var React = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');

var TestContext = require('../_react/TestContext');

var Application = require('app/components/Application');
var TopNavBar = require('app/components/TopNavBar');

describe('Application', function() {
  var componentNode;

  beforeEach(function() {
    componentNode = document.createElement('div');
  });

  afterEach(function() {
    React.unmountComponentAtNode(componentNode);
  });

  describe('on initial render', function() {
    it('renders: a top nav bar component', function() {
      var context = TestContext.getRouterComponent(componentNode, Application);
      var component = context.component;

      var topNavBarComponent = ReactTestUtils.findRenderedComponentWithType(component, TopNavBar);

      expect(topNavBarComponent).to.be.instanceOf(TopNavBar);
    });
  });

  describe('component handlers', function() {
    it('#handleEndlessModeClick', function() {
      var context = TestContext.getRouterComponent(componentNode, Application);
      var component = context.component;

      component.handleEndlessModeClick();

      expect(component.state.endlessMode, 'endlessMode did not update to false').to.be.false;

      component.handleEndlessModeClick();

      expect(component.state.endlessMode, 'endlessMode did not update to true').to.be.true;
    });
  });
});
