import { mount } from '@vue/test-utils';
import EcContainer from './ec-container.vue';

describe('EcContainer', () => {
  it('should not have a collapsible navigation by default', () => {
    const wrapper = mount(EcContainer);

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('.ec-container__navigation').classes('ec-container__navigation--can-be-collapsed')).toBe(false);
  });

  it('should make the navigation collapsible when canBeCollapsed is given', () => {
    const wrapper = mount(EcContainer, { propsData: { canBeCollapsed: true } });

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('.ec-container__navigation').classes('ec-container__navigation--can-be-collapsed')).toBe(true);
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
