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

  it('should render properly', () => {
    const wrapper = mountFullScreenOverlay();
    expect(wrapper.findByDataTest('ec-full-screen-overlay').exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with a title', () => {
    const wrapper = mountFullScreenOverlay({ title: 'title' });
    expect(wrapper.findByDataTest('ec-full-screen-overlay__title').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-full-screen-overlay__title').text()).toContain('title');
    expect(wrapper.findByDataTest('ec-full-screen-overlay__title').element).toMatchSnapshot();
  });

  it('should initialize the "useFocusTrap composable" with mandatory options', () => {
    mountFullScreenOverlay();
    const options = useFocusTrap.mock.calls[0][1];
    expect(options.clickOutsideDeactivates).toBe(false);
    expect(options.escapeDeactivates).toBe(false);
    expect(options.immediate).toBe(true);
  });

  it('should not be escapable', async () => {
    const wrapper = mountFullScreenOverlay();
    await wrapper.findByDataTest('ec-full-screen-overlay').trigger('keydown.esc');
    expect(wrapper.findByDataTest('ec-full-screen-overlay').exists()).toBe(true);
  });

  it('should render slots as expected', () => {
    const wrapper = mountFullScreenOverlay({}, {
      slots: {
        main: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  describe('when clicking on the "close" icon', () => {
    it('should propagate a "close-overlay" event to the parent', async () => {
      const wrapper = mountFullScreenOverlay();
      expect(wrapper.findByDataTest('ec-full-screen-overlay__close-icon-container').exists()).toBe(true);
      await wrapper.findByDataTest('ec-full-screen-overlay__close-icon-container').trigger('click');
      expect(wrapper.emitted('close-overlay').length).toBe(1);
    });
  });

  describe('when "show" prop is false', () => {
    it('should not render', () => {
      const wrapper = mountFullScreenOverlay({ show: false });
      expect(wrapper.findByDataTest('ec-full-screen-overlay').exists()).toBe(false);
    });
  });
});

