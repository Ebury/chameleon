import type { MountingOptions } from '@vue/test-utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from '@vue/test-utils';

import type { CVueWrapper } from '../../../tests/utils/global';
import { EcRadioBtn } from '../../main';
import type { RadioBtnProps } from './types';

function mountRadioBtn(props?: RadioBtnProps, mountOpts?: MountingOptions<RadioBtnProps>): CVueWrapper {
  return mount(
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
  describe(':props', () => {
    it(':label - should render the radio button with a label', () => {
      const wrapper = mountRadioBtn({
        label: 'Test label prop',
        options: [
          { value: 'y', label: 'Yes' },
          { value: 'n', label: 'No' },
        ],
      });

      expect(wrapper.findByDataTest('ec-radio-btn__label').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':isGroupInline - should render the radio buttons on a single line', () => {
      const wrapper = mountRadioBtn({
        options: [
          { value: 'y', label: 'Yes' },
          { value: 'n', label: 'No' },
        ],
        isGroupInline: true,
      });

      expect(wrapper.findByDataTest('ec-radio-btn__group').element).toMatchSnapshot();
    });

    it(':isTextInline - should render the radio buttons text (label and description) on a single line', () => {
      const wrapper = mountRadioBtn({
        options: [
          { value: 'oneOpt', label: 'One option' },
        ],
        isTextInline: true,
      });

      expect(wrapper.findByDataTest('ec-radio-btn__radio-text-wrapper').element).toMatchSnapshot();
    });

    it(':error-message - should render the radio button with an error message', () => {
      const wrapper = mountRadioBtn({
        options: [
          { value: 'y', label: 'Yes' },
          { value: 'n', label: 'No' },
        ],
        errorMessage: 'Test error message prop',
      });

      expect(wrapper.findByDataTest('ec-radio-btn__error-text').exists()).toBe(true);
      expect(wrapper.findByDataTest('ec-radio-btn__error-text').element).toMatchSnapshot();
    });

    it(':disabled - should render the radio button with a disabled attribute', () => {
      const wrapper = mountRadioBtn({
        options: [
          { value: 'y', label: 'Yes' },
        ],
        disabled: true,
      });

      console.log(wrapper.findByDataTest('ec-radio-btn__input ec-radio-btn__input').element);
      // expect(wrapper.findByDataTest('ec-radio-btn__input ec-radio-btn__input').element.disabled).toBe(true);
      expect(wrapper.findByDataTest('ec-radio-btn__input ec-radio-btn__input').element).toMatchSnapshot();
    });

    it(':disabled - should render the radio button with a disabled attribute and checked', () => {
      const wrapper = mountRadioBtn({
        options: [
          { value: 'y', label: 'Yes' },
        ],
        disabled: true,
        modelValue: 'y',
      });

      const inputElement = (wrapper.findByDataTest('ec-radio-btn__input').element as HTMLInputElement);
      expect(inputElement.disabled).toBe(true);
      expect(inputElement.value).toBe('y');
      expect(wrapper.findByDataTest('ec-radio-btn').element).toMatchSnapshot();
    });
  });

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

      expect(wrapper.findByDataTest('ec-radio-btn__error-text').exists()).toBe(true);
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

      expect(wrapper.findByDataTest('ec-radio-btn__error-text').exists()).toBe(true);
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

      expect(wrapper.findByDataTest('ec-radio-btn__label').exists()).toBe(true);
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

      expect(wrapper.findByDataTest('ec-radio-btn__label').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('@events', () => {
    it('@update:modelValue - should be emitted when input is clicked', () => {
      const wrapper = mountRadioBtn();

      wrapper.findByDataTest('ec-radio-btn__input').setValue(true);
      expect(wrapper.emitted('update:modelValue').length).toBe(1);
    });

    it('@change - should be emitted when input is clicked', () => {
      const changeSpy = jest.fn();
      const wrapper = mountRadioBtn({}, {
        attrs: {
          onChange: changeSpy,
        },
      });

      wrapper.findByDataTest('ec-radio-btn__input').setValue(true);
      expect(changeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('attrs', () => {
    it('should pass all non-prop attributes to the hidden radio button input', () => {
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
          role: 'radio button',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should pass listeners to radio button input', async () => {
      const clickSpy = jest.fn();
      const wrapper = mountRadioBtn({}, {
        attrs: { onClick: clickSpy },
      });

      await wrapper.findByDataTest('ec-radio-btn__input').trigger('click');
      expect(clickSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('v-model', () => {
    it('should render the radio button and toggle v-model value when input is clicked', async () => {
      const wrapper = mountRadioBtnAsTemplate(
        '<ec-radio-btn v-model="checked"></ec-radio-btn>',
        {},
        {
          setup() {
            const checked = ref(true);
            return { checked };
          },
        },
      );

      expect(wrapper.findByDataTest('ec-radio-btn').exists()).toBe(true);
      expect(wrapper.vm.checked).toBe(true);
      await wrapper.findByDataTest('ec-radio-btn__input').setValue(false);
      expect(wrapper.vm.checked).toBe(false);
    });

    it('should not change the value of v-model if disabled is enabled and user clicks the radio button', async () => {
      const wrapper = mountRadioBtnAsTemplate(
        '<ec-radio-btn v-model="checked" disabled></ec-radio-btn>',
        {},
        {
          setup() {
            const checked = ref(true);
            return { checked };
          },
        },
      );

      expect(wrapper.vm.checked).toBe(true);
      await wrapper.findByDataTest('ec-radio-btn__input').setValue(false);
      expect(wrapper.vm.checked).toBe(true);
    });
  }); */
});

