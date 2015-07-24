var React = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Spinner = require('app/components/Spinner');

describe('Spinner', function() {
  describe('on initial render', function() {
    it('renders: a loading indicator', function() {
      var shallowRenderer = ReactTestUtils.createRenderer();
      shallowRenderer.render(<Spinner />);

      var component = shallowRenderer.getRenderOutput();

      expect(component.type, 'tag did not match').to.equal('div');
      expect(component.props.style, 'style did not match').to.eql({
        position: 'fixed',
        top: '50%',
        left: '50%'
      });

      expect(component.props.children.type, 'child tag did not match').to.equal('div');
      expect(component.props.children.props.className, 'child className did not match').to.equal('whirly-loader');
    });
  });
});
