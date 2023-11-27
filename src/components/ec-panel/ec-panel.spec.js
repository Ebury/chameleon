import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { defineComponent } from 'vue';

import EcPanel from './ec-panel.vue';

function mountPanel(props, mountOpts) {
  return mount(EcPanel, {
    props,
    ...mountOpts,
  });
}

function mountPanelAsTemplate(template, props, wrapperComponentOpts, mountOpts) {
  const Component = defineComponent({
    components: { EcPanel },
    template,
    ...wrapperComponentOpts,
  });

  return mount(Component, {
    props,
    ...mountOpts,
  });
}

describe('EcPanel', () => {
  it('should use given attributes', () => {
    const wrapper = mountPanel({ show: true }, {
      attrs: {
        'data-test': 'my-data-test',
        class: 'my-class',
        id: 'my-id',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  describe(':props', () => {
    it(':show - should render the panel when is true', () => {
      const wrapper = mountPanel({ show: true });

      expect(wrapper.findByDataTest('ec-panel').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':show - should not render the panel when is false', () => {
      const wrapper = mountPanel({ show: false });

      expect(wrapper.findByDataTest('ec-panel').exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('@events', () => {
    it('should pass custom events to the panel', () => {
      const customEventSpy = vi.fn();

      const wrapper = mountPanel({ show: true }, {
        attrs: {
          onCustom: customEventSpy,
        },
      });

      wrapper.findByDataTest('ec-panel').trigger('custom');
      expect(customEventSpy).toHaveBeenCalledTimes(1);
    });

    it('@close - should emit both "update:show" and "close" events when the close icon is clicked', () => {
      const wrapper = mountPanel({ show: true });
      wrapper.findByDataTest('ec-panel__header-action--close').trigger('click');

      expect(wrapper.emitted('update:show').length).toBe(1);
      expect(wrapper.emitted('close').length).toBe(1);
    });

    describe('@back', () => {
      it('should render back button when event handler attribute is present', () => {
        const wrapper = mountPanelAsTemplate(
          '<ec-panel v-model:show="show" @back="anyGivenCallback"></ec-panel>',
          {},
          {
            data() {
              return {
                show: true,
              };
            },
            methods: {
              anyGivenCallback: vi.fn(),
            },
          },
        );

        expect(wrapper.findByDataTest('ec-panel__header-action--back').exists()).toBe(true);
        expect(wrapper.element).toMatchSnapshot();
      });

      it('should not render back button when event handler attribute is not present', () => {
        const wrapper = mountPanelAsTemplate(
          '<ec-panel v-model:show="show"></ec-panel>',
          {},
          {
            data() {
              return {
                show: true,
              };
            },
          },
        );

        expect(wrapper.findByDataTest('ec-panel__header-action--back').exists()).toBe(false);
        expect(wrapper.element).toMatchSnapshot();
      });

      it('should emit a "back" event when the simple-chevron-left icon is clicked', async () => {
        const anyGivenCallback = vi.fn();
        const wrapper = mountPanelAsTemplate(
          '<ec-panel v-model:show="show" @back="anyGivenCallback"></ec-panel>',
          {},
          {
            data() {
              return {
                show: true,
              };
            },
            methods: {
              anyGivenCallback,
            },
          },
        );

        await wrapper.findByDataTest('ec-panel__header-action--back').trigger('click');

        expect(anyGivenCallback).toHaveBeenCalledTimes(1);
        expect(wrapper.findByDataTest('ec-panel').exists()).toBe(false);
      });
    });
  });

  describe('#slots', () => {
    it('#header - should render header slot section if slot is passed', () => {
      const wrapper = mountPanel(
        { show: true },
        {
          slots: {
            header: '<h2>Header Section</h2>',
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

    it('#footer - should render footer slot section if slot is passed', () => {
      const wrapper = mountPanel(
        { show: true },
        {
          slots: {
            footer: '<h2>Footer Section</h2>',
          },
        },
      );
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('v-model', () => {
    it('should render the panel when we pass to model true', async () => {
      const wrapper = mountPanelAsTemplate(
        '<ec-panel v-model:show="show"></ec-panel>',
        {},
        {
          data() {
            return {
              show: true,
            };
          },
        },
      );

      expect(wrapper.findByDataTest('ec-panel').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();

      await wrapper.findByDataTest('ec-panel__header-action--close').trigger('click');
      expect(wrapper.vm.show).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should not render the panel when we pass to model false', () => {
      const wrapper = mountPanelAsTemplate(
        '<ec-panel v-model:show="show"></ec-panel>',
        {},
        {
          data() {
            return {
              show: false,
            };
          },
        },
      );

      expect(wrapper.findByDataTest('ec-panel').exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
