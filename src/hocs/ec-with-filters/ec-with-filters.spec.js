import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';

import withFilters from './ec-with-filters';

describe('EcWithFilters', () => {
  function mountEcWithFilters(filters, props, mountOpts) {
    const Component = defineComponent({
      compatConfig: {
        MODE: 2,
      },
      props: ['filters'],
      render() {
        return h('div', {}, [
          h('span', `# of filters: ${this.$props.filters.length}`),
          ...this.$props.filters.map(filter => h('span', filter.name)),
        ]);
      },
    });

    const hocWrapper = mount(withFilters(Component, filters), {
      props,
      ...mountOpts,
    });

    const componentWrapper = hocWrapper.findComponent(Component);

    return { hocWrapper, componentWrapper };
  }

  it('should render properly', () => {
    const { hocWrapper } = mountEcWithFilters();
    expect(hocWrapper.element).toMatchSnapshot();
  });

  it('should bound given filters', () => {
    const filters = [{
      name: 'test1',
    }, {
      name: 'test2',
    }];

    const { hocWrapper } = mountEcWithFilters(filters);
    expect(hocWrapper.element).toMatchSnapshot();
  });
});
