import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Video from 'app/components/VideoStage/components/Video';

var TEST_VIDEO = 'http://vjs.zencdn.net/v/oceans.mp4';

function renderComponent(ReactComponent) {
  var component = ReactTestUtils.renderIntoDocument(ReactComponent);
  var domNode = React.findDOMNode(component);

  return {
    react: component,
    domNode: domNode,
    vjsNode: domNode.parentElement
  };
}

describe('VideoStage: Video', function() {
  describe('on initial render', function() {
    it('renders: a videojs player', function() {
      var component = renderComponent(<Video src={TEST_VIDEO} />);

      expect(component.domNode.nodeName).equal('VIDEO');
      expect(component.vjsNode.className).to.contain('video-js');
    });

    it('renders: with default vjs classes', function() {
      var component = renderComponent(<Video src={TEST_VIDEO} />);

      expect(component.vjsNode.className).to.contain('vjs-default-skin vjs-big-play-centered');
    });
  });

  describe('on component did mount', function() {
    it('mounts: videojs player', function() {
      var mountVideoPlayerSpy = sinon.spy(Video.prototype.__reactAutoBindMap, 'mountVideoPlayer');

      renderComponent(<Video src={TEST_VIDEO} />);
      expect(mountVideoPlayerSpy.calledOnce).to.be.true;
    });
  });

  describe('on component will unmount', function() {
    it('unmounts: videojs player', function() {
      var unmountVideoPlayerSpy = sinon.spy(Video.prototype.__reactAutoBindMap, 'unmountVideoPlayer');
      var component = renderComponent(<Video src={TEST_VIDEO} />);

      React.unmountComponentAtNode(component.domNode.parentNode);
      expect(unmountVideoPlayerSpy.calledOnce).to.be.true;
    });
  });
});
