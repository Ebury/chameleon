import { mount, createLocalVue } from '@vue/test-utils';
import EcPanel from './ec-panel.vue';

function mountPanel(props, mountOpts) {
  return mount(EcPanel, {
    propsData: { ...props },
    ...mountOpts,
  });
}

function mountPanelAsTemplate(template, props, mountOpts) {
  const localVue = createLocalVue();

  const Component = localVue.extend({
    components: { EcPanel },
    template,
  });

  return mount(Component, {
    localVue,
    propsData: { ...props },
    ...mountOpts,
  });
}

describe('EcPanel', () => {
  describe(':props', () => {
    it(':show - should render the panel when is true', () => {
      const wrapper = mountPanel({ show: true });

      expect(wrapper.find('.ec-panel').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':show - should not render the panel when is false', () => {
      const wrapper = mountPanel({ show: false });

      expect(wrapper.find('.ec-panel').exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':goBackEnabled - should render the back button within the panel when is true', () => {
      const wrapper = mountPanel({ show: true, goBackEnabled: true });

      expect(wrapper.find('.ec-panel__header-action--back').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':goBackEnabled - should not render the back button within the panel when is false', () => {
      const wrapper = mountPanel({ show: true, goBackEnabled: false });

      expect(wrapper.find('.ec-panel__header-action--back').exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('@events', () => {
    it('@close - should emit both "show-panel" and "close" events when the simple-close icon is clicked', () => {
      const wrapper = mountPanel({ show: true });
      wrapper.find('.ec-panel__header-action--close').trigger('click');

      expect(wrapper.emitted('show-panel').length).toBe(1);
      expect(wrapper.emitted('close').length).toBe(1);
    });

    it('@back - should emit both "show-panel" and "back" events when the simple-chevron-left icon is clicked', () => {
      const wrapper = mountPanel({ show: true, goBackEnabled: true });
      wrapper.find('.ec-panel__header-action--back').trigger('click');

      expect(wrapper.emitted('show-panel').length).toBe(1);
      expect(wrapper.emitted('back').length).toBe(1);
    });
  });

  describe('#slots', () => {
    it('#header - should render header slot section if slot is passed', () => {
      const wrapper = mountPanel(
        { show: true },
        {
          slots: {
            header: '<h2>Submitted Requests</h2>',
          },
        },
      );
      expect(wrapper.element).toMatchSnapshot();
    });

    it('#main - should render main slot section if slot is passed', () => {
      const wrapper = mountPanel(
        { show: true },
        {
          slots: {
            main: '<p>Main content section</p>',
          },
        },
      );
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('v-model', () => {
    it('should render the panel when we pass to model true', () => {
      const wrapper = mountPanelAsTemplate(
        '<ec-panel v-model="show"></ec-panel>',
        {},
        {
          data() {
            return {
              show: true,
            };
          },
        },
      );

      expect(wrapper.find('.ec-panel').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();

      wrapper.find('.ec-panel__header-action--close').trigger('click');
      expect(wrapper.vm.show).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should not render the panel when we pass to model false', () => {
      const wrapper = mountPanelAsTemplate(
        '<ec-panel v-model="show"></ec-panel>',
        {},
        {
          data() {
            return {
              show: false,
            };
          },
        },
      );

      expect(wrapper.find('.ec-panel').exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
