import type { ComponentMountingOptions } from '@vue/test-utils';
import { mount } from '@vue/test-utils';

import { EcRadioBtn, EcRadioBtnGroup } from '../../main';
import type { RadioButtonProps } from '../ec-radio-btn/types';
import type { RadioButtonGroupProps } from './types';

function mountRadioBtnGroup(props?: Partial<RadioButtonGroupProps>, mountOpts?: ComponentMountingOptions<typeof EcRadioBtnGroup>) {
  return mount(
    EcRadioBtnGroup,
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
  );
}

describe('EcRadioBtn', () => {
  it('should render properly', () => {
    const wrapper = mountRadioBtnGroup();
    expect(wrapper.element).toMatchSnapshot();
  });

  describe('attrs', () => {
    it('should render with custom attributes', () => {
      const wrapper = mountRadioBtnGroup({}, {
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
    it('should render the child component (radio-btn) with all the given props', () => {
      const wrapper = mountRadioBtnGroup({
        options: [{ value: 'y', label: 'Yes', description: 'Confirm' }, { value: 'n', label: 'No', description: 'Reject' }],
        isDisabled: true,
        isTextInline: true,
        modelValue: 'y',
        errorMessage: 'A testing error message',
      });
      const givenPropsRadio1 = wrapper.findAllComponents(EcRadioBtn)[0].props();
      const givenPropsRadio2 = wrapper.findAllComponents(EcRadioBtn)[1].props();

      const expectedPropsRadio1: RadioButtonProps = {
        isDisabled: true,
        isTextInline: true,
        modelValue: 'y',
        label: 'Yes',
        description: 'Confirm',
        hasError: true,
        value: 'y',
        errorMessage: undefined,
      };
      const expectedPropsRadio2: RadioButtonProps = {
        isDisabled: true,
        isTextInline: true,
        modelValue: 'y',
        label: 'No',
        description: 'Reject',
        hasError: true,
        value: 'n',
        errorMessage: undefined,
      };

      expect({ ...givenPropsRadio1, name: undefined }).toEqual(expectedPropsRadio1);
      expect({ ...givenPropsRadio2, name: undefined }).toEqual(expectedPropsRadio2);
    });

    it('should have the same given "name" attribute among all the radio inputs', () => {
      const wrapper = mountRadioBtnGroup();
      const givenNamePropRadio1: string | undefined = wrapper.findAllComponents(EcRadioBtn)[0].props().name;
      const givenNamePropRadio2: string | undefined = wrapper.findAllComponents(EcRadioBtn)[1].props().name;
      expect(givenNamePropRadio1).toBe(givenNamePropRadio2);
      expect(givenNamePropRadio1).not.toBe('');
      expect(wrapper.element).toMatchSnapshot();
    });

    describe('label', () => {
      it('should render with the given label', () => {
        const wrapper = mountRadioBtnGroup({ label: 'Testing label' });

        expect(wrapper.findByDataTest('ec-radio-btn-group__label').exists()).toBe(true);
        expect(wrapper.findByDataTest('ec-radio-btn-group__label').text()).toBe('Testing label');
        expect(wrapper.element).toMatchSnapshot();
      });

      it('should render the radio button without label when not present', () => {
        const wrapper = mountRadioBtnGroup();

        expect(wrapper.findByDataTest('ec-radio-btn-group__label').exists()).toBe(false);
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    describe('isGroupInline', () => {
      it('should render the radio buttons on a single line', () => {
        const wrapper = mountRadioBtnGroup({
          isGroupInline: true,
        });

        expect(wrapper.findByDataTest('ec-radio-btn-group__radio-btn-wrapper').element).toMatchSnapshot();
      });
    });

    describe('error', () => {
      it('should render the radio button with a given error message', () => {
        const wrapper = mountRadioBtnGroup({
          errorMessage: 'Test error message prop',
        });

        expect(wrapper.findByDataTest('ec-radio-btn-group__error-text').exists()).toBe(true);
        expect(wrapper.findByDataTest('ec-radio-btn-group__error-text').text()).toBe('Test error message prop');
        expect(wrapper.findByDataTest('ec-radio-btn-group__error-text').element).toMatchSnapshot();
      });
    });

    describe('options', () => {
      it('should render the same number of the given options', () => {
        const wrapper = mountRadioBtnGroup();
        const radioBtns = wrapper.findByDataTest('ec-radio-btn-group').element.children[0];
        expect(radioBtns.childElementCount).toBe(2);
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

        expect(wrapper.findByDataTest('ec-radio-btn-group__error-text').exists()).toBe(true);
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

        expect(wrapper.findByDataTest('ec-radio-btn-group__error-text').exists()).toBe(true);
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

        expect(wrapper.findByDataTest('ec-radio-btn-group__label').exists()).toBe(true);
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

        expect(wrapper.findByDataTest('ec-radio-btn-group__label').exists()).toBe(true);
        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });
});

