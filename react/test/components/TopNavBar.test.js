var React = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var TopNavBar = require('app/components/TopNavBar');

var eventNoop = {
  preventDefault: function() {}
};

describe('TopNavBar', function() {
  var component;

  beforeEach(function() {
    component = null;
  });

  afterEach(function() {
    if (component) {
      React.unmountComponentAtNode(React.findDOMNode(component).parentNode);
    }
  });

  describe('on initial render', function() {
    it('renders: a nav element', function() {
      var shallowRenderer = ReactTestUtils.createRenderer();
      shallowRenderer.render(<TopNavBar />);

      var shallowComponent = shallowRenderer.getRenderOutput();
      expect(shallowComponent.type).to.equal('nav');
      expect(shallowComponent.props.className).to.equal('navbar navbar-default navbar-static-top');
    });
  });

  describe('on click (endless mode)', function() {
    it('toggles: "active" class', function() {
      component = ReactTestUtils.renderIntoDocument(
        <TopNavBar endlessMode />
      );

      var toggleDOMNode = React.findDOMNode(component.refs.endlessModeToggle);
      expect(toggleDOMNode.className, 'active class not set').to.contain('active');

      component.setProps({
        endlessMode: false
      });

      expect(toggleDOMNode.className, 'active class not unset').to.not.contain('active');
    });
  });

  describe('on click (collapse nav)', function() {
    it('toggles: "navbar-collapse" and "collapse" classes', function() {
      component = ReactTestUtils.renderIntoDocument(
        <TopNavBar />
      );

      var collapsedNavMenuDOMNode = React.findDOMNode(component.refs.collapsedNavMenuOptions);

      expect(collapsedNavMenuDOMNode.className, 'it is not collapsed').to.contain('navbar-collapse collapse');

      ReactTestUtils.Simulate.click(component.refs.collapseNavMenuButton);

      expect(collapsedNavMenuDOMNode.className, 'it is not expanded').to.not.contain('navbar-collapse collapse');
    });
  });

  describe('component handlers', function() {
    it('#handleEndlessModeClick', function(done) {
      var callback = function() {
        done();
      };

      component = ReactTestUtils.renderIntoDocument(
        <TopNavBar onEndlessModeClick={callback} />
      );

      component.handleEndlessModeClick(eventNoop);
    });

    it('#handleCollapseNavClick', function() {
      component = ReactTestUtils.renderIntoDocument(
        <TopNavBar />
      );

      component.handleCollapseNavClick();

      expect(component.state.showCollapseNav, 'showCollapseNav state not true').to.be.true;

      component.handleCollapseNavClick();

      expect(component.state.showCollapseNav, 'showCollapseNav state not false').to.be.false;
    });
  });
});
