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
      isLeftArrowDisabled: true,
      isRightArrowDisabled: true,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should emit an event when click right arrow', () => {
    const wrapper = mountComponent();

    wrapper.findByDataTest('ec-navigation-arrows__right')
      .trigger('click');

    expect(wrapper.emitted(NavigationArrowsEvent.RIGHT_ARROW_CLICK)?.length).toBe(1);
  });

  it('should emit an event when click left arrow', () => {
    const wrapper = mountComponent();

    wrapper.findByDataTest('ec-navigation-arrows__right')
      .trigger('click');

    expect(wrapper.emitted(NavigationArrowsEvent.RIGHT_ARROW_CLICK)?.length).toBe(1);
  });

  it('should not emit an event when click on disabled buttons', () => {
    const wrapper = mountComponent({
      isLeftArrowDisabled: true,
      isRightArrowDisabled: true,
    });

    wrapper.findByDataTest('ec-navigation-arrows__right')
      .trigger('click');
    wrapper.findByDataTest('ec-navigation-arrows__right')
      .trigger('click');

    expect(wrapper.emitted(NavigationArrowsEvent.LEFT_ARROW_CLICK)?.length).toBe(undefined);
    expect(wrapper.emitted(NavigationArrowsEvent.RIGHT_ARROW_CLICK)?.length).toBe(undefined);
  });
});
