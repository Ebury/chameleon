import { mount, createLocalVue, createWrapper } from '@vue/test-utils';
import withPagination from './ec-with-pagination';

describe('EcWithPagination', () => {
  function mountEcWithPagination(props, mountOpts) {
    const localVue = createLocalVue();

    const Component = localVue.extend({
      props: ['page', 'numberOfItems'],
      render(h) {
        return h('div', {}, `Page: ${this.page}, # items: ${this.numberOfItems}`);
      },
    });

    const hocWrapper = mount(withPagination(Component), {
      localVue,
      propsData: { ...props },
      ...mountOpts,
    });

    const componentWrapper = createWrapper(hocWrapper.vm.$children[0].$vnode);

    return { hocWrapper, componentWrapper };
  }

  it('should render properly', () => {
    const { hocWrapper } = mountEcWithPagination();
    expect(hocWrapper.element).toMatchSnapshot();
  });

  it('should update the pagination whe pagination event is emitted', async () => {
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
