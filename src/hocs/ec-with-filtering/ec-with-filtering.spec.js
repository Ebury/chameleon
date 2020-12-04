import { mount, createLocalVue, createWrapper } from '@vue/test-utils';
import withFiltering from './ec-with-filtering';

describe('EcWithFiltering', () => {
  function mountEcWithFiltering(props, mountOpts) {
    const localVue = createLocalVue();

    const Component = localVue.extend({
      props: ['filter'],
      render(h) {
        return h('div', {}, `Filter: ${JSON.stringify(this.filter)}`);
      },
    });

    const hocWrapper = mount(withFiltering(Component), {
      localVue,
      propsData: { ...props },
      ...mountOpts,
    });

    const componentWrapper = createWrapper(hocWrapper.vm.$children[0].$vnode);

    return { hocWrapper, componentWrapper };
  }

  it('should render properly', () => {
    const { hocWrapper } = mountEcWithFiltering();
    expect(hocWrapper.element).toMatchSnapshot();
  });

  it('should render the given filter', () => {
    const { hocWrapper } = mountEcWithFiltering({ filter: { testProp: 'Random value' } });
    expect(hocWrapper.element).toMatchSnapshot();
  });

  it('should update the filtering when filtering event is emitted', async () => {
    const { hocWrapper, componentWrapper } = mountEcWithFiltering();

    await componentWrapper.vm.$emit('filtering', { testProp: 'Random value' });
    expect(hocWrapper.element).toMatchSnapshot();
  });
});
