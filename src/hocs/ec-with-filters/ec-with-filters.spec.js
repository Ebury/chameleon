import { mount, createLocalVue, createWrapper } from '@vue/test-utils';
import withFilters from './ec-with-filters';

describe('EcWithFilters', () => {
  function mountEcWithFilters(filters, props, mountOpts) {
    const localVue = createLocalVue();

    const Component = localVue.extend({
      props: ['filters'],
      render() {
        return (<div>
          <span># of filters: { this.filters.length }</span>
          {this.filters.map(filter => <span>{filter.name}</span>)}
        </div>);
      },
    });

    const hocWrapper = mount(withFilters(Component, filters), {
      localVue,
      propsData: { ...props },
      ...mountOpts,
    });

    const componentWrapper = createWrapper(hocWrapper.vm.$children[0].$vnode);

    return { hocWrapper, componentWrapper };
  }

  it('should render properly', () => {
    const { hocWrapper } = mountEcWithFilters();
    expect(hocWrapper.element).toMatchSnapshot();
  });

  it('should bound given filters', async () => {
    const filters = [{
      name: 'test1',
    }, {
      name: 'test2',
    }];

    const { hocWrapper } = mountEcWithFilters(filters);
    expect(hocWrapper.element).toMatchSnapshot();
  });
});
