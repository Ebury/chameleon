import type { MountingOptions } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import { defineComponent, ref } from 'vue';

import type { CVueWrapper } from '../../../tests/utils/global';
import { EcRadioBtn } from '../../main';
import type { RadioBtnProps } from './types';

function mountRadioBtn(props?: RadioBtnProps, mountOpts?: MountingOptions<RadioBtnProps>): CVueWrapper {
  return mount<RadioBtnProps>(
    EcRadioBtn as any, // eslint-disable-line
    {
      props: {
        options: [
          { value: 'y', label: 'Yes' },
          { value: 'n', label: 'No' },
        ],
        ...props,
      },
      ...mountOpts,
    },
  ) as CVueWrapper;
}

describe('EcRadioBtn', () => {
  /* describe(':props', () => {
    it(':label - should render the checkbox with a label', () => {
      const wrapper = mountRadioBtn({
        label: 'Test label prop',
      });

      expect(wrapper.findByDataTest('ec-checkbox__label').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':isSingleLine - should render the checkbox with in a single line with the label as a title', () => {
      const wrapper = mountRadioBtn({
        label: 'Test is single line prop',
        isSingleLine: true,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it(':error-message - should render the checkbox with an error message', () => {
      const wrapper = mountRadioBtn({
        'error-message': 'Test error message prop',
      });

      expect(wrapper.findByDataTest('ec-checkbox__error-text').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disabled - should render the checkbox with a disabled attribute and not checked', () => {
      const wrapper = mountRadioBtn({
        disabled: true,
        modelValue: false,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disabled - should render the checkbox with a disabled attribute and indeterminate', () => {
      const wrapper = mountRadioBtn({
        disabled: true,
        indeterminate: true,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disabled - should render the checkbox with a disabled attribute and checked', () => {
      const wrapper = mountRadioBtn({
        disabled: true,
        modelValue: true,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it(':indeterminate - should render the checkbox as indeterminate', () => {
      const wrapper = mountRadioBtn({
        indeterminate: true,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it(':indeterminate - should render even if the checkbox is checked', () => {
      const wrapper = mountRadioBtn({
        modelValue: true,
        indeterminate: true,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it(':indeterminate - should render the checkbox as checked when indeterminate has switched to false', async () => {
      const wrapper = mountRadioBtn({
        modelValue: true,
        indeterminate: true,
      });

      expect(wrapper.element).toMatchSnapshot('before');

      await wrapper.setProps({
        indeterminate: false,
      });

      expect(wrapper.element).toMatchSnapshot('after');
    });
  }); */

/*   describe('#slots', () => {
    it('#errorMessage - should render the error message slot if passed', () => {
      const wrapper = mountRadioBtn(
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
      const wrapper = mountRadioBtn(
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
      const wrapper = mountRadioBtn(
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
      const wrapper = mountRadioBtn(
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
      const wrapper = mountRadioBtn();

      wrapper.findByDataTest('ec-checkbox__input').setValue(true);
      expect(wrapper.emitted('update:modelValue').length).toBe(1);
    });

    it('@change - should be emitted when input is clicked', () => {
      const changeSpy = jest.fn();
      const wrapper = mountRadioBtn({}, {
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
      const wrapper = mountRadioBtn(
        {
          'aria-label': 'Random label',
        },
      );
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with custom attributes', () => {
      const wrapper = mountRadioBtn({}, {
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
      const wrapper = mountRadioBtn({}, {
        attrs: { onClick: clickSpy },
      });

      await wrapper.findByDataTest('ec-checkbox__input').trigger('click');
      expect(clickSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('v-model', () => {
    it('should render the checkbox and toggle v-model value when input is clicked', async () => {
      const wrapper = mountRadioBtnAsTemplate(
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
      const wrapper = mountRadioBtnAsTemplate(
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
  }); */
});

