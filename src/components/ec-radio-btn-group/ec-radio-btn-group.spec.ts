import type { MountingOptions } from '@vue/test-utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from '@vue/test-utils';

import type { CVueWrapper } from '../../../tests/utils/global';
import { EcRadioBtnGroup } from '../../main';
import type { RadioButtonGroupProps } from './types';

function mountRadioBtnGroup(props?: Partial<RadioButtonGroupProps>, mountOpts?: MountingOptions<RadioButtonGroupProps>): CVueWrapper {
  return mount(
    EcRadioBtnGroup as any, // eslint-disable-line
    {
      props: {
        options: [
          { value: 'y', label: 'Yes' },
          { value: 'n', label: 'No' },
        ],
        name: 'testingNameProp',
        ...props,
      },
      ...mountOpts,
    },
  ) as CVueWrapper;
}

describe('EcRadioBtn', () => {
  it('should render properly', () => {
    const wrapper = mountRadioBtnGroup();
    expect(wrapper.element).toMatchSnapshot();
  });

/*   describe('props', () => {
    describe('name', () => {
      it('should have a "name" attribute on the input equal to the "for" attribute on the label', () => {
        const wrapper = mountRadioBtnGroup();
        const nameAttr = wrapper.findByDataTest('ec-radio-btn__input').attributes('name');
        const forAttr = wrapper.findByDataTest('ec-radio-btn__label').attributes('for');
        expect(nameAttr).toBe(forAttr);
        expect(wrapper.findByDataTest('ec-radio-btn')).toMatchSnapshot();
      });
    });

    describe('label', () => {
      it('should render the radio button with the given label', () => {
        const wrapper = mountRadioBtnGroup();

        expect(wrapper.findByDataTest('ec-radio-btn__label').exists()).toBe(true);
        expect(wrapper.element).toMatchSnapshot();
      });

      it('should render the radio button without label when not present', () => {
        const wrapper = mountRadioBtnGroup({ value: 'y', label: undefined });

        expect(wrapper.findByDataTest('ec-radio-btn__label').exists()).toBe(false);
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    describe('isTextInline', () => {
      it('should render the radio buttons text (label and description) on a single line', () => {
        const wrapper = mountRadioBtnGroup({
          isTextInline: true,
        });

        expect(wrapper.findByDataTest('ec-radio-btn__text-wrapper').element).toMatchSnapshot();
      });
    });

    describe('error', () => {
      it('should render the radio button with a given error message', () => {
        const wrapper = mountRadioBtnGroup({
          errorMessage: 'Test error message prop',
        });

        expect(wrapper.findByDataTest('ec-radio-btn__error-text').exists()).toBe(true);
        expect(wrapper.findByDataTest('ec-radio-btn__error-text').element).toMatchSnapshot();
      });

      it('should render the radio button with a error style on icon', () => {
        const wrapper = mountRadioBtnGroup({
          hasError: true,
        });

        expect(wrapper.findByDataTest('ec-radio-btn__icon-wrapper').element).toMatchSnapshot();
      });
    });

    describe('isDisabled', () => {
      it('should render the unchecked radio button with a disabled attribute', () => {
        const wrapper = mountRadioBtnGroup({
          isDisabled: true,
        });
        const inputElement = (wrapper.findByDataTest('ec-radio-btn__input').element as HTMLInputElement);
        expect(inputElement.disabled).toBe(true);
        expect(inputElement).toMatchSnapshot();
      });

      it('should render the unchecked radio button with a disabled icon', () => {
        const wrapper = mountRadioBtnGroup({
          isDisabled: true,
        });
        const icon = (wrapper.findByDataTest('ec-radio-btn__icon-wrapper').element as HTMLInputElement);
        expect(icon).toMatchSnapshot();
      });

      it('should render the checked radio button with a disabled attribute', () => {
        const wrapper = mountRadioBtnGroup({
          isDisabled: true,
          modelValue: 'y',
        });

        const inputElement = (wrapper.findByDataTest('ec-radio-btn__input').element as HTMLInputElement);
        expect(inputElement.disabled).toBe(true);
        expect(inputElement.value).toBe('y');
        expect(inputElement).toMatchSnapshot();
      });

      it('should render the checked radio button with a disabled icon', () => {
        const wrapper = mountRadioBtnGroup({
          isDisabled: true,
          modelValue: 'y',
        });

        const icon = (wrapper.findByDataTest('ec-radio-btn__icon-wrapper').element as HTMLInputElement);
        expect(icon).toMatchSnapshot();
      });
    });

    describe('description', () => {
      it('should render with a description when present', () => {
        const wrapper = mountRadioBtnGroup({
          description: 'Testing description',
        });

        expect(wrapper.findByDataTest('ec-radio-btn__description').exists()).toBe(true);
        expect(wrapper.findByDataTest('ec-radio-btn__description').text()).toBe('Testing description');
      });

      it('should not render with a description when not present', () => {
        const wrapper = mountRadioBtnGroup();
        expect(wrapper.findByDataTest('ec-radio-btn__description').exists()).toBe(false);
      });

      it('should not render when label is not present', () => {
        const wrapper = mountRadioBtnGroup({ label: undefined, description: 'Test description' });
        expect(wrapper.findByDataTest('ec-radio-btn__description').exists()).toBe(false);
      });
    });
  });

  describe('events', () => {
    it('@update:modelValue - should be emitted when input is clicked', async () => {
      const wrapper = mountRadioBtnGroup();

      await wrapper.findByDataTest('ec-radio-btn').trigger('click');
      expect(wrapper.emitted('update:modelValue')?.length).toBe(1);
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['y']);
    });
  });

  describe('slots', () => {
    describe('errorMessage', () => {
      it('should render the error message slot if passed', () => {
        const wrapper = mountRadioBtnGroup(
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
        const wrapper = mountRadioBtnGroup(
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
        const wrapper = mountRadioBtnGroup(
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
        const wrapper = mountRadioBtnGroup(
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
        const wrapper = mountRadioBtnGroup(
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
        const wrapper = mountRadioBtnGroup(
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
      const elem = document.createElement('div');
      document.body.appendChild(elem);
      const wrapper = mountRadioBtnGroup({}, { attachTo: elem });

      await wrapper.findByDataTest('ec-radio-btn__input').trigger('focus');
      expect(document.activeElement).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-radio-btn__icon-wrapper').element).toMatchSnapshot();
    });

    it('should be checked and focused', async () => {
      const elem = document.createElement('div');
      document.body.appendChild(elem);
      const wrapper = mountRadioBtnGroup({ modelValue: 'y' }, { attachTo: elem });

      await wrapper.findByDataTest('ec-radio-btn__input').trigger('focus');
      expect(document.activeElement).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-radio-btn__icon-wrapper').element).toMatchSnapshot();
    });

    it('should be not focused', async () => {
      const elem = document.createElement('div');
      document.body.appendChild(elem);
      const wrapper = mountRadioBtnGroup({}, { attachTo: elem });

      await wrapper.findByDataTest('ec-radio-btn__input').trigger('focus');
      await wrapper.findByDataTest('ec-radio-btn__input').trigger('blur');
      expect(document.activeElement).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-radio-btn__icon-wrapper').element).toMatchSnapshot();
    });

    describe('when clicking on radio option', () => {
      it('should be checked and focused', async () => {
        const elem = document.createElement('div');
        document.body.appendChild(elem);
        const wrapper = mountRadioBtnGroup({}, { attachTo: elem });
        const inputElement = wrapper.findByDataTest('ec-radio-btn__input').element;
        await wrapper.findByDataTest('ec-radio-btn').trigger('click');
        expect(document.activeElement).toEqual(inputElement);
        expect(wrapper.findByDataTest('ec-radio-btn__icon-wrapper').element).toMatchSnapshot();
      });
    });
  }); */
});

