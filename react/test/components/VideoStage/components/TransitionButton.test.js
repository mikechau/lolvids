import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import TransitionButton from 'app/components/VideoStage/components/TransitionButton';

describe('VideoStage: TransitionButton', function() {
  describe('on initial render', function() {
    it('renders: a div with class "col-video-transition"', function() {
      var shallowRenderer = ReactTestUtils.createRenderer();
      shallowRenderer.render(<TransitionButton direction="right" />);

      var component = shallowRenderer.getRenderOutput();
      expect(component.type).to.equal('div');
      expect(component.props.className).to.contain('col-video-transition');
    });

    it('renders: a next video transition button', function() {
      var shallowRenderer = ReactTestUtils.createRenderer();
      shallowRenderer.render(<TransitionButton direction="right" />);

      var component = shallowRenderer.getRenderOutput();
      expect(component.props.children.type).to.equal('span');
      expect(component.props.children.props.className).to.equal('glyphicon glyphicon-menu-right');
    });

    it('renders: a left video transition button', function() {
      var shallowRenderer = ReactTestUtils.createRenderer();
      shallowRenderer.render(<TransitionButton direction="left" />);

      var component = shallowRenderer.getRenderOutput();
      expect(component.props.children.type).to.equal('span');
      expect(component.props.children.props.className).to.equal('glyphicon glyphicon-menu-left');
    });
  });

  describe('on click', function() {
    it('calls: a onClick callback', function(done) {
      var doneOp = function() {
        done();
      };

      var component = ReactTestUtils.renderIntoDocument(
        <TransitionButton direction="right" onClick={doneOp} />
      );
      var domNode = React.findDOMNode(component);

      ReactTestUtils.Simulate.click(domNode);
    });

    it('returns: the movement value when moving right', function(done) {
      var doneOp = function(movementValue, e) {
        expect(movementValue).to.equal(1);
        done();
      };

      var component = ReactTestUtils.renderIntoDocument(
        <TransitionButton direction="right" onClick={doneOp} />
      );
      var domNode = React.findDOMNode(component);

      ReactTestUtils.Simulate.click(domNode);
    });

    it('returns: the movement value when moving left', function(done) {
      var doneOp = function(movementValue, e) {
        expect(movementValue).to.equal(-1);
        done();
      };

      var component = ReactTestUtils.renderIntoDocument(
        <TransitionButton direction="left" onClick={doneOp} />
      );
      var domNode = React.findDOMNode(component);

      ReactTestUtils.Simulate.click(domNode);
    });
  });
});
