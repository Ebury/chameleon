import type { MountingOptions } from '@vue/test-utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from '@vue/test-utils';

import type { CVueWrapper } from '../../../tests/utils/global';
import { EcRadioBtn, EcRadioBtnGroup } from '../../main';
import type { RadioButtonGroupProps } from './types';

function mountRadioBtnGroup(props?: Partial<RadioButtonGroupProps>, mountOpts?: MountingOptions<RadioButtonGroupProps>) {
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

  describe('props', () => {
    it('should render the child component (radio-btn) with all the given props', () => {
      const wrapper = mountRadioBtnGroup({
        options: [{ value: 'y', label: 'Yes', description: 'Confirm' }, { value: 'n', label: 'No', description: 'Reject' }],
        isDisabled: true,
        isTextInline: true,
        modelValue: 'y',
        errorMessage: 'A testing error message',
      });
      const givenPropsRadio1 = wrapper.findAllComponents(EcRadioBtn)[0].vm;
      const givenPropsRadio2 = wrapper.findAllComponents(EcRadioBtn)[1].vm;

      const expectedPropsRadio1 = {
        isDisabled: true,
        isTextInline: true,
        modelValue: 'y',
        label: 'Yes',
        description: 'Confirm',
        hasError: true,
        value: 'y',
      };
      const expectedPropsRadio2 = {
        isDisabled: true,
        isTextInline: true,
        modelValue: 'y',
        label: 'No',
        description: 'Reject',
        hasError: true,
        value: 'n',
      };

      expect(givenPropsRadio1.isDisabled).toBe(expectedPropsRadio1.isDisabled);
      expect(givenPropsRadio1.isTextInline).toBe(expectedPropsRadio1.isTextInline);
      expect(givenPropsRadio1.label).toBe(expectedPropsRadio1.label);
      expect(givenPropsRadio1.description).toBe(expectedPropsRadio1.description);
      expect(givenPropsRadio1.hasError).toBe(expectedPropsRadio1.hasError);
      expect(givenPropsRadio1.value).toBe(expectedPropsRadio1.value);

      expect(givenPropsRadio2.isDisabled).toBe(expectedPropsRadio2.isDisabled);
      expect(givenPropsRadio2.isTextInline).toBe(expectedPropsRadio2.isTextInline);
      expect(givenPropsRadio2.label).toBe(expectedPropsRadio2.label);
      expect(givenPropsRadio2.description).toBe(expectedPropsRadio2.description);
      expect(givenPropsRadio2.hasError).toBe(expectedPropsRadio2.hasError);
      expect(givenPropsRadio2.value).toBe(expectedPropsRadio2.value);
    });

    describe('name', () => {
      it('should have the same given "name" attribute among all the radio inputs', () => {
        const wrapper = mountRadioBtnGroup();
        const radioBtnsWrapper = wrapper.findByDataTest('ec-radio-btn-group').element.children[0];
        const firstRadioInput = radioBtnsWrapper.children[0].children[0];
        const secondRadioInput = radioBtnsWrapper.children[1].children[0];
        expect(firstRadioInput.getAttribute('name')).toBe(secondRadioInput.getAttribute('name'));
      });
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

