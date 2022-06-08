import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';

import withPagination from './ec-with-pagination';

describe('EcWithPagination', () => {
  function mountEcWithPagination(props, mountOpts) {
    const Component = defineComponent({
      props: ['page', 'numberOfItems'],
      render() {
        return h('div', {}, `Page: ${this.page}, # items: ${this.numberOfItems}`);
      },
    });

    const hocWrapper = mount(withPagination(Component), {
      props,
      ...mountOpts,
    });

    const componentWrapper = hocWrapper.findComponent(Component);

    return { hocWrapper, componentWrapper };
  }

  it('should render properly', () => {
    const { hocWrapper } = mountEcWithPagination();
    expect(hocWrapper.element).toMatchSnapshot();
  });

  it('should update the pagination when pagination event is emitted', async () => {
    const { hocWrapper, componentWrapper } = mountEcWithPagination();

    await componentWrapper.vm.$emit('pagination', 5, 20);
    expect(hocWrapper.element).toMatchSnapshot();
  });

  it('should ignore null values when pagination event updates the page', async () => {
    const { hocWrapper, componentWrapper } = mountEcWithPagination();

    await componentWrapper.vm.$emit('pagination', 42, null);
    expect(hocWrapper.element).toMatchSnapshot();
  });

  it('should ignore null values when pagination event updates the number of items', async () => {
    const { hocWrapper, componentWrapper } = mountEcWithPagination();

    await componentWrapper.vm.$emit('pagination', null, 42);
    expect(hocWrapper.element).toMatchSnapshot();
  });
});
