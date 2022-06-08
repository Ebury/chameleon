import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';

import withFiltering from './ec-with-filtering';

describe('EcWithFiltering', () => {
  function mountEcWithFiltering(props, mountOpts) {
    const Component = defineComponent({
      props: ['filter'],
      render() {
        return h('div', {}, `Filter: ${JSON.stringify(this.filter)}`);
      },
    });

    const hocWrapper = mount(withFiltering(Component), {
      props,
      ...mountOpts,
    });

    const componentWrapper = hocWrapper.findComponent(Component);

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
