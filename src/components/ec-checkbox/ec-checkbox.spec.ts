import { type ComponentMountingOptions, mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { defineComponent, ref } from 'vue';

import type { CVueWrapper } from '../../../tests/utils/global';
import EcCheckbox from './ec-checkbox.vue';
import type { CheckboxProps } from './types';

describe('EcCheckbox', () => {
  function mountCheckbox(props?: CheckboxProps, mountOpts?: ComponentMountingOptions<CheckboxProps>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return mount(EcCheckbox as any, {
      props,
      ...mountOpts,
    }) as CVueWrapper;
  }

  function mountCheckboxAsTemplate(
    template: string,
    props: CheckboxProps,
    wrapperComponentOpts?: Record<string, unknown>,
    mountOpts?: ComponentMountingOptions<CheckboxProps>,
  ) {
    const Component = defineComponent({
      components: { EcCheckbox },
      template,
      ...wrapperComponentOpts,
    });

    return mount(Component, {
      props,
      ...mountOpts,
    }) as CVueWrapper;
  }

  describe(':props', () => {
    it(':label - should render the checkbox with a label', () => {
      const wrapper = mountCheckbox({
        label: 'Test label prop',
      });

      expect(wrapper.findByDataTest('ec-checkbox__label').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':isSingleLine - should render the checkbox with in a single line with the label as a title', () => {
      const wrapper = mountCheckbox({
        label: 'Test is single line prop',
        isSingleLine: true,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it(':error-message - should render the checkbox with an error message', () => {
      const wrapper = mountCheckbox({
        errorMessage: 'Test error message prop',
      });

      expect(wrapper.findByDataTest('ec-checkbox__error-text').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disabled - should render the checkbox with a disabled attribute and not checked', () => {
      const wrapper = mountCheckbox({
        disabled: true,
        modelValue: false,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disabled - should render the checkbox with a disabled attribute and indeterminate', () => {
      const wrapper = mountCheckbox({
        disabled: true,
        indeterminate: true,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disabled - should render the checkbox with a disabled attribute and checked', () => {
      const wrapper = mountCheckbox({
        disabled: true,
        modelValue: true,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it(':indeterminate - should render the checkbox as indeterminate', () => {
      const wrapper = mountCheckbox({
        indeterminate: true,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it(':indeterminate - should render even if the checkbox is checked', () => {
      const wrapper = mountCheckbox({
        modelValue: true,
        indeterminate: true,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it(':indeterminate - should render the checkbox as checked when indeterminate has switched to false', async () => {
      const wrapper = mountCheckbox({
        modelValue: true,
        indeterminate: true,
      });

      expect(wrapper.element).toMatchSnapshot('before');

      await wrapper.setProps({
        indeterminate: false,
      });

      expect(wrapper.element).toMatchSnapshot('after');
    });
  });

  describe('#slots', () => {
    it('#errorMessage - should render the error message slot if passed', () => {
      const wrapper = mountCheckbox(
        {},
        {
          slots: {
            'error-message': 'Test error message slot',
          },
        },
      );

      expect(wrapper.findByDataTest('ec-checkbox__error-text').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('#error-message - should render error-message slot instead of error-message prop when both are passed', () => {
      const wrapper = mountCheckbox(
        {
          errorMessage: 'Error message coming from props',
        },
        {
          slots: {
            'error-message': 'Error message coming from slot',
          },
        },
      );

      expect(wrapper.findByDataTest('ec-checkbox__error-text').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('#label - should render the label slot if passed', () => {
      const wrapper = mountCheckbox(
        {},
        {
          slots: {
            label: 'Test label message slot',
          },
        },
      );

      expect(wrapper.findByDataTest('ec-checkbox__label').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('#label - should render label slot instead of label prop when both are passed', () => {
      const wrapper = mountCheckbox(
        {
          label: 'Label message coming from props',
        },
        {
          slots: {
            label: 'Label message coming from slot',
          },
        },
      );

      expect(wrapper.findByDataTest('ec-checkbox__label').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('@events', () => {
    it('@update:modelValue - should be emitted when input is clicked', () => {
      const wrapper = mountCheckbox();

      wrapper.findByDataTest('ec-checkbox__input').setValue(true);
      expect(wrapper.emitted('update:modelValue')?.length).toBe(1);
    });

    it('@change - should be emitted when input is clicked', () => {
      const changeSpy = vi.fn();
      const wrapper = mountCheckbox({}, {
        attrs: {
          onChange: changeSpy,
        },
      });

      wrapper.findByDataTest('ec-checkbox__input').setValue(true);
      expect(changeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('attrs', () => {
    it('should pass all non-prop attributes to the hidden checkbox input', () => {
      const wrapper = mountCheckbox(
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
      const wrapper = mountCheckbox({}, {
        attrs: {
          'data-test': 'my-data-test',
          class: 'my-class',
          id: 'test-id',
          style: 'top: 0px',
          role: 'checkbox',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should pass listeners to checkbox input', async () => {
      const clickSpy = vi.fn();
      const wrapper = mountCheckbox({}, {
        attrs: { onClick: clickSpy },
      });

      await wrapper.findByDataTest('ec-checkbox__input').trigger('click');
      expect(clickSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('v-model', () => {
    it('should render the checkbox and toggle v-model value when input is clicked', async () => {
      const wrapper = mountCheckboxAsTemplate(
        '<ec-checkbox v-model="checked"></ec-checkbox>',
        {},
        {
          setup() {
            const checked = ref(true);
            return { checked };
          },
        },
      );

      expect(wrapper.findByDataTest('ec-checkbox').exists()).toBe(true);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(wrapper.vm.checked).toBe(true);
      await wrapper.findByDataTest('ec-checkbox__input').setValue(false);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(wrapper.vm.checked).toBe(false);
    });

    it('should not change the value of v-model if disabled is enabled and user clicks the checkbox', async () => {
      const wrapper = mountCheckboxAsTemplate(
        '<ec-checkbox v-model="checked" disabled></ec-checkbox>',
        {},
        {
          setup() {
            const checked = ref(true);
            return { checked };
          },
        },
      );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(wrapper.vm.checked).toBe(true);
      await wrapper.findByDataTest('ec-checkbox__input').setValue(false);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(wrapper.vm.checked).toBe(true);
    });

    it('should have the icon clickable', async () => {
      const element = document.createElement('div');
      document.body.appendChild(element);
      const wrapper = mountCheckboxAsTemplate(
        '<ec-checkbox v-model="model" />',
        {},
        {
          data() {
            return { model: false };
          },
        },
        {
          attachTo: element,
        },
      );

      await wrapper.findByDataTest('ec-checkbox__check-icon-wrapper').trigger('click');
      expect(wrapper.vm.model).toBe(true);

      await wrapper.findByDataTest('ec-checkbox__check-icon').trigger('click');
      expect(wrapper.vm.model).toBe(false);

      wrapper.unmount();
    });

    it('should render the input focused when focused', async () => {
      'ec-checkbox__input';

      const wrapper = mountCheckbox();

      await wrapper.findByDataTest('ec-checkbox__input').trigger('focus');
      expect(wrapper.element).toMatchSnapshot('focused');

      await wrapper.findByDataTest('ec-checkbox__input').trigger('blur');
      expect(wrapper.element).toMatchSnapshot('blurred');
    });
  });
});
