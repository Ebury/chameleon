import { mount } from '@vue/test-utils';
import EcPanel from './ec-panel.vue';

function mountPanel(props, mountOpts) {
  return mount(EcPanel, {
    propsData: { ...props },
    ...mountOpts,
  });
}

describe('EcPanel', () => {
  describe(':props', () => {
    it(':showPanel - should render the panel when is true', () => {
      const wrapper = mountPanel({ showPanel: true });

      expect(wrapper.find('.ec-panel').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':showPanel - should not render the panel when is false', () => {
      const wrapper = mountPanel({ showPanel: false });

      expect(wrapper.find('.ec-panel').exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('@events', () => {
    it('@close - should emit a "close" event when the simple-close icon is clicked', () => {
      const wrapper = mountPanel({ showPanel: true });
      wrapper.find('.ec-panel__close').trigger('click');

      expect(wrapper.emitted().close).toBeTruthy();
    });
  });

  describe('#slots', () => {
    it('#header - should render header slot section if slot is passed', () => {
      const wrapper = mountPanel(
        { showPanel: true },
        {
          slots: {
            header: 'Submitted Requests',
          },
        },
      );
      expect(wrapper.html()).toContain('<div>Submitted Requests</div>');
      expect(wrapper.element).toMatchSnapshot();
    });

    it('#main - should render main slot section if slot is passed', () => {
      const wrapper = mountPanel(
        { showPanel: true },
        {
          slots: {
            main: '<p>Main content section</p>',
          },
        },
      );
      expect(wrapper.html()).toContain('<main><p>Main content section</p></main>');
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
