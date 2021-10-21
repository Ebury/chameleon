import { mount, createLocalVue } from '@vue/test-utils';
import EcAmountFilterInput from './ec-amount-filter-input.vue';

const comparisonSymbols = [
  {
    text: 'More than',
    value: '>',
    default: false,
  },
  {
    text: 'Equal to',
    value: '=',
    default: false,
  },
  {
    text: 'Less than',
    value: '<',
    default: false,
  },
];

describe('EcAmountFilterInput', () => {
  function mountAmountFilterInput(props, mountOpts) {
    return mount(EcAmountFilterInput, {
      propsData: {
        comparisonSymbols,
        value: {},
        ...props,
      },
      ...mountOpts,
    });
  }

  function mountAmountFilterInputAsTemplate(template, props, wrapperComponentOpts, mountOpts) {
    const localVue = createLocalVue();

    const Component = localVue.extend({
      components: { EcAmountFilterInput },
      template,
      ...wrapperComponentOpts,
    });

    return mount(Component, {
      localVue,
      propsData: { ...props },
      ...mountOpts,
    });
  }

  it('should render properly', () => {
    const wrapper = mountAmountFilterInput();

    expect(wrapper.element).toMatchSnapshot();
  });

  describe(':props', () => {
    it('should render with a sensitive class when isSensitive prop is set to true', () => {
      const wrapper = mountAmountFilterInput({ isSensitive: true });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with a label when the "label" is set', () => {
      const wrapper = mountAmountFilterInput({ label: 'Amount filter input' });

      expect(wrapper.findByDataTest('ec-amount-filter-input__label-text').element).toMatchSnapshot();
    });

    it('should render with a note when the "note" is set', () => {
      const wrapper = mountAmountFilterInput({ note: 'A random note message' });

      expect(wrapper.findByDataTest('ec-amount-filter-input__note').element).toMatchSnapshot();
    });

    it('should render with a bottom note when is "bottomNote" set', () => {
      const wrapper = mountAmountFilterInput({ bottomNote: 'Bottom note message' });

      expect(wrapper.findByDataTest('ec-amount-filter-input__bottom-note').element).toMatchSnapshot();
    });

    it('should render with a bottom note in a warning state when "isWarning" is set to true', () => {
      const wrapper = mountAmountFilterInput({
        bottomNote: 'Bottom note message',
        isWarning: true,
      });

      expect(wrapper.findByDataTest('ec-amount-filter-input__bottom-note').element).toMatchSnapshot();
    });

    it('should render with a warning tooltip when the "warningTooltipMessage" is set', () => {
      const warningTooltipMessage = 'Warning tooltip message';
      const wrapper = mountAmountFilterInput({
        bottomNote: 'Bottom note message',
        isWarning: true,
        warningTooltipMessage,
      });
      expect(wrapper.findByDataTest('ec-amount-filter-input__bottom-note').element).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-amount-filter-input__warning-tooltip').attributes('data-ec-tooltip-mock-content')).toBe(warningTooltipMessage);
    });

    it('should render the error message when "errorMessage" is set', () => {
      const wrapper = mountAmountFilterInput({
        bottomNote: 'Bottom note message',
        errorMessage: 'A random error message',
        isWarning: true,
        warningTooltipMessage: 'Warning tooltip message',
      });

      expect(wrapper.findByDataTest('ec-amount-filter-input__error-text').element).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-amount-filter-input__bottom-note').exists()).toBeFalsy();
      expect(wrapper.findByDataTest('ec-amount-filter-input__warning-tooltip').exists()).toBeFalsy();
    });

    it('should render the error tooltip when "errorTooltipMessage" is set', () => {
      const errorTooltipMessage = 'A random error tooltip message';
      const wrapper = mountAmountFilterInput({
        errorMessage: 'A random error message',
        errorTooltipMessage,
      });
      expect(wrapper.findByDataTest('ec-amount-filter-input__error-text').element).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-amount-filter-input__error-tooltip').attributes('data-ec-tooltip-mock-content')).toBe(errorTooltipMessage);
    });

    it('should render with a placeholder when "amountPlaceholder" is set', () => {
      const wrapper = mountAmountFilterInput({ amountPlaceholder: 'Random test placeholder' });
      expect(wrapper.findByDataTest('ec-amount-filter-input__amount').element).toMatchSnapshot();
    });

    it('should render with a custom clear amount button text when "clearAmountButtonText" is set', () => {
      const wrapper = mountAmountFilterInput({ clearAmountButtonText: 'Delete the amount' });

      expect(wrapper.findByDataTest('ec-amount-filter-input__clear-amount').element).toMatchSnapshot();
    });

    it('should render the amount correctly when "locale" is set', async () => {
      const wrapper = mountAmountFilterInput({ locale: 'es' });
      wrapper.findByDataTest('ec-amount-filter-input__amount').setValue('1111,11');

      await wrapper.vm.$nextTick();
      expect(wrapper.findByDataTest('ec-amount-filter-input__amount').element.value).toEqual('1.111,11');

      wrapper.setProps({ locale: 'en' });
      await wrapper.vm.$nextTick();
      expect(wrapper.findByDataTest('ec-amount-filter-input__amount').element.value).toEqual('1,111.11');
    });
  });

  describe('@events', () => {
    it('should emit the correct events when a filter is selected', async () => {
      const wrapper = mountAmountFilterInput();

      await selectFilter(wrapper, 1);
      expect(wrapper.emitted('change').length).toEqual(1);
      expect(wrapper.emitted('focus').length).toEqual(1);
      expect(wrapper.emitted('value-change').length).toEqual(1);
      expect(wrapper.emitted('filter-change').length).toEqual(1);
      await selectFilter(wrapper, 2);
      expect(wrapper.emitted('change').length).toEqual(2);
      expect(wrapper.emitted('focus').length).toEqual(2);
      expect(wrapper.emitted('value-change').length).toEqual(2);
      expect(wrapper.emitted('filter-change').length).toEqual(2);
    });

    it('should emit the correct events when amount is set', async () => {
      const wrapper = mountAmountFilterInput();

      await wrapper.findByDataTest('ec-amount-filter-input__amount').setValue('11');
      await wrapper.findByDataTest('ec-amount-filter-input__amount').trigger('change');
      expect(wrapper.emitted('change').length).toEqual(1);
      expect(wrapper.emitted('amount-change').length).toEqual(1);
      expect(wrapper.emitted('value-change').length).toEqual(1);

      await wrapper.findByDataTest('ec-amount-filter-input__amount').setValue('111');
      await wrapper.findByDataTest('ec-amount-filter-input__amount').trigger('change');
      expect(wrapper.emitted('change').length).toEqual(2);
      expect(wrapper.emitted('amount-change').length).toEqual(2);
      expect(wrapper.emitted('value-change').length).toEqual(2);
    });

    it('should emit the correct event when amount is cleared', () => {
      const wrapper = mountAmountFilterInput({
        value: {
          amount: 10,
        },
      });

      wrapper.findByDataTest('ec-amount-filter-input__clear-amount').trigger('click');
      expect(wrapper.emitted('amount-cleared').length).toEqual(1);
    });
  });

  describe('v-model', () => {
    it('should use the v-model with the filter and emit the changes', async () => {
      const wrapper = mountAmountFilterInputAsTemplate(
        '<ec-amount-filter-input :comparison-symbols="comparisonSymbols" v-model="value" />',
        {},
        {
          data() {
            return {
              comparisonSymbols,
              value: {
                symbol: '',
                amount: 0,
              },
            };
          },
        },
      );

      await selectFilter(wrapper, 0);
      expect(wrapper.vm.value.filter).toEqual({
        text: comparisonSymbols[0].text,
        value: comparisonSymbols[0].value,
      });
      await selectFilter(wrapper, 1);
      expect(wrapper.vm.value.filter).toEqual({
        text: comparisonSymbols[1].text,
        value: comparisonSymbols[1].value,
      });
    });

    it('should preselect the filter and the amount from the v-model', () => {
      const wrapper = mountAmountFilterInputAsTemplate(
        '<ec-amount-filter-input :comparison-symbols="comparisonSymbols" v-model="value" />',
        {},
        {
          data() {
            return {
              comparisonSymbols,
              value: {
                filter: comparisonSymbols[2],
                amount: 1234.56,
              },
            };
          },
        },
      );

      expect(wrapper.findByDataTest('ec-amount-filter-input__filter-selector').element.value).toBe(comparisonSymbols[2].value);
      expect(wrapper.findByDataTest('ec-amount-filter-input__amount').element.value).toBe('1,234.56');
    });

    it('should update the v-model correctly when we change the amount', async () => {
      const wrapper = mountAmountFilterInputAsTemplate(
        '<ec-amount-filter-input :comparison-symbols="comparisonSymbols" v-model="value" />',
        {},
        {
          data() {
            return {
              comparisonSymbols,
              value: {
                filter: comparisonSymbols[2],
                amount: 1234.56,
              },
            };
          },
        },
      );

      await wrapper.findByDataTest('ec-amount-filter-input__amount').setValue('11');
      expect(wrapper.vm.value.amount).toEqual(11);
    });

    it('should preserve the amount when we change the filter', async () => {
      const wrapper = mountAmountFilterInputAsTemplate(
        '<ec-amount-filter-input :comparison-symbols="comparisonSymbols" v-model="value" />',
        {},
        {
          data() {
            return {
              comparisonSymbols,
              value: {
                filter: comparisonSymbols[2],
                amount: 1234.56,
              },
            };
          },
        },
      );

      expect(wrapper.findByDataTest('ec-amount-filter-input__amount').element.value).toEqual('1,234.56');
      await selectFilter(wrapper, 2);
      expect(wrapper.findByDataTest('ec-amount-filter-input__amount').element.value).toEqual('1,234.56');
    });

    it('should reflect the changes of locale', async () => {
      const wrapper = mountAmountFilterInputAsTemplate(
        '<ec-amount-filter-input :comparison-symbols="comparisonSymbols" :locale="locale" v-model="value" />',
        {},
        {
          data() {
            return {
              comparisonSymbols,
              value: {
                filter: comparisonSymbols[2],
                amount: 1234.56,
              },
              locale: 'en',
            };
          },
        },
      );

      expect(wrapper.findByDataTest('ec-amount-filter-input__amount').element.value).toEqual('1,234.56');
      await wrapper.setData({ locale: 'es' });
      expect(wrapper.findByDataTest('ec-amount-filter-input__amount').element.value).toEqual('1.234,56');
    });

    it('should have the "Clear amount" button in a disabled state when amount is null or zero', () => {
      const wrapper = mountAmountFilterInputAsTemplate(
        '<ec-amount-filter-input :comparison-symbols="comparisonSymbols" v-model="value" />',
        {},
        {
          data() {
            return {
              comparisonSymbols,
              value: {
                filter: comparisonSymbols[2],
                amount: null,
              },
            };
          },
        },
      );

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should have the "Clear amount" button in an enabled state when amount is greater than zero', () => {
      const wrapper = mountAmountFilterInputAsTemplate(
        '<ec-amount-filter-input :comparison-symbols="comparisonSymbols" v-model="value" />',
        {},
        {
          data() {
            return {
              comparisonSymbols,
              value: {
                filter: comparisonSymbols[2],
                amount: '10',
              },
            };
          },
        },
      );

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should update correctly the v-model when we click on the "clear Amount" button', async () => {
      const wrapper = mountAmountFilterInputAsTemplate(
        '<ec-amount-filter-input :comparison-symbols="comparisonSymbols" v-model="value" />',
        {},
        {
          data() {
            return {
              comparisonSymbols,
              value: {
                filter: comparisonSymbols[2],
                amount: '10',
              },
            };
          },
        },
      );
      expect(wrapper.findByDataTest('ec-amount-filter-input__amount').element.value).toEqual('10');
      wrapper.findByDataTest('ec-amount-filter-input__clear-amount').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.findByDataTest('ec-amount-filter-input__amount').element.value).toEqual('');
    });
  });
});

async function selectFilter(wrapper, index) {
  wrapper.findByDataTest('ec-amount-filter-input__filter-selector').trigger('mousedown');
  wrapper.findByDataTest('ec-amount-filter-input__filter-selector').trigger('focus');
  wrapper.findByDataTest(`ec-dropdown-search__item--${index}`).trigger('click');
  await wrapper.vm.$nextTick();
}
