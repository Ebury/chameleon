import { type ComponentMountingOptions, mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { defineComponent, ref } from 'vue';

import EcSwitch from './ec-switch.vue';
import type { SwitchProps } from './types';

describe('EcSwitch', () => {
  function mountSwitch(props?: SwitchProps, mountOpts?: ComponentMountingOptions<typeof EcSwitch>) {
    return mount(EcSwitch, {
      props,
      ...mountOpts,
    });
  }

  describe(':props', () => {
    it(':label - should render the switch with a label', () => {
      const wrapper = mountSwitch({
        label: 'Test label prop',
      });

      expect(wrapper.findByDataTest('ec-switch__label').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':error-message - should render the switch with an error message', () => {
      const wrapper = mountSwitch({
        errorMessage: 'Test error message prop',
      });

      expect(wrapper.findByDataTest('ec-switch__error-text').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disabled - should render the switch with a disabled attribute and not checked', () => {
      const wrapper = mountSwitch({
        disabled: true,
        modelValue: false,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disabled - should render the switch with a disabled attribute and checked', () => {
      const wrapper = mountSwitch({
        disabled: true,
        modelValue: true,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    describe('#slots', () => {
      it('#errorMessage - should render the error message slot if passed', () => {
        const wrapper = mountSwitch(
          {},
          {
            slots: {
              'error-message': 'Test error message slot',
            },
          },
        );

        expect(wrapper.findByDataTest('ec-switch__error-text').exists()).toBe(true);
        expect(wrapper.element).toMatchSnapshot();
      });

      it('#error-message - should render error-message slot instead of error-message prop when both are passed', () => {
        const wrapper = mountSwitch(
          {
            errorMessage: 'Error message coming from props',
          },
          {
            slots: {
              'error-message': 'Error message coming from slot',
            },
          },
        );

        expect(wrapper.findByDataTest('ec-switch__error-text').exists()).toBe(true);
        expect(wrapper.element).toMatchSnapshot();
      });

      it('#label - should render the label slot if passed', () => {
        const wrapper = mountSwitch(
          {},
          {
            slots: {
              label: 'Test label message slot',
            },
          },
        );

        expect(wrapper.findByDataTest('ec-switch__label').exists()).toBe(true);
        expect(wrapper.element).toMatchSnapshot();
      });

      it('#label - should render label slot instead of label prop when both are passed', () => {
        const wrapper = mountSwitch(
          {
            label: 'Label message coming from props',
          },
          {
            slots: {
              label: 'Label message coming from slot',
            },
          },
        );

        expect(wrapper.findByDataTest('ec-switch__label').exists()).toBe(true);
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    describe('@events', () => {
      it('@update:modelValue - should be emitted when input is clicked', () => {
        const wrapper = mountSwitch();

        wrapper.findByDataTest('ec-switch__input').setValue(true);
        expect(wrapper.emitted('update:modelValue')?.length).toBe(1);
      });

      it('@change - should be emitted when input is clicked', () => {
        const changeSpy = vi.fn();
        const wrapper = mountSwitch({}, {
          attrs: {
            onChange: changeSpy,
          },
        });

        wrapper.findByDataTest('ec-switch__input').setValue(true);
        expect(changeSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('attrs', () => {
      it('should pass all non-prop attributes to the hidden switch input', () => {
        const wrapper = mountSwitch(
          {},
          {
            attrs: {
              'aria-label': 'Random label',
            },
          },
        );
        expect(wrapper.element).toMatchSnapshot();
      });

      it('should render with custom attributes', () => {
        const wrapper = mountSwitch({}, {
          attrs: {
            'data-test': 'my-data-test',
            class: 'my-class',
            id: 'test-id',
            style: 'top: 0px',
            role: 'switch',
          },
        });
        expect(wrapper.element).toMatchSnapshot();
      });

      it('should pass listeners to switch input', async () => {
        const clickSpy = vi.fn();
        const wrapper = mountSwitch({}, {
          attrs: { onClick: clickSpy },
        });

        await wrapper.findByDataTest('ec-switch__input').trigger('click');
        expect(clickSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('v-model', () => {
      it('should render the switch and toggle v-model value when input is clicked', async () => {
        const Component = defineComponent({
          components: { EcSwitch },
          setup() {
            const checked = ref(true);
            return { checked };
          },
          template: '<ec-switch v-model="checked"></ec-switch>',
        });

        const wrapper = mount(Component);

        expect(wrapper.findByDataTest('ec-switch').exists()).toBe(true);
        expect(wrapper.vm.checked).toBe(true);
        await wrapper.findByDataTest('ec-switch__input').setValue(false);
        expect(wrapper.vm.checked).toBe(false);
      });

      it('should not change the value of v-model if disabled is enabled and user clicks the switch', async () => {
        const Component = defineComponent({
          components: { EcSwitch },
          setup() {
            const checked = ref(true);
            return { checked };
          },
          template: '<ec-switch v-model="checked" disabled></ec-switch>',
        });

        const wrapper = mount(Component);

        expect(wrapper.vm.checked).toBe(true);
        await wrapper.findByDataTest('ec-switch__input').setValue(false);
        expect(wrapper.vm.checked).toBe(true);
      });

      it('should be clickable', async () => {
        const element = document.createElement('div');
        document.body.appendChild(element);

        const Component = defineComponent({
          components: { EcSwitch },
          data() {
            return { model: false };
          },
          template: '<ec-switch v-model="model" />',
        });

        const wrapper = mount(Component, {
          attachTo: element,
        });

        await wrapper.findByDataTest('ec-switch__wrapper').trigger('click');
        expect(wrapper.vm.model).toBe(true);

        await wrapper.findByDataTest('ec-switch__wrapper').trigger('click');
        expect(wrapper.vm.model).toBe(false);

        wrapper.unmount();
      });
    });
  });
});
