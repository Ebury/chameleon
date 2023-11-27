import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

import EcAmountFilterInput from './ec-amount-filter-input.vue';

const comparisonSymbolItems = [
  {
    text: 'More than',
    value: '>',
  },
  {
    text: 'Equal to',
    value: '=',
  },
  {
    text: 'Less than',
    value: '<',
  },
];

describe('EcAmountFilterInput', () => {
  function mountAmountFilterInput(props, mountOpts) {
    return mount(EcAmountFilterInput, {
      props: {
        comparisonSymbolItems,
        modelValue: {},
        ...props,
      },
      ...mountOpts,
    });
  }

  function mountAmountFilterInputAsTemplate(template, props, wrapperComponentOpts, mountOpts) {
    const Component = defineComponent({
      components: { EcAmountFilterInput },
      template,
      ...wrapperComponentOpts,
    });

    return mount(Component, {
      props,
      ...mountOpts,
    });
  }

  it('should render properly', () => {
    const wrapper = mountAmountFilterInput();
    expect(wrapper.element).toMatchSnapshot();
  });

  describe('attrs', () => {
    it('should render with custom attributes', () => {
      const wrapper = mountAmountFilterInput({}, {
        attrs: {
          'data-test': 'my-data-test',
          class: 'my-class',
          id: 'test-id',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
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
      expect(wrapper.findByDataTest('ec-amount-filter-input__bottom-note').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-amount-filter-input__warning-tooltip').exists()).toBe(false);
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

    it('should render the amount correctly when "locale" is set', async () => {
      const wrapper = mountAmountFilterInput({ locale: 'es' });
      await wrapper.findByDataTest('ec-amount-filter-input__amount').setValue('1111,11');

      expect(wrapper.findByDataTest('ec-amount-filter-input__amount').element.value).toEqual('1.111,11');

      await wrapper.setProps({ locale: 'en' });
      expect(wrapper.findByDataTest('ec-amount-filter-input__amount').element.value).toEqual('1,111.11');
    });
  });

  describe('@events', () => {
    it('should emit the correct events when a comparison symbol is selected', async () => {
      const wrapper = mountAmountFilterInput();

      await selectComparisonSymbol(wrapper, 1);
      expect(wrapper.emitted('change').length).toEqual(1);
      expect(wrapper.emitted('focus').length).toEqual(1);
      expect(wrapper.emitted('open').length).toEqual(1);
      expect(wrapper.emitted('after-open').length).toEqual(1);
      expect(wrapper.emitted('update:modelValue').length).toEqual(1);
      expect(wrapper.emitted('comparison-symbol-change').length).toEqual(1);
      expect(wrapper.emitted('close').length).toEqual(1);
      expect(wrapper.emitted('after-close').length).toEqual(1);
      await selectComparisonSymbol(wrapper, 2);
      expect(wrapper.emitted('change').length).toEqual(2);
      expect(wrapper.emitted('focus').length).toEqual(1);
      expect(wrapper.emitted('open').length).toEqual(2);
      expect(wrapper.emitted('after-open').length).toEqual(2);
      expect(wrapper.emitted('update:modelValue').length).toEqual(2);
      expect(wrapper.emitted('comparison-symbol-change').length).toEqual(2);
      expect(wrapper.emitted('close').length).toEqual(2);
      expect(wrapper.emitted('after-close').length).toEqual(2);
    });

    it('should emit the correct events when amount is set', async () => {
      const wrapper = mountAmountFilterInput();

      await wrapper.findByDataTest('ec-amount-filter-input__amount').trigger('focus');
      await wrapper.findByDataTest('ec-amount-filter-input__amount').setValue('11');
      expect(wrapper.emitted('change').length).toEqual(1);
      expect(wrapper.emitted('focus').length).toEqual(1);
      expect(wrapper.emitted('amount-change').length).toEqual(1);
      expect(wrapper.emitted('update:modelValue').length).toEqual(1);

      await wrapper.findByDataTest('ec-amount-filter-input__amount').setValue('111');
      expect(wrapper.emitted('change').length).toEqual(2);
      expect(wrapper.emitted('amount-change').length).toEqual(2);
      expect(wrapper.emitted('update:modelValue').length).toEqual(2);
    });
  });

  describe('v-model', () => {
    it('should use the v-model with the comparison symbol and emit the changes', async () => {
      const wrapper = mountAmountFilterInputAsTemplate(
        '<ec-amount-filter-input :comparison-symbol-items="comparisonSymbolItems" v-model="value" />',
        {},
        {
          data() {
            return {
              comparisonSymbolItems,
              value: {
                comparisonSymbol: null,
                amount: 0,
              },
            };
          },
        },
      );

      await selectComparisonSymbol(wrapper, 0);
      expect(wrapper.vm.value.comparisonSymbol).toEqual({
        text: comparisonSymbolItems[0].text,
        value: comparisonSymbolItems[0].value,
      });
      await selectComparisonSymbol(wrapper, 1);
      expect(wrapper.vm.value.comparisonSymbol).toEqual({
        text: comparisonSymbolItems[1].text,
        value: comparisonSymbolItems[1].value,
      });
    });

    it('should preselect the comparison symbol and the amount from the v-model', () => {
      const wrapper = mountAmountFilterInputAsTemplate(
        '<ec-amount-filter-input :comparison-symbol-items-items="comparisonSymbolItems" v-model="value" />',
        {},
        {
          data() {
            return {
              comparisonSymbolItems,
              value: {
                comparisonSymbol: comparisonSymbolItems[2],
                amount: 1234.56,
              },
            };
          },
        },
      );

      expect(wrapper.findByDataTest('ec-amount-filter-input__comparison-symbol-selector').element.value).toBe(comparisonSymbolItems[2].value);
      expect(wrapper.findByDataTest('ec-amount-filter-input__amount').element.value).toBe('1,234.56');
    });

    it('should update the v-model correctly when we change the amount', async () => {
      const wrapper = mountAmountFilterInputAsTemplate(
        '<ec-amount-filter-input :comparison-symbol-items="comparisonSymbolItems" v-model="value" />',
        {},
        {
          data() {
            return {
              comparisonSymbolItems,
              value: {
                comparisonSymbol: comparisonSymbolItems[2],
                amount: 1234.56,
              },
            };
          },
        },
      );

      await wrapper.findByDataTest('ec-amount-filter-input__amount').setValue('11');
      expect(wrapper.vm.value.amount).toEqual(11);
    });

    it('should preserve the amount when we change the comparison symbol', async () => {
      const wrapper = mountAmountFilterInputAsTemplate(
        '<ec-amount-filter-input :comparison-symbol-items="comparisonSymbolItems" v-model="value" />',
        {},
        {
          data() {
            return {
              comparisonSymbolItems,
              value: {
                comparisonSymbol: comparisonSymbolItems[2],
                amount: 1234.56,
              },
            };
          },
        },
      );

      expect(wrapper.findByDataTest('ec-amount-filter-input__amount').element.value).toEqual('1,234.56');
      await selectComparisonSymbol(wrapper, 2);
      expect(wrapper.findByDataTest('ec-amount-filter-input__amount').element.value).toEqual('1,234.56');
    });

    it('should reflect the changes of locale', async () => {
      const wrapper = mountAmountFilterInputAsTemplate(
        '<ec-amount-filter-input :comparison-symbol-items="comparisonSymbolItems" :locale="locale" v-model="value" />',
        {},
        {
          data() {
            return {
              comparisonSymbolItems,
              value: {
                comparisonSymbol: comparisonSymbolItems[2],
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
  });
});

async function selectComparisonSymbol(wrapper, index) {
  await wrapper.findByDataTest('ec-amount-filter-input__comparison-symbol-selector').trigger('mousedown');
  await wrapper.findByDataTest('ec-popover-stub').trigger('show');
  await wrapper.findByDataTest('ec-amount-filter-input__comparison-symbol-selector').trigger('focus');
  await wrapper.findByDataTest('ec-popover-stub').trigger('apply-show');
  await wrapper.findByDataTest(`ec-dropdown-search__item--${index}`).trigger('click');
  await wrapper.findByDataTest('ec-popover-stub').trigger('hide');
  await wrapper.findByDataTest('ec-amount-filter-input__comparison-symbol-selector').trigger('blur');
  await wrapper.findByDataTest('ec-popover-stub').trigger('apply-hide');
}
