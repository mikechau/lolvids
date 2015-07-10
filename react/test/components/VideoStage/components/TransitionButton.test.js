import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import TransitionButton from 'app/components/VideoStage/components/TransitionButton';

describe('VideoStage: TransitionButton', function() {
  it('renders: a div', function() {
    var shallowRenderer = ReactTestUtils.createRenderer();
    shallowRenderer.render(<TransitionButton right />);

    var component = shallowRenderer.getRenderOutput();
    expect(component.type).to.equal('div');
    expect(component.props.className).to.contain('col-video-transition');
  });

  it('renders: a next video transition button', function() {
    var shallowRenderer = ReactTestUtils.createRenderer();
    shallowRenderer.render(<TransitionButton right />);

    var component = shallowRenderer.getRenderOutput();
    expect(component.props.children.type).to.equal('span');
    expect(component.props.children.props.className).to.equal('glyphicon glyphicon-menu-right');
  });

  it('renders a left video transition button', function() {
    var shallowRenderer = ReactTestUtils.createRenderer();
    shallowRenderer.render(<TransitionButton left />);

    var component = shallowRenderer.getRenderOutput();
    expect(component.props.children.type).to.equal('span');
    expect(component.props.children.props.className).to.equal('glyphicon glyphicon-menu-left');
  });
});
