var React = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var TopNavBar = require('app/components/TopNavBar');

var eventNoop = {
  preventDefault: function() {}
};

describe('TopNavBar', function() {
  describe('on initial render', function() {
    it('renders: a nav element', function() {
      var shallowRenderer = ReactTestUtils.createRenderer();
      shallowRenderer.render(<TopNavBar />);

      var component = shallowRenderer.getRenderOutput();
      expect(component.type).to.equal('nav');
      expect(component.props.className).to.equal('navbar navbar-default navbar-static-top');
    });
  });

  describe('component handlers', function() {
    it('#handleEndlessModeClick', function(done) {
      var callback = function() {
        done();
      };

      var component = ReactTestUtils.renderIntoDocument(
        <TopNavBar onEndlessModeClick={callback} />
      );

      component.handleEndlessModeClick(eventNoop);
    });
  });

  describe('#handleCollapseNavClick', function(done) {
    var component = ReactTestUtils.renderIntoDocument(
      <TopNavBar />
    );

    component.handleCollapseNavClick();

    expect(component.state.showCollapseNav, 'showCollapseNav state not true').to.be.true;

    component.handleCollapseNavClick();

    expect(component.state.showCollapseNav, 'showCollapseNav state not false').to.be.false;
  });
});
