import { mount } from '@vue/test-utils';
import EcContainer from './ec-container.vue';

describe('EcContainer', () => {
  it('should not have a collapsable navigation by default', () => {
    const wrapper = mount(EcContainer);

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.findByDataTest('ec-container__navigation').classes('ec-container__navigation--is-collapsable')).toBe(false);
  });

  it('should make the navigation collapsable when isCollapsable is given', () => {
    const wrapper = mount(EcContainer, { propsData: { isCollapsable: true } });

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.findByDataTest('ec-container__navigation').classes('ec-container__navigation--is-collapsable')).toBe(true);
  });

  it('should render empty if no slots were given', () => {
    const wrapper = mount(EcContainer);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render slot for navigation', () => {
    const wrapper = mount(EcContainer, {
      slots: {
        navigation: '<div>navigation template</div>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render slot for content', () => {
    const wrapper = mount(EcContainer, {
      slots: {
        content: '<div>content template</div>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
