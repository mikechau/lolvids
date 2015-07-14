import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import TopNavBar from 'app/components/TopNavBar';

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
});
