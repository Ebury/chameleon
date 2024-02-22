import { type ComponentMountingOptions, mount, VueWrapper } from '@vue/test-utils';
import { defineComponent } from 'vue';

import { TooltipPlacement } from '../../main';
import EcCurrencyInput from './ec-currency-input.vue';
import type { CurrencyInputProps } from './types';

describe('EcCurrencyInput', () => {
  const currencies = ['GBP', 'EUR', 'USD', 'JPY'];

  function mountCurrencyInput(props?: CurrencyInputProps, mountOpts?: ComponentMountingOptions<typeof EcCurrencyInput>) {
    return mount(EcCurrencyInput, {
      props: {
        currencies,
        modelValue: {},
        ...props,
      },
      ...mountOpts,
    });
  }

  it('should render properly', () => {
    const wrapper = mountCurrencyInput();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with a sensitive class when isSensitive prop is set to true', () => {
    const wrapper = mountCurrencyInput({ isSensitive: true });

    expect(wrapper.element).toMatchSnapshot();
  });

  describe('when the bottom note is defined', () => {
    it('should render properly', () => {
      const wrapper = mountCurrencyInput({ bottomNote: 'Bottom note message' });
      expect(wrapper.findByDataTest('ec-currency-input__bottom-note').element).toMatchSnapshot();
    });

    describe('and it is a warning note', () => {
      it('should render properly', () => {
        const wrapper = mountCurrencyInput({
          bottomNote: 'Bottom note message',
          isWarning: true,
        });
        expect(wrapper.findByDataTest('ec-currency-input__bottom-note').element).toMatchSnapshot();
      });

      describe('and there is a warning message defined', () => {
        it('should render properly', () => {
          const warningTooltipMessage = 'Warning tooltip message';
          const wrapper = mountCurrencyInput({
            bottomNote: 'Bottom note message',
            isWarning: true,
            warningTooltipMessage,
          });
          expect(wrapper.findByDataTest('ec-currency-input__bottom-note').element).toMatchSnapshot();
          expect(wrapper.findByDataTest('ec-currency-input__warning-tooltip').attributes('data-ec-tooltip-mock-content')).toBe(warningTooltipMessage);
        });

        describe('and an error message is being displayed', () => {
          it('should not display neither the bottom note nor the warning icon', () => {
            const wrapper = mountCurrencyInput({
              bottomNote: 'Bottom note message',
              errorMessage: 'Random message',
              isWarning: true,
              warningTooltipMessage: 'Warning tooltip message',
            });
            expect(wrapper.findByDataTest('ec-currency-input__bottom-note').exists()).toBe(false);
            expect(wrapper.findByDataTest('ec-currency-input__warning-tooltip').exists()).toBe(false);
            expect(wrapper.findByDataTest('ec-currency-input__error-text').exists()).toBe(true);
          });
        });
      });
    });

    describe('and an error message is being displayed', () => {
      it('should not display the bottom note', () => {
        const wrapper = mountCurrencyInput({
          bottomNote: 'Bottom note message',
          errorMessage: 'Random message',
        });
        expect(wrapper.findByDataTest('ec-currency-input__bottom-note').exists()).toBe(false);
        expect(wrapper.findByDataTest('ec-currency-input__error-text').exists()).toBe(true);
      });
    });
  });

  describe('when the placeholder message for the amount input is defined', () => {
    it('should render properly', () => {
      const wrapper = mountCurrencyInput({ amountPlaceholder: 'Amount Placeholder' });
      expect(wrapper.findByDataTest('ec-currency-input__amount').element).toMatchSnapshot();
    });
  });

  describe('when the disabled currency selector has a tooltip associated', () => {
    const disabledCurrenciesTooltipMessage = 'Tooltip message';

    it('should render properly', () => {
      const wrapper = mountCurrencyInput({
        disabledCurrenciesTooltip: { content: disabledCurrenciesTooltipMessage },
        isCurrenciesDisabled: true,
      });
      expect(wrapper.findByDataTest('ec-currency-input__currencies').element).toMatchSnapshot();
    });

    it('should render properly using the defined placement', () => {
      const wrapper = mountCurrencyInput({
        disabledCurrenciesTooltip: {
          content: disabledCurrenciesTooltipMessage,
          placement: TooltipPlacement.LEFT,
        },
        isCurrenciesDisabled: true,
      });
      expect(wrapper.findByDataTest('ec-currency-input__currencies').element).toMatchSnapshot();
    });

    describe('and the currency dropdown is not disabled', () => {
      it('should render properly not including the tooltip', () => {
        const wrapper = mountCurrencyInput({
          disabledCurrenciesTooltip: { content: disabledCurrenciesTooltipMessage },
          isCurrenciesDisabled: false,
        });
        expect(wrapper.findByDataTest('ec-currency-input__currencies').element).toMatchSnapshot();
      });
    });
  });

  describe('when the error message is defined', () => {
    const errorMessage = 'Random message';
    it('should render properly', () => {
      const wrapper = mountCurrencyInput({ errorMessage });
      expect(wrapper.findByDataTest('ec-currency-input__error-text').element).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-currency-input__currencies').classes('ec-input-field__input--has-error')).toBe(true);
      expect(wrapper.findByDataTest('ec-currency-input__amount').classes('ec-input-field__input--has-error')).toBe(true);
      expect(wrapper.findByDataTest('ec-input-field__error-text').exists()).toBe(false);
    });

    describe('and there is a tooltip message relative to the error defined', () => {
      it('should render properly', () => {
        const errorTooltipMessage = 'Error tooltip message';
        const wrapper = mountCurrencyInput({
          errorMessage,
          errorTooltipMessage,
        });
        expect(wrapper.findByDataTest('ec-currency-input__error-text').element).toMatchSnapshot();
      });
    });
  });

  describe(':props', () => {
    it('should render the label when the label is given', () => {
      const wrapper = mountCurrencyInput({ label: 'Currency Input' });
      expect(wrapper.findByDataTest('ec-currency-input__label-text').element).toMatchSnapshot();
    });

    it('should render the note when the note is given', () => {
      const wrapper = mountCurrencyInput({ note: 'Random note' });
      expect(wrapper.findByDataTest('ec-currency-input__note').element).toMatchSnapshot();
    });

    it('should render without any currencies if the currencies prop is empty', () => {
      const wrapper = mountCurrencyInput({ currencies: [] });
      expect(wrapper.findByDataTest('ec-dropdown-search__no-items').exists()).toBe(true);
      expect(wrapper.findByDataTest('ec-dropdown').element).toMatchSnapshot();
    });

    it('should render the amount correctly when we swap locale', async () => {
      const wrapper = mountCurrencyInput({ locale: 'es' });
      await wrapper.findByDataTest('ec-currency-input__amount').setValue('1111,11');

      expect(wrapper.findByDataTest<HTMLInputElement>('ec-currency-input__amount').element.value).toEqual('1.111,11');

      await wrapper.setProps({ locale: 'en' });
      expect(wrapper.findByDataTest<HTMLInputElement>('ec-currency-input__amount').element.value).toEqual('1,111.11');
    });

    it('should render a loading state when currenciesLoading is set true', () => {
      const wrapper = mountCurrencyInput({ currenciesAreLoading: true });

      expect(wrapper.findByDataTest('ec-popover-dropdown-search').element).toMatchSnapshot();
    });

    it('should render the component with the dropdown part disabled when isCurrenciesDisabled is set true', () => {
      const wrapper = mountCurrencyInput({ isCurrenciesDisabled: true, modelValue: { currency: 'EUR' } });

      expect(wrapper.findByDataTest('ec-currency-input__currencies').element).toMatchSnapshot();
    });

    it('should render the component with the input disabled when isAmountDisabled is set true', () => {
      const wrapper = mountCurrencyInput({ isAmountDisabled: true });

      expect(wrapper.findByDataTest('ec-currency-input__amount').element).toMatchSnapshot();
    });

    it('should render the searching field with the placeholder message passed as prop', async () => {
      const wrapper = mountCurrencyInput({ searchCurrencyPlaceholder: 'Search currency placeholder' });

      await wrapper.findByDataTest('ec-currency-input__currencies').trigger('mousedown');

      expect(wrapper.findByDataTest('ec-dropdown-search__search-input').element).toMatchSnapshot();
    });

    it('should render the non-results message passed as prop if no currency matches the typed one', async () => {
      const wrapper = mountCurrencyInput({ noCurrenciesText: 'No currencies text' });

      await wrapper.findByDataTest('ec-currency-input__currencies').trigger('mousedown');
      await wrapper.findByDataTest('ec-dropdown-search__search-input').setValue('XXX');

      expect(wrapper.findByDataTest('ec-dropdown-search__item-list').element).toMatchSnapshot();
    });
  });

  describe('$attrs', () => {
    it('should use data-test attribute to prefix all data-test attributes in nested components', () => {
      const wrapper = mountCurrencyInput({}, {
        attrs: { 'data-test': 'my-component' },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should use data-test attribute to prefix all data-test attributes in label', () => {
      const wrapper = mountCurrencyInput({
        label: 'Test Input',
        note: 'Test Note',
      }, {
        attrs: { 'data-test': 'my-component' },
      });
      expect(wrapper.findByDataTest('my-component__label-text').element).toMatchSnapshot('label');
      expect(wrapper.findByDataTest('my-component__note').element).toMatchSnapshot('note');
    });

    it('should use data-test attribute to prefix all data-test attributes in error message', () => {
      const wrapper = mountCurrencyInput({
        errorMessage: 'Test Error Message',
        errorTooltipMessage: 'Test Error Tooltip',
      }, {
        attrs: { 'data-test': 'my-component' },
      });
      expect(wrapper.findByDataTest('my-component__error-text').element).toMatchSnapshot();
    });

    it('should use data-test attribute to prefix all data-test attributes in bottom note', () => {
      const wrapper = mountCurrencyInput({
        bottomNote: 'Test Bottom Note',
        warningTooltipMessage: 'Test Warning Tooltip',
        isWarning: true,
      }, {
        attrs: { 'data-test': 'my-component' },
      });
      expect(wrapper.findByDataTest('my-component__bottom-note').element).toMatchSnapshot();
    });

    it('should use data-test attribute with multiple values to prefix all data-test attributes in nested components', () => {
      const wrapper = mountCurrencyInput({}, {
        attrs: { 'data-test': 'my-component my-other-component' },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('@events', () => {
    it('should emit change events when an item is selected', async () => {
      const wrapper = mountCurrencyInput();

      await selectItem(wrapper, 1);
      expect(wrapper.emitted('open')?.length).toEqual(1);
      expect(wrapper.emitted('after-open')?.length).toEqual(1);
      expect(wrapper.emitted('change')?.length).toEqual(1);
      expect(wrapper.emitted('focus')?.length).toEqual(1);
      expect(wrapper.emitted('update:modelValue')?.length).toEqual(1);
      expect(wrapper.emitted('currency-change')?.length).toEqual(1);
      await selectItem(wrapper, 2);
      expect(wrapper.emitted('open')?.length).toEqual(2);
      expect(wrapper.emitted('after-open')?.length).toEqual(2);
      expect(wrapper.emitted('change')?.length).toEqual(2);
      expect(wrapper.emitted('focus')?.length).toEqual(1);
      expect(wrapper.emitted('update:modelValue')?.length).toEqual(2);
      expect(wrapper.emitted('currency-change')?.length).toEqual(2);
    });

    it('should emit update:modelValue event when amount is set', async () => {
      const wrapper = mountCurrencyInput();

      await wrapper.findByDataTest('ec-currency-input__amount').trigger('focus');
      await wrapper.findByDataTest('ec-currency-input__amount').setValue('11');
      expect(wrapper.emitted('focus')?.length).toEqual(1);
      expect(wrapper.emitted('change')?.length).toEqual(1);
      expect(wrapper.emitted('amount-change')?.length).toEqual(1);
      expect(wrapper.emitted('update:modelValue')?.length).toEqual(1);

      await wrapper.findByDataTest('ec-currency-input__amount').trigger('focus');
      await wrapper.findByDataTest('ec-currency-input__amount').setValue('111');
      expect(wrapper.emitted('focus')?.length).toEqual(2);
      expect(wrapper.emitted('change')?.length).toEqual(2);
      expect(wrapper.emitted('amount-change')?.length).toEqual(2);
      expect(wrapper.emitted('update:modelValue')?.length).toEqual(2);
    });
  });

  describe('v-model', () => {
    it('should use the v-model with the currency and emit the changes', async () => {
      const Component = defineComponent({
        components: { EcCurrencyInput },
        data() {
          return { currencies, value: { currency: '', amount: 0 } };
        },
        template: '<ec-currency-input :currencies="currencies" v-model="value" />',
      });

      const wrapper = mount(Component);
      await selectItem(wrapper, 0);
      expect(wrapper.vm.value.currency).toEqual(currencies[0]);
      await selectItem(wrapper, 1);
      expect(wrapper.vm.value.currency).toEqual(currencies[1]);
    });

    it('should preselect the currency item in the dropdown and the amount in the input from the v-model', () => {
      const Component = defineComponent({
        components: { EcCurrencyInput },
        data() {
          return { currencies, value: { currency: currencies[1], amount: 1234.56 } };
        },
        template: '<ec-currency-input :currencies="currencies" v-model="value" />',
      });

      const wrapper = mount(Component);
      expect(wrapper.findByDataTest<HTMLInputElement>('ec-currency-input__currencies').element.value).toBe(currencies[1]);
      expect(wrapper.findByDataTest<HTMLInputElement>('ec-currency-input__amount').element.value).toBe('1,234.56');
    });

    it('should use the v-model with the amount and emit the changes', async () => {
      const Component = defineComponent({
        components: { EcCurrencyInput },
        data() {
          return { currencies, value: { amount: 0 } };
        },
        template: '<ec-currency-input :currencies="currencies" v-model="value" />',
      });

      const wrapper = mount(Component);
      await wrapper.findByDataTest('ec-currency-input__amount').setValue('11');
      expect(wrapper.vm.value.amount).toEqual(11);
    });

    it('should not show decimal when currency is JPY', async () => {
      const Component = defineComponent({
        components: { EcCurrencyInput },
        data() {
          return { currencies, value: { currency: 'GBP', amount: 11111.11 } };
        },
        template: '<ec-currency-input :currencies="currencies" v-model="value" />',
      });

      const wrapper = mount(Component);
      expect(wrapper.findByDataTest<HTMLInputElement>('ec-currency-input__amount').element.value).toEqual('11,111.11');
      await selectItem(wrapper, currencies.indexOf('JPY'));
      expect(wrapper.findByDataTest<HTMLInputElement>('ec-currency-input__amount').element.value).toEqual('11,111');
    });

    it('should not add decimal back when switching from JPY back to GBP', async () => {
      const Component = defineComponent({
        components: { EcCurrencyInput },
        data() {
          return { currencies, value: { currency: 'GBP', amount: 11111.11 } };
        },
        template: '<ec-currency-input :currencies="currencies" v-model="value" />',
      });

      const wrapper = mount(Component);
      expect(wrapper.findByDataTest<HTMLInputElement>('ec-currency-input__amount').element.value).toEqual('11,111.11');
      await selectItem(wrapper, currencies.indexOf('JPY'));
      expect(wrapper.findByDataTest<HTMLInputElement>('ec-currency-input__amount').element.value).toEqual('11,111');

      await selectItem(wrapper, currencies.indexOf('GBP'));
      expect(wrapper.findByDataTest<HTMLInputElement>('ec-currency-input__amount').element.value).toEqual('11,111');
    });

    it('should preserve same format when currency changes', async () => {
      const Component = defineComponent({
        components: { EcCurrencyInput },
        data() {
          return { currencies, value: { currency: 'GBP', amount: 11111.11 } };
        },
        template: '<ec-currency-input :currencies="currencies" v-model="value" locale="en" />',
      });

      const wrapper = mount(Component);
      expect(wrapper.findByDataTest<HTMLInputElement>('ec-currency-input__amount').element.value).toEqual('11,111.11');
      await selectItem(wrapper, currencies.indexOf('EUR'));
      expect(wrapper.findByDataTest<HTMLInputElement>('ec-currency-input__amount').element.value).toEqual('11,111.11');
    });

    it('should preserve same format when currency changes and the locale does not use dot as a decimal separator', async () => {
      const Component = defineComponent({
        components: { EcCurrencyInput },
        data() {
          return { currencies, value: { currency: 'GBP', amount: 11111.11 } };
        },
        template: '<ec-currency-input :currencies="currencies" v-model="value" locale="es" />',
      });

      const wrapper = mount(Component);
      expect(wrapper.findByDataTest<HTMLInputElement>('ec-currency-input__amount').element.value).toEqual('11.111,11');
      await selectItem(wrapper, currencies.indexOf('EUR'));
      expect(wrapper.findByDataTest<HTMLInputElement>('ec-currency-input__amount').element.value).toEqual('11.111,11');
    });

    it('should preserve empty value in amount when changing currency', async () => {
      const Component = defineComponent({
        components: { EcCurrencyInput },
        data() {
          return { currencies, value: { currency: 'GBP' } };
        },
        template: '<ec-currency-input :currencies="currencies" v-model="value" />',
      });

      const wrapper = mount(Component);
      expect(wrapper.findByDataTest<HTMLInputElement>('ec-currency-input__amount').element.value).toEqual('');
      await selectItem(wrapper, currencies.indexOf('EUR'));
      expect(wrapper.findByDataTest<HTMLInputElement>('ec-currency-input__amount').element.value).toEqual('');
    });

    it('should preserve empty value in amount when changing locale', async () => {
      const Component = defineComponent({
        components: { EcCurrencyInput },
        data() {
          return { currencies, locale: 'en', value: { currency: 'GBP' } };
        },
        template: '<ec-currency-input :currencies="currencies" v-model="value" :locale="locale" />',
      });

      const wrapper = mount(Component);
      expect(wrapper.findByDataTest<HTMLInputElement>('ec-currency-input__amount').element.value).toEqual('');
      await wrapper.setData({ locale: 'es' });
      expect(wrapper.findByDataTest<HTMLInputElement>('ec-currency-input__amount').element.value).toEqual('');
    });
  });
});

async function selectItem(wrapper: VueWrapper, index: number) {
  await wrapper.findByDataTest('ec-popover-stub').trigger('show');
  await wrapper.findByDataTest('ec-currency-input__currencies').trigger('mousedown');
  await wrapper.findByDataTest('ec-currency-input__currencies').trigger('focus');
  await wrapper.findByDataTest('ec-popover-stub').trigger('apply-show');
  await wrapper.findByDataTest(`ec-dropdown-search__item--${index}`).trigger('click');
  await wrapper.findByDataTest('ec-currency-input__currencies').trigger('blur');
}
