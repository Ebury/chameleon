import { mount } from '@vue/test-utils';
import { defineComponent, ref } from 'vue';

import EcCheckbox from './ec-checkbox.vue';

function mountCheckbox(props, mountOpts) {
  return mount(EcCheckbox, {
    props,
    ...mountOpts,
  });
}

function mountCheckboxAsTemplate(template, props, wrapperComponentOpts, mountOpts) {
  const Component = defineComponent({
    components: { EcCheckbox },
    template,
    ...wrapperComponentOpts,
  });

  return mount(Component, {
    props,
    ...mountOpts,
  });
}

describe('EcCheckbox', () => {
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
        'error-message': 'Test error message prop',
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
          'error-message': 'Error message coming from props',
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
      expect(wrapper.emitted('update:modelValue').length).toBe(1);
    });

    it('@change - should be emitted when input is clicked', () => {
      const changeSpy = jest.fn();
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
        {
          'aria-label': 'Random label',
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
      const clickSpy = jest.fn();
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
      expect(wrapper.vm.checked).toBe(true);
      await wrapper.findByDataTest('ec-checkbox__input').setValue(false);
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

      expect(wrapper.vm.checked).toBe(true);
      await wrapper.findByDataTest('ec-checkbox__input').setValue(false);
      expect(wrapper.vm.checked).toBe(true);
    });
  });
});
