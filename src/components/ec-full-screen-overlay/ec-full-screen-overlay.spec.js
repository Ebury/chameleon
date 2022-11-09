import { mount } from '@vue/test-utils';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

import EcFullScreenOverlay from './ec-full-screen-overlay.vue';

describe('EcFullScreenOverlay', () => {
  function mountFullScreenOverlay(props, mountOpts) {
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

  it('should initialize the "useFocusTrap composable" with mandatory options', () => {
    mountFullScreenOverlay();
    const options = useFocusTrap.mock.calls[0][1];
    expect(options.clickOutsideDeactivates).toBe(false);
    expect(options.escapeDeactivates).toBe(false);
    expect(options.immediate).toBe(true);
    expect(options.initialFocus).toBe(false);
  });

  it('should not be escapable', async () => {
    const elem = document.createElement('div');
    document.body.appendChild(elem);
    const wrapper = mountFullScreenOverlay({}, { attachTo: elem });
    await wrapper.findByDataTest('ec-full-screen-overlay__close-icon-btn').element.focus();
    await wrapper.findByDataTest('ec-full-screen-overlay').trigger('keydown.esc');
    expect(document.activeElement).toEqual(wrapper.findByDataTest('ec-full-screen-overlay__close-icon-btn').element);
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
  });

  describe('@events', () => {
    it('@close - should be emitted when we click on the close button', async () => {
      const wrapper = mountFullScreenOverlay();
      expect(wrapper.findByDataTest('ec-full-screen-overlay__close-icon-btn').exists()).toBe(true);
      await wrapper.findByDataTest('ec-full-screen-overlay__close-icon-btn').trigger('click');
      expect(wrapper.emitted('close').length).toBe(1);
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
  });
});
