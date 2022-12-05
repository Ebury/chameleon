import type { MountingOptions } from '@vue/test-utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from '@vue/test-utils';

import type { CVueWrapper } from '../../../tests/utils/global';
import { EcRadioBtn } from '../../main';
import type { RadioBtnProps } from './types';

function mountRadioBtn(props?: Partial<RadioBtnProps>, mountOpts?: MountingOptions<RadioBtnProps>): CVueWrapper {
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

    it(':label - should render the radio button without a label', () => {
      const wrapper = mountRadioBtn({
        options: [
          { value: 'y', label: 'Yes' },
          { value: 'n', label: 'No' },
        ],
      });

      expect(wrapper.findByDataTest('ec-radio-btn__label').exists()).toBe(false);
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

    it(':disabled - should render the unchecked radio button with a disabled attribute', () => {
      const wrapper = mountRadioBtn({
        options: [
          { value: 'y', label: 'Yes' },
        ],
        disabled: true,
      });
      const inputElement = (wrapper.findByDataTest('ec-radio-btn__input').element as HTMLInputElement);
      expect(inputElement.disabled).toBe(true);
      expect(inputElement).toMatchSnapshot();
    });

    it(':disabled - should render the checked radio button with a disabled attribute', () => {
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
      expect(inputElement).toMatchSnapshot();
    });

    it(':options - should render as many radios as given by the parent', () => {
      const wrapper = mountRadioBtn({
        options: [
          { value: 'y', label: 'Yes' },
          { value: 'n', label: 'No' },
          { value: 'm', label: 'Maybe' },
        ],
      });

      const radioContainer = (wrapper.findByDataTest('ec-radio-btn__group').element as HTMLInputElement);
      expect(radioContainer.children.length).toBe(3);
    });

    it(':description - should render with a description when present', () => {
      const wrapper = mountRadioBtn({
        options: [
          { value: 'y', label: 'Testing label', description: 'Testing description' },
        ],
      });

      expect(wrapper.findByDataTest('ec-radio-btn__radio-description').exists()).toBe(true);
      expect(wrapper.findByDataTest('ec-radio-btn__radio-description').text()).toBe('Testing description');
    });

    it(':description - should not render with a description when not present', () => {
      const wrapper = mountRadioBtn({
        options: [
          { value: 'y', label: 'Testing label' },
        ],
      });

      expect(wrapper.findByDataTest('ec-radio-btn__radio-description').exists()).toBe(false);
    });
  });

  describe('#slots', () => {
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
          errorMessage: 'Error message coming from props',
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
  });

  describe('@events', () => {
    it('@update:modelValue - should be emitted when input is clicked', () => {
      const wrapper = mountRadioBtn({
        options: [
          { value: 'y', label: 'Yes' },
          { value: 'n', label: 'No' },
        ],
      });

      wrapper.findByDataTest('ec-radio-btn__input-0').setValue('y');
      expect(wrapper.emitted('update:modelValue').length).toBe(1);
    });
  });

  describe('attrs', () => {
    it('should render with custom attributes', () => {
      const wrapper = mountRadioBtn({}, {
        attrs: {
          'data-test': 'my-data-test',
          class: 'my-class',
          id: 'test-id',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('v-model', () => {
    it('should render the radio button and toggle v-model value when input is clicked', async () => {
      const wrapper = mountRadioBtn({
        label: 'Test label prop',
        options: [
          { value: 'y', label: 'Yes' },
          { value: 'n', label: 'No' },
        ],
        modelValue: 'y',
      });

      await wrapper.findByDataTest('ec-radio-btn-1').trigger('click');
      expect((wrapper.vm.$props as RadioBtnProps).modelValue).toBe('n');
    });

    it('should not change the value of v-model if disabled is enabled and user clicks the radio button', async () => {
      const wrapper = mountRadioBtn({
        label: 'Test label prop',
        options: [
          { value: 'y', label: 'Yes' },
          { value: 'n', label: 'No' },
        ],
        modelValue: 'y',
        disabled: true,
      });

      await wrapper.findByDataTest('ec-radio-btn-1').trigger('click');
      expect((wrapper.vm.$props as RadioBtnProps).modelValue).toBe('y');
    });
  });

  describe('accessibility', () => {
    it.only('should focus on the option selected with arrow key', async () => {
      const elem = document.createElement('div');
      document.body.appendChild(elem);

      const wrapper = mountRadioBtn({
        label: 'Test label prop',
        options: [
          { value: 'y', label: 'Yes' },
          { value: 'n', label: 'No' },
        ],
        modelValue: 'y',
      }, {
        attachTo: elem,
      });

      const inputElement = (wrapper.findByDataTest('ec-radio-btn__input-0').element as HTMLInputElement);
      await inputElement.focus();
      await inputElement.trigger('keydown.down');
      expect(wrapper.findByDataTest('ec-radio-btn__input-1').element).toMatchSnapshot();
      expect((wrapper.vm.$props as RadioBtnProps).modelValue).toBe('n');
    });
  });
});

