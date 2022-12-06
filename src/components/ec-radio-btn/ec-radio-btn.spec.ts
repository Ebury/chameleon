import type { MountingOptions } from '@vue/test-utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from '@vue/test-utils';

import type { CVueWrapper } from '../../../tests/utils/global';
import { EcRadioBtn } from '../../main';
import type { RadioButtonProps } from './types';

function mountRadioBtn(props?: Partial<RadioButtonProps>, mountOpts?: MountingOptions<RadioButtonProps>): CVueWrapper {
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

    it(':isDisabled - should render the unchecked radio button with a disabled attribute', () => {
      const wrapper = mountRadioBtn({
        options: [
          { value: 'y', label: 'Yes' },
        ],
        isDisabled: true,
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
        isDisabled: true,
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

  describe('@events', () => {
    it('@update:modelValue - should be emitted when input is clicked', async () => {
      const wrapper = mountRadioBtn({
        options: [
          { value: 'y', label: 'Yes' },
          { value: 'n', label: 'No' },
        ],
      });

      await wrapper.findByDataTest('ec-radio-btn-0').trigger('click');
      expect(wrapper.emitted('update:modelValue')?.length).toBe(1);
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['y']);
    });
  });

  describe('focus', () => {
    it('should be focused', async () => {
      const elem = document.createElement('div');
      document.body.appendChild(elem);
      const wrapper = mountRadioBtn(
        {
          options: [
            { value: 'y', label: 'Yes' },
            { value: 'n', label: 'No' },
          ],
        },
        {
          attachTo: elem,
        },
      );

      await wrapper.findByDataTest('ec-radio-btn__input-0').trigger('focus');
      expect(wrapper.findByDataTest('ec-radio-btn__radio-icon-wrapper-0').element).toMatchSnapshot();
    });

    it('should be checked and focused', async () => {
      const elem = document.createElement('div');
      document.body.appendChild(elem);
      const wrapper = mountRadioBtn(
        {
          options: [
            { value: 'y', label: 'Yes' },
            { value: 'n', label: 'No' },
          ],
          modelValue: 'y',
        },
        {
          attachTo: elem,
        },
      );

      await wrapper.findByDataTest('ec-radio-btn__input-0').trigger('focus');
      expect(wrapper.findByDataTest('ec-radio-btn__radio-icon-wrapper-0').element).toMatchSnapshot();
    });

    it('should be not focused', async () => {
      const elem = document.createElement('div');
      document.body.appendChild(elem);
      const wrapper = mountRadioBtn(
        {
          options: [
            { value: 'y', label: 'Yes' },
            { value: 'n', label: 'No' },
          ],
        },
        {
          attachTo: elem,
        },
      );

      await wrapper.findByDataTest('ec-radio-btn__input-0').trigger('focus');
      await wrapper.findByDataTest('ec-radio-btn__input-0').trigger('blur');
      expect(wrapper.findByDataTest('ec-radio-btn__radio-icon-wrapper-0').element).toMatchSnapshot();
    });
  });
});

