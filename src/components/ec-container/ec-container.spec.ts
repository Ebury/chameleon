import { type ComponentMountingOptions, mount } from '@vue/test-utils';

import EcContainer from './ec-container.vue';
import type { ContainerProps } from './types';

describe('EcContainer', () => {
  function mountEcContainer(props?: Partial<ContainerProps>, mountOpts?: ComponentMountingOptions<typeof EcContainer>) {
    return mount(EcContainer, {
      props,
      ...mountOpts,
    });
  }

  it('should not have a collapsable navigation by default', () => {
    const wrapper = mountEcContainer();

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.findByDataTest('ec-container__navigation').classes('ec-container__navigation--is-collapsable')).toBe(false);
  });

  it('should make the navigation collapsable when isCollapsable is given', () => {
    const wrapper = mountEcContainer({ isCollapsable: true });

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.findByDataTest('ec-container__navigation').classes('ec-container__navigation--is-collapsable')).toBe(true);
  });

  it('should render empty if no slots were given', () => {
    const wrapper = mountEcContainer();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render slot for navigation', () => {
    const wrapper = mountEcContainer({}, {
      slots: {
        navigation: '<div>navigation template</div>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render slot for content', () => {
    const wrapper = mountEcContainer({}, {
      slots: {
        content: '<div>content template</div>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
