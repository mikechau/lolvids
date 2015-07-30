var React = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Dropdown = require('app/components/Dropdown');

describe('Dropdown', function() {
  var component;

  beforeEach(function() {
    component = null;
  });

  afterEach(function() {
    if (component) {
      React.unmountComponentAtNode(React.findDOMNode(component).parentNode);
    }
  });

  describe('on initial render', function() {
    it('renders: a dropdown list item element', function() {
      component = ReactTestUtils.renderIntoDocument(<Dropdown title="Test" />);

      var domNode = React.findDOMNode(component);

      expect(domNode.nodeName).to.equal('LI');
      expect(domNode.getAttribute('class')).to.equal('dropdown-toggle');
    });
  });

  describe('on click (component)', function() {
    it('state toggles: open to "true" and then to "false"', function() {
      component = ReactTestUtils.renderIntoDocument(<Dropdown title="Test" />);

      var dropdownLink = React.findDOMNode(component).querySelector('a');

      ReactTestUtils.Simulate.click(dropdownLink);
      expect(component.state.open).to.be.true;

      ReactTestUtils.Simulate.click(dropdownLink);
      expect(component.state.open).to.be.false;
    });

    it('render toggles: "open" class', function() {
      component = ReactTestUtils.renderIntoDocument(<Dropdown title="Test" />);

      var domNode = React.findDOMNode(component);
      var dropdownLink = domNode.querySelector('a');

      ReactTestUtils.Simulate.click(dropdownLink);
      expect(domNode.getAttribute('class')).to.equal('dropdown-toggle open');

      ReactTestUtils.Simulate.click(dropdownLink);
      expect(domNode.getAttribute('class')).to.equal('dropdown-toggle');
    });
  });

  describe('on click (body)', function() {
    it('state updates: open to "false" when "true"', function() {
      component = ReactTestUtils.renderIntoDocument(<Dropdown title="Test" />);

      var dropdownLink = React.findDOMNode(component).querySelector('a');

      ReactTestUtils.Simulate.click(dropdownLink);
      expect(component.state.open).to.be.true;

      document.body.click();
      expect(component.state.open).to.be.false;
    });

    it('state not updated: open stays "false"', function() {
      component = ReactTestUtils.renderIntoDocument(<Dropdown title="Test" />);

      document.body.click();
      expect(component.state.open).to.be.false;
    });

    it('renders: no "open" class', function() {
      component = ReactTestUtils.renderIntoDocument(<Dropdown title="Test" />);

      var domNode = React.findDOMNode(component);
      var dropdownLink = domNode.querySelector('a');

      ReactTestUtils.Simulate.click(dropdownLink);
      expect(domNode.getAttribute('class')).to.equal('dropdown-toggle open');

      document.body.click();
      expect(domNode.getAttribute('class')).to.equal('dropdown-toggle');
    });
  });
});
