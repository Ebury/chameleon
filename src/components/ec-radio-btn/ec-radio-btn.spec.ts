import type { ComponentMountingOptions } from '@vue/test-utils';
import { mount } from '@vue/test-utils';

import EcRadioBtn from './ec-radio-btn.vue';
import type { RadioButtonProps } from './types';

function mountRadioBtn(props?: Partial<RadioButtonProps>, mountOpts?: ComponentMountingOptions<typeof EcRadioBtn>) {
  return mount(
    EcRadioBtn,
    {
      props: {
        value: 'y',
        label: 'Yes',
        ...props,
      },
      ...mountOpts,
    },
  );
}

describe('EcRadioBtn', () => {
  it('should render properly', () => {
    const wrapper = mountRadioBtn();
    expect(wrapper.element).toMatchSnapshot();
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

  describe('props', () => {
    describe('name', () => {
      it('should have a "id" attribute on the input equal to the "for" attribute on the label', () => {
        const wrapper = mountRadioBtn();
        const inputId = wrapper.findByDataTest('ec-radio-btn__input').attributes('id');
        const labelForAttr = wrapper.findByDataTest('ec-radio-btn__label').attributes('for');
        expect(inputId).toBe(labelForAttr);
        expect(wrapper.findByDataTest('ec-radio-btn')).toMatchSnapshot();
      });
    });

    describe('label', () => {
      it('should render the radio button with the given label', () => {
        const wrapper = mountRadioBtn();

        expect(wrapper.findByDataTest('ec-radio-btn__label').exists()).toBe(true);
        expect(wrapper.element).toMatchSnapshot();
      });

      it('should render the radio button without label when not present', () => {
        const wrapper = mountRadioBtn({ value: 'y', label: undefined });

        expect(wrapper.findByDataTest('ec-radio-btn__label').exists()).toBe(false);
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    describe('isTextInline', () => {
      it('should render the radio buttons text (label and description) on a single line', () => {
        const wrapper = mountRadioBtn({
          isTextInline: true,
          description: 'My description',
        });

        expect(wrapper.findByDataTest('ec-radio-btn__text-wrapper').element).toMatchSnapshot();
      });

      it('should render the radio buttons text on a single line', () => {
        const wrapper = mountRadioBtn({
          isTextInline: true,
        });

        expect(wrapper.findByDataTest('ec-radio-btn__text-wrapper').element).toMatchSnapshot();
      });
    });

    describe('error', () => {
      it('should render the radio button with a given error message', () => {
        const wrapper = mountRadioBtn({
          errorMessage: 'Test error message prop',
        });

        expect(wrapper.findByDataTest('ec-radio-btn__error-text').exists()).toBe(true);
        expect(wrapper.findByDataTest('ec-radio-btn__error-text').element).toMatchSnapshot();
      });

      it('should render the radio button with a error style on icon', () => {
        const wrapper = mountRadioBtn({
          hasError: true,
        });

        expect(wrapper.findByDataTest('ec-radio-btn__icon-wrapper').element).toMatchSnapshot();
      });
    });

    describe('isDisabled', () => {
      it('should render the unchecked radio button with a disabled attribute', () => {
        const wrapper = mountRadioBtn({
          isDisabled: true,
        });
        const inputElement = (wrapper.findByDataTest<HTMLInputElement>('ec-radio-btn__input').element);
        expect(inputElement.disabled).toBe(true);
        expect(inputElement).toMatchSnapshot();
      });

      it('should render the unchecked radio button with a disabled icon', () => {
        const wrapper = mountRadioBtn({
          isDisabled: true,
        });
        const icon = (wrapper.findByDataTest<HTMLInputElement>('ec-radio-btn__icon-wrapper').element);
        expect(icon).toMatchSnapshot();
      });

      it('should render the checked radio button with a disabled attribute', () => {
        const wrapper = mountRadioBtn({
          isDisabled: true,
          modelValue: 'y',
        });

        const inputElement = (wrapper.findByDataTest<HTMLInputElement>('ec-radio-btn__input').element);
        expect(inputElement.disabled).toBe(true);
        expect(inputElement.value).toBe('y');
        expect(inputElement).toMatchSnapshot();
      });

      it('should render the checked radio button with a disabled icon', () => {
        const wrapper = mountRadioBtn({
          isDisabled: true,
          modelValue: 'y',
        });

        const icon = (wrapper.findByDataTest<HTMLInputElement>('ec-radio-btn__icon-wrapper').element);
        expect(icon).toMatchSnapshot();
      });
    });

    describe('description', () => {
      it('should render with a description when present', () => {
        const wrapper = mountRadioBtn({
          description: 'Testing description',
        });

        expect(wrapper.findByDataTest('ec-radio-btn__description').exists()).toBe(true);
        expect(wrapper.findByDataTest('ec-radio-btn__description').text()).toBe('Testing description');
      });

      it('should not render with a description when not present', () => {
        const wrapper = mountRadioBtn();
        expect(wrapper.findByDataTest('ec-radio-btn__description').exists()).toBe(false);
      });

      it('should not render when label is not present', () => {
        const wrapper = mountRadioBtn({ label: undefined, description: 'Test description' });
        expect(wrapper.findByDataTest('ec-radio-btn__description').exists()).toBe(false);
      });
    });
  });

  describe('events', () => {
    it('@update:modelValue - should be emitted when input is clicked', async () => {
      const wrapper = mountRadioBtn();

      await wrapper.findByDataTest('ec-radio-btn').trigger('click');
      expect(wrapper.emitted('update:modelValue')?.length).toBe(1);
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['y']);
    });
  });

  describe('slots', () => {
    describe('errorMessage', () => {
      it('should render the error message slot if passed', () => {
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

      it('should render error-message slot instead of error-message prop when both are passed', () => {
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

    describe('label', () => {
      it('should render the label slot if passed', () => {
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

      it('should render label slot instead of label prop when both are passed', () => {
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

    describe('description', () => {
      it('should render the description slot if passed', () => {
        const wrapper = mountRadioBtn(
          {},
          {
            slots: {
              description: 'Test description message slot',
            },
          },
        );

        expect(wrapper.findByDataTest('ec-radio-btn__description').exists()).toBe(true);
        expect(wrapper.element).toMatchSnapshot();
      });

      it('should render description slot instead of description prop when both are passed', () => {
        const wrapper = mountRadioBtn(
          {
            description: 'Description message coming from props',
          },
          {
            slots: {
              description: 'Description message coming from slot',
            },
          },
        );

        expect(wrapper.findByDataTest('ec-radio-btn__description').exists()).toBe(true);
        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });

  describe('focus', () => {
    it('should be focused', async () => {
      const element = document.createElement('div');
      document.body.appendChild(element);
      const wrapper = mountRadioBtn({}, { attachTo: element });

      await wrapper.findByDataTest('ec-radio-btn__input').trigger('focus');
      expect(document.activeElement).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-radio-btn__icon-wrapper').element).toMatchSnapshot();
    });

    it('should be checked and focused', async () => {
      const element = document.createElement('div');
      document.body.appendChild(element);
      const wrapper = mountRadioBtn({ modelValue: 'y' }, { attachTo: element });

      await wrapper.findByDataTest('ec-radio-btn__input').trigger('focus');
      expect(document.activeElement).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-radio-btn__icon-wrapper').element).toMatchSnapshot();
    });

    it('should be not focused', async () => {
      const elem = document.createElement('div');
      document.body.appendChild(elem);
      const wrapper = mountRadioBtn({}, { attachTo: elem });

      await wrapper.findByDataTest('ec-radio-btn__input').trigger('focus');
      await wrapper.findByDataTest('ec-radio-btn__input').trigger('blur');
      expect(document.activeElement).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-radio-btn__icon-wrapper').element).toMatchSnapshot();
    });

    describe('when clicking on radio option', () => {
      it('should be checked and focused', async () => {
        const elem = document.createElement('div');
        document.body.appendChild(elem);
        const wrapper = mountRadioBtn({}, { attachTo: elem });
        const inputElement = wrapper.findByDataTest('ec-radio-btn__input').element;
        await wrapper.findByDataTest('ec-radio-btn').trigger('click');
        expect(document.activeElement).toEqual(inputElement);
        expect(wrapper.findByDataTest('ec-radio-btn__icon-wrapper').element).toMatchSnapshot();
      });
    });
  });
});

