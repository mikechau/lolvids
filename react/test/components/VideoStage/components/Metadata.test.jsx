var React = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Metadata = require('app/components/VideoStage/components/Metadata');

var data = {
  title: 'I am a test',
  timestamp: '2015-07-09T23:38:32+0000',
  id: '50_1337_9000',
  startIndex: 1,
  endIndex: 9000
};

describe('VideoStage: Metadata', function() {
  var component;
  var domNode;

  describe('on initial render', function() {
    beforeEach(function() {
      component = null;
      component = ReactTestUtils.renderIntoDocument(
        <Metadata
          title={data.title}
          timestamp={data.timestamp}
          id={data.id}
          startIndex={data.startIndex}
          endIndex={data.endIndex}
        />
      );

      domNode = React.findDOMNode(component);
    });

    afterEach(function() {
      React.unmountComponentAtNode(React.findDOMNode(component).parentNode);
    });

    it('renders: a title', function() {
      // We use element IDs to preserve some mapping from the jquery version.
      // A more React way would be to use refs or break these components out further and use shallow rendering.
      var title = domNode.querySelector('#video-title');

      expect(title.textContent).to.equal(data.title);
    });

    it('renders: a timestamp', function() {
      var timestamp = domNode.querySelector('#video-timestamp');

      expect(timestamp.textContent).to.equal(data.timestamp);
    });

    it('renders: a id', function() {
      var id = domNode.querySelector('#video-id');

      expect(id.textContent).to.equal(data.id);
    });

    it('renders: a video counter', function() {
      var startIndex = domNode.querySelector('#video-counter-start');
      var endIndex = domNode.querySelector('#video-counter-end');

      expect(startIndex.textContent).to.equal(data.startIndex.toString());
      expect(endIndex.textContent).to.equal(data.endIndex.toString());
    });

    it('renders: a link to source', function() {
      var source = domNode.querySelector('h3 > a');

      expect(source.getAttribute('href')).to.equal('https://www.facebook.com/BestofVines');
      expect(source.textContent).to.equal('Best of Vines');
    });
  });
});
