import { mount, createLocalVue } from '@vue/test-utils';
import EcCheckbox from './ec-checkbox.vue';

function mountCheckbox(props, mountOpts) {
  return mount(EcCheckbox, {
    propsData: { ...props },
    ...mountOpts,
  });
}

function mountCheckboxAsTemplate(template, props, wrapperComponentOpts, mountOpts) {
  const localVue = createLocalVue();

  const Component = localVue.extend({
    components: { EcCheckbox },
    template,
    ...wrapperComponentOpts,
  });

  return mount(Component, {
    localVue,
    propsData: { ...props },
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

    it(':disabled - should render the checkbox with a disabled attribute', () => {
      const wrapper = mountCheckbox({
        disabled: true,
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
        checked: true,
        indeterminate: true,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it(':indeterminate - should render the checkbox as checked when indeterminate has switched to false', async () => {
      const wrapper = mountCheckbox({
        checked: true,
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
    it('@checked-value-change - should be emitted when input is clicked', () => {
      const wrapper = mountCheckbox();

      wrapper.findByDataTest('ec-checkbox__input').trigger('click');
      expect(wrapper.emitted('checked-value-change').length).toBe(1);
    });

    it('@change - should be emitted when input is clicked', () => {
      const changeSpy = jest.fn();
      const wrapper = mountCheckbox({}, {
        listeners: {
          change: changeSpy,
        },
      });

      wrapper.findByDataTest('ec-checkbox__input').trigger('click');
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
  });

  describe('v-model', () => {
    it('should render the checkbox and toggle v-model value when input is clicked', () => {
      const wrapper = mountCheckboxAsTemplate(
        '<ec-checkbox v-model="checked"></ec-checkbox>',
        {},
        {
          data() {
            return {
              checked: true,
            };
          },
        },
      );

      expect(wrapper.findByDataTest('ec-checkbox').exists()).toBe(true);
      expect(wrapper.vm.checked).toBe(true);
      wrapper.findByDataTest('ec-checkbox__input').trigger('click');
      expect(wrapper.vm.checked).toBe(false);
    });

    it('should render the checkbox and toggle v-model value when label is clicked', () => {
      const wrapper = mountCheckboxAsTemplate(
        '<ec-checkbox v-model="checked"></ec-checkbox>',
        {},
        {
          data() {
            return {
              checked: true,
            };
          },
        },
      );

      expect(wrapper.findByDataTest('ec-checkbox__label').exists()).toBe(true);
      expect(wrapper.vm.checked).toBe(true);
      wrapper.findByDataTest('ec-checkbox__label').trigger('click');
      expect(wrapper.vm.checked).toBe(false);
    });

    it('should not change the value of v-model if disabled is enabled and user clicks the checkbox', () => {
      const wrapper = mountCheckboxAsTemplate(
        '<ec-checkbox v-model="checked" disabled></ec-checkbox>',
        {},
        {
          data() {
            return {
              checked: true,
            };
          },
        },
      );

      expect(wrapper.vm.checked).toBe(true);
      wrapper.findByDataTest('ec-checkbox__input').trigger('click');
      expect(wrapper.vm.checked).toBe(true);
    });

    it('should not change the value of v-model if disabled is enabled and user clicks the label', () => {
      const wrapper = mountCheckboxAsTemplate(
        '<ec-checkbox v-model="checked" disabled></ec-checkbox>',
        {},
        {
          data() {
            return {
              checked: true,
            };
          },
        },
      );

      expect(wrapper.vm.checked).toBe(true);
      wrapper.findByDataTest('ec-checkbox__label').trigger('click');
      expect(wrapper.vm.checked).toBe(true);
    });
  });
});
