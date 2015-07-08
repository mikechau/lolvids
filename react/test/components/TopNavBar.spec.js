import TopNavBar from '../../src/components/TopNavBar';

describe('TopNavBar', function() {
  it('renders: a nav element', function() {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<TopNavBar />);

    const component = shallowRenderer.getRenderOutput();
    expect(component.type).to.equal('nav');
    expect(component.props.className).to.equal('navbar navbar-default navbar-static-top');
  });
});
