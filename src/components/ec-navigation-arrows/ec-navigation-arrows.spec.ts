import { mount } from '@vue/test-utils';

import type { CVueWrapper } from '../../../tests/utils/global';
import EcNavigationArrows from './ec-navigation-arrows.vue';
import type { NavigationArrowsProps } from './types';
import { NavigationArrowsEvent } from './types';

describe('EcNavigationArrows', () => {
  function mountComponent(props?: NavigationArrowsProps): CVueWrapper {
    return mount(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      EcNavigationArrows as any,
      {
        props,
      },
    ) as unknown as CVueWrapper;
  }

  it('should render properly with both arrows enabled', () => {
    const wrapper = mountComponent();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render properly with both arrows disabled', () => {
    const wrapper = mountComponent({
      isPreviousDisabled: true,
      isNextDisabled: true,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should emit an event when click next arrow', () => {
    const wrapper = mountComponent();

    wrapper.findByDataTest('ec-navigation-arrows__next')
      .trigger('click');

    expect(wrapper.emitted(NavigationArrowsEvent.NEXT_CLICK)?.length).toBe(1);
  });

  it('should emit an event when click previous arrow', () => {
    const wrapper = mountComponent();

    wrapper.findByDataTest('ec-navigation-arrows__previous')
      .trigger('click');

    expect(wrapper.emitted(NavigationArrowsEvent.PREVIOUS_CLICK)?.length).toBe(1);
  });

  it('should not emit an event when click on disabled buttons', () => {
    const wrapper = mountComponent({
      isPreviousDisabled: true,
      isNextDisabled: true,
    });

    wrapper.findByDataTest('ec-navigation-arrows__next')
      .trigger('click');
    wrapper.findByDataTest('ec-navigation-arrows__previous')
      .trigger('click');

    expect(wrapper.emitted(NavigationArrowsEvent.PREVIOUS_CLICK)?.length).toBe(undefined);
    expect(wrapper.emitted(NavigationArrowsEvent.NEXT_CLICK)?.length).toBe(undefined);
  });
});
