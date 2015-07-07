import TopNavBar from '../../src/components/TopNavBar';

describe('TopNavBar', function() {
  jsdom();

  it('renders: a nav element', function() {
    const component = TestUtils.renderIntoDocument(<TopNavBar />);
    const domNode = React.findDOMNode(component);

    expect(domNode.nodeName).to.equal('NAV');
  });
});
