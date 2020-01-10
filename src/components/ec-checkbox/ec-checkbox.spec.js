import { mount, createLocalVue } from '@vue/test-utils';
import EcCheckbox from './ec-checkbox.vue';

function mountCheckbox(props, mountOpts) {
  return mount(EcCheckbox, {
    propsData: { ...props },
    ...mountOpts,
  });
}

function mountCheckboxAsTemplate(template, props, mountOpts) {
  const localVue = createLocalVue();

  const Component = localVue.extend({
    components: { EcCheckbox },
    template,
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

      expect(wrapper.find('.ec-checkbox__label').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':errorMessage - should render the checkbox with an errorMessage', () => {
      const wrapper = mountCheckbox({
        errorMessage: 'Test error message prop',
      });

      expect(wrapper.find('.ec-checkbox__error-text').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disabled - should render the checkbox with a disabled attribute', () => {
      const wrapper = mountCheckbox({
        disabled: true,
      });

      expect(wrapper.element).toMatchSnapshot();
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

      expect(wrapper.find('.ec-checkbox__error-text').exists()).toBe(true);
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

      expect(wrapper.find('.ec-checkbox__label').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('@events', () => {
    it('@checked-value-change - should be emitted when input is clicked', () => {
      const wrapper = mountCheckbox();

      wrapper.find('.ec-checkbox__input').trigger('click');
      expect(wrapper.emitted('checked-value-change').length).toBe(1);
    });

    it('@change - should be emitted when input is clicked', () => {
      const changeSpy = jest.fn();
      const wrapper = mountCheckbox({}, {
        listeners: {
          change: changeSpy,
        },
      });

      wrapper.find('.ec-checkbox__input').trigger('click');
      expect(changeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('attrs', () => {
    it('should have aria-label', () => {
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

      expect(wrapper.find('.ec-checkbox').exists()).toBe(true);
      expect(wrapper.vm.checked).toBe(true);
      wrapper.find('.ec-checkbox__input').trigger('click');
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

      expect(wrapper.find('.ec-checkbox__label').exists()).toBe(true);
      expect(wrapper.vm.checked).toBe(true);
      wrapper.find('.ec-checkbox__label').trigger('click');
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
      wrapper.find('.ec-checkbox__input').trigger('click');
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
      wrapper.find('.ec-checkbox__label').trigger('click');
      expect(wrapper.vm.checked).toBe(true);
    });
  });
});
