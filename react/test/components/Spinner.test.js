import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Spinner from 'app/components/Spinner';

describe('Spinner', function() {
  it('renders: a loading indicator', function() {
    var shallowRenderer = ReactTestUtils.createRenderer();
    shallowRenderer.render(<Spinner />);

    var component = shallowRenderer.getRenderOutput();

    expect(component.type).to.equal('div');
    expect(component.props.style).to.equal('position:fixed;top:50%;left:50%');

    expect(component.props.children.type).to.equal('div');
    expect(component.props.children.props.className).to.equal('whirly-loader');
  });
});
