import Dropdown from '../../src/components/Dropdown';

function bodyClick() {
  const evt = document.createEvent('HTMLEvents');
  evt.initEvent('click', false, true);
  document.body.dispatchEvent(evt);
}

describe('Dropdown', function() {
  jsdom();

  it('renders: a dropdown list item element', function() {
    const component = TestUtils.renderIntoDocument(<Dropdown title="Test" />);
    const domNode = React.findDOMNode(component);

    expect(domNode.nodeName).to.equal('LI');
    expect(domNode.getAttribute('class')).to.equal('dropdown-toggle');
  });

  describe('on click (component)', function() {
    it('state toggles: open to "true" and then to "false"', function() {
      const component = TestUtils.renderIntoDocument(<Dropdown title="Test" />);
      const dropdownLink = TestUtils.findRenderedDOMComponentWithTag(component, 'a');

      TestUtils.Simulate.click(dropdownLink);
      expect(component.state.open).to.be.true;

      TestUtils.Simulate.click(dropdownLink);
      expect(component.state.open).to.be.false;
    });

    it('render toggles: open class', function() {
      const component = TestUtils.renderIntoDocument(<Dropdown title="Test" />);
      const domNode = React.findDOMNode(component);
      const dropdownLink = TestUtils.findRenderedDOMComponentWithTag(component, 'a');

      TestUtils.Simulate.click(dropdownLink);
      expect(domNode.getAttribute('class')).to.equal('dropdown-toggle open');

      TestUtils.Simulate.click(dropdownLink);
      expect(domNode.getAttribute('class')).to.equal('dropdown-toggle');
    });
  });

  describe('on click (body)', function() {
    it('state updates: open to "false" when "true"', function() {
      const component = TestUtils.renderIntoDocument(<Dropdown title="Test" />);
      const dropdownLink = TestUtils.findRenderedDOMComponentWithTag(component, 'a');

      TestUtils.Simulate.click(dropdownLink);
      expect(component.state.open).to.be.true;

      bodyClick();
      expect(component.state.open).to.be.false;
    });

    it('state not updated: open stays "false"', function() {
      const component = TestUtils.renderIntoDocument(<Dropdown title="Test" />);
      const dropdownLink = TestUtils.findRenderedDOMComponentWithTag(component, 'a');

      bodyClick();
      expect(component.state.open).to.be.false;
    });

    it('renders: no open class', function() {
      const component = TestUtils.renderIntoDocument(<Dropdown title="Test" />);
      const domNode = React.findDOMNode(component);
      const dropdownLink = TestUtils.findRenderedDOMComponentWithTag(component, 'a');

      TestUtils.Simulate.click(dropdownLink);
      expect(domNode.getAttribute('class')).to.equal('dropdown-toggle open');

      bodyClick();
      expect(domNode.getAttribute('class')).to.equal('dropdown-toggle');
    });
  });
});
