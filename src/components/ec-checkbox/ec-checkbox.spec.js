import { mount } from '@vue/test-utils';
import EcCheckbox from './ec-checkbox.vue';

function mountCheckbox(props, mountOpts) {
  return mount(EcCheckbox, {
    propsData: { ...props },
    ...mountOpts,
  });
}

describe('EcCheckbox', () => {
  describe(':props', () => {
    it(':labelMessage - should render the checkbox with a label', () => {
      const wrapper = mountCheckbox({
        labelMessage: 'Test label message prop',
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

    it(':large - should render a large checkbox', () => {
      const wrapper = mountCheckbox({
        large: true,
      });

      expect(wrapper.find('.ec-checkbox__label--large').exists()).toBe(true);
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

    it('#labelMessage - should render the label message slot if passed', () => {
      const wrapper = mountCheckbox(
        {},
        {
          slots: {
            'label-message': 'Test label message slot',
          },
        },
      );

      expect(wrapper.find('.ec-checkbox__label').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('@events', () => {
    it('@checked-value-change - should be emitted when we click on the input', () => {
      const wrapper = mountCheckbox();

      wrapper.find('input').trigger('click');
      expect(wrapper.emitted('checked-value-change').length).toBe(1);
    });
  });
});
