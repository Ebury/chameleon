import { type ComponentMountingOptions, mount } from '@vue/test-utils';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

import EcFullScreenOverlay from './ec-full-screen-overlay.vue';
import type { FullScreenOverlayProps } from './types';

describe('EcFullScreenOverlay', () => {
  function mountFullScreenOverlay(props?: Partial<FullScreenOverlayProps>, mountOpts?: ComponentMountingOptions<typeof EcFullScreenOverlay>) {
    return mount(EcFullScreenOverlay, {
      props: {
        title: 'Full screen overlay title',
        show: true,
        ...props,
      },
      ...mountOpts,
    });
  }

  it('should render as expected', () => {
    const wrapper = mountFullScreenOverlay();
    expect(wrapper.findByDataTest('ec-full-screen-overlay').exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with custom attributes', () => {
    const wrapper = mountFullScreenOverlay({}, {
      attrs: {
        'data-test': 'my-data-test',
        class: 'my-class',
        id: 'test-id',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should initialize the "useFocusTrap composable" with mandatory options', () => {
    mountFullScreenOverlay();
    const options = vi.mocked(useFocusTrap).mock.calls[0][1] ?? {};
    expect(options.clickOutsideDeactivates).toBe(false);
    expect(options.escapeDeactivates).toBe(false);
    expect(options.immediate).toBe(true);
    expect(options.initialFocus).toBe(false);
  });

  it('should not be escapable', async () => {
    const elem = document.createElement('div');
    document.body.appendChild(elem);
    const wrapper = mountFullScreenOverlay({}, { attachTo: elem });
    wrapper.findByDataTest<HTMLButtonElement>('ec-full-screen-overlay__close-icon-btn').element.focus();
    await wrapper.findByDataTest('ec-full-screen-overlay').trigger('keydown.esc');
    expect(document.activeElement).toEqual(wrapper.findByDataTest('ec-full-screen-overlay__close-icon-btn').element);
  });

  describe('defineExpose', () => {
    it('should return the container that was exposed', () => {
      const wrapper = mountFullScreenOverlay();
      const container = wrapper.vm.getFocusTrapContainer();
      expect(container).toBe(wrapper.findByDataTest<HTMLElement>('ec-full-screen-overlay').element);
    });
  });

  describe(':props', () => {
    it(':show - should not render the overlay when is false', () => {
      const wrapper = mountFullScreenOverlay({ show: false });
      expect(wrapper.findByDataTest('ec-full-screen-overlay').exists()).toBe(false);
    });

    it(':title - should render the title', () => {
      const wrapper = mountFullScreenOverlay({ title: 'Lorem title' });
      expect(wrapper.findByDataTest('ec-full-screen-overlay__title').exists()).toBe(true);
      expect(wrapper.findByDataTest('ec-full-screen-overlay__title').text()).toContain('Lorem title');
      expect(wrapper.findByDataTest('ec-full-screen-overlay__title').element).toMatchSnapshot();
    });

    it(':title - should render without the title', () => {
      const wrapper = mountFullScreenOverlay({ title: undefined });
      expect(wrapper.findByDataTest('ec-full-screen-overlay__title').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-full-screen-overlay__header').element).toMatchSnapshot();
    });

    it(':backgroundColorLevel - should render with the background css class passed', () => {
      const wrapper = mountFullScreenOverlay({ backgroundColorLevel: 5 });
      expect(wrapper.findByDataTest('ec-full-screen-overlay').classes('tw-bg-gray-5')).toBe(true);
      expect(wrapper.findByDataTest('ec-full-screen-overlay').element).toMatchSnapshot();
    });
  });

  describe('@events', () => {
    it('@close - should be emitted when we click on the close button', async () => {
      const wrapper = mountFullScreenOverlay();
      expect(wrapper.findByDataTest('ec-full-screen-overlay__close-icon-btn').exists()).toBe(true);
      await wrapper.findByDataTest('ec-full-screen-overlay__close-icon-btn').trigger('click');
      expect(wrapper.emitted('close')?.length).toBe(1);
    });
  });

  describe('#slots', () => {
    it('#header - should be rendered when passed', () => {
      const wrapper = mountFullScreenOverlay({}, {
        slots: {
          header: 'Lorem Title',
        },
      });

      expect(wrapper.findByDataTest('ec-full-screen-overlay__title').exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('#main - should be rendered when passed', () => {
      const wrapper = mountFullScreenOverlay({}, {
        slots: {
          main: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a tristique enim. Nulla consequat vitae metus in ultricies.',
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('#content - should be rendered when passed', () => {
      const wrapper = mountFullScreenOverlay({}, {
        slots: {
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a tristique enim. Nulla consequat vitae metus in ultricies.',
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
