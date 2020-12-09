import { mount, createLocalVue } from '@vue/test-utils';
import EcCurrencyInput from './ec-currency-input.vue';

jest.mock('../../directives/ec-tooltip', () => ({
  bind(el, { value }) {
    if (value) {
      el.setAttribute('mocked-tooltip-content', value.content);

      if (value.placement) {
        el.setAttribute('mocked-tooltip-placement', value.placement);
      }
    }
  },
}));

describe('EcCurrencyInput', () => {
  const currencies = ['GBP', 'EUR', 'USD', 'JPY'];

  function mountCurrencyInput(props, mountOpts) {
    return mount(EcCurrencyInput, {
      propsData: {
        currencies,
        value: {},
        ...props,
      },
      stubs: { EcPopover: true },
      ...mountOpts,
    });
  }

  function mountCurrencyInputAsTemplate(template, props, wrapperComponentOpts, mountOpts) {
    const localVue = createLocalVue();

    const Component = localVue.extend({
      components: { EcCurrencyInput },
      template,
      ...wrapperComponentOpts,
    });

    return mount(Component, {
      localVue,
      propsData: { ...props },
      stubs: { EcPopover: true },
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
          expect(wrapper.findByDataTest('ec-currency-input__warning-tooltip').attributes('mocked-tooltip-content')).toBe(warningTooltipMessage);
        });

        describe('and an error message is being displayed', () => {
          it('should not display neither the bottom note nor the warning icon', () => {
            const wrapper = mountCurrencyInput({
              bottomNote: 'Bottom note message',
              errorMessage: 'Random message',
              isWarning: true,
              warningTooltipMessage: 'Warning tooltip message',
            });
            expect(wrapper.findByDataTest('ec-currency-input__bottom-note').exists()).toBeFalsy();
            expect(wrapper.findByDataTest('ec-currency-input__warning-tooltip').exists()).toBeFalsy();
            expect(wrapper.findByDataTest('ec-currency-input__error-text').exists()).toBeTruthy();
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
        expect(wrapper.findByDataTest('ec-currency-input__bottom-note').exists()).toBeFalsy();
        expect(wrapper.findByDataTest('ec-currency-input__error-text').exists()).toBeTruthy();
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
          placement: 'left',
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
      expect(wrapper.findByDataTest('ec-currency-input__currencies').classes('ec-input-field__input--has-error')).toBeTruthy();
      expect(wrapper.findByDataTest('ec-currency-input__amount').classes('ec-input-field__input--has-error')).toBeTruthy();
      expect(wrapper.findByDataTest('ec-input-field__error-text').exists()).toBeFalsy();
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
      wrapper.findByDataTest('ec-currency-input__amount').setValue('1111,11');

      await wrapper.vm.$nextTick();
      expect(wrapper.findByDataTest('ec-currency-input__amount').element.value).toEqual('1.111,11');

      wrapper.setProps({ locale: 'en' });
      await wrapper.vm.$nextTick();
      expect(wrapper.findByDataTest('ec-currency-input__amount').element.value).toEqual('1,111.11');
    });

    it('should render a loading state when currenciesLoading is set true', () => {
      const wrapper = mountCurrencyInput({ currenciesAreLoading: true });

      expect(wrapper.findByDataTest('ec-popover-dropdown-search').element).toMatchSnapshot();
    });

    it('should render the component with the dropdown part disabled when isCurrenciesDisabled is set true', () => {
      const wrapper = mountCurrencyInput({ isCurrenciesDisabled: true, value: { currency: 'EUR' } });

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

  describe('@events', () => {
    it('should emit change events when an item is selected', async () => {
      const wrapper = mountCurrencyInput();

      await selectItem(wrapper, 1);
      expect(wrapper.emitted('change').length).toEqual(1);
      expect(wrapper.emitted('focus').length).toEqual(1);
      expect(wrapper.emitted('value-change').length).toEqual(1);
      expect(wrapper.emitted('currency-change').length).toEqual(1);
      await selectItem(wrapper, 2);
      expect(wrapper.emitted('change').length).toEqual(2);
      expect(wrapper.emitted('focus').length).toEqual(2);
      expect(wrapper.emitted('value-change').length).toEqual(2);
      expect(wrapper.emitted('currency-change').length).toEqual(2);
    });

    it('should emit value-change event when amount is set', async () => {
      const wrapper = mountCurrencyInput();

      await wrapper.findByDataTest('ec-currency-input__amount').setValue('11');
      await wrapper.findByDataTest('ec-currency-input__amount').trigger('change');
      expect(wrapper.emitted('change').length).toEqual(1);
      expect(wrapper.emitted('amount-change').length).toEqual(1);
      expect(wrapper.emitted('value-change').length).toEqual(1);

      await wrapper.findByDataTest('ec-currency-input__amount').setValue('111');
      await wrapper.findByDataTest('ec-currency-input__amount').trigger('change');
      expect(wrapper.emitted('change').length).toEqual(2);
      expect(wrapper.emitted('amount-change').length).toEqual(2);
      expect(wrapper.emitted('value-change').length).toEqual(2);
    });
  });

  describe('v-model', () => {
    it('should use the v-model with the currency and emit the changes', async () => {
      const wrapper = mountCurrencyInputAsTemplate(
        '<ec-currency-input :currencies="currencies" v-model="value" />',
        {},
        {
          data() {
            return { currencies, value: { currency: '', amount: 0 } };
          },
        },
      );

      await selectItem(wrapper, 0);
      expect(wrapper.vm.value.currency).toEqual(currencies[0]);
      await selectItem(wrapper, 1);
      expect(wrapper.vm.value.currency).toEqual(currencies[1]);
    });

    it('should preselect the currency item in the dropdown and the amount in the input from the v-model', () => {
      const wrapper = mountCurrencyInputAsTemplate(
        '<ec-currency-input :currencies="currencies" v-model="value" />',
        {},
        {
          data() {
            return { currencies, value: { currency: currencies[1], amount: 1234.56 } };
          },
        },
      );

      expect(wrapper.findByDataTest('ec-currency-input__currencies').element.value).toBe(currencies[1]);
      expect(wrapper.findByDataTest('ec-currency-input__amount').element.value).toBe('1,234.56');
    });

    it('should use the v-model with the amount and emit the changes', async () => {
      const wrapper = mountCurrencyInputAsTemplate(
        '<ec-currency-input :currencies="currencies" v-model="value" />',
        {},
        {
          data() {
            return { currencies, value: { amount: 0 } };
          },
        },
      );

      await wrapper.findByDataTest('ec-currency-input__amount').setValue('11');
      expect(wrapper.vm.value.amount).toEqual(11);
    });

    it('should not show decimal when currency is JPY', async () => {
      const wrapper = mountCurrencyInputAsTemplate(
        '<ec-currency-input :currencies="currencies" v-model="value" />',
        {},
        {
          data() {
            return { currencies, value: { currency: 'GBP', amount: 11111.11 } };
          },
        },
      );

      expect(wrapper.findByDataTest('ec-currency-input__amount').element.value).toEqual('11,111.11');
      await selectItem(wrapper, currencies.indexOf('JPY'));
      expect(wrapper.findByDataTest('ec-currency-input__amount').element.value).toEqual('11,111');
    });

    it('should not add decimal back when switching from JPY back to GBP', async () => {
      const wrapper = mountCurrencyInputAsTemplate(
        '<ec-currency-input :currencies="currencies" v-model="value" />',
        {},
        {
          data() {
            return { currencies, value: { currency: 'GBP', amount: 11111.11 } };
          },
        },
      );

      expect(wrapper.findByDataTest('ec-currency-input__amount').element.value).toEqual('11,111.11');
      await selectItem(wrapper, currencies.indexOf('JPY'));
      expect(wrapper.findByDataTest('ec-currency-input__amount').element.value).toEqual('11,111');

      await selectItem(wrapper, currencies.indexOf('GBP'));
      expect(wrapper.findByDataTest('ec-currency-input__amount').element.value).toEqual('11,111');
    });

    it('should preserve same format when currency changes', async () => {
      const wrapper = mountCurrencyInputAsTemplate(
        '<ec-currency-input :currencies="currencies" v-model="value" locale="en" />',
        {},
        {
          data() {
            return { currencies, value: { currency: 'GBP', amount: 11111.11 } };
          },
        },
      );

      expect(wrapper.findByDataTest('ec-currency-input__amount').element.value).toEqual('11,111.11');
      await selectItem(wrapper, currencies.indexOf('EUR'));
      expect(wrapper.findByDataTest('ec-currency-input__amount').element.value).toEqual('11,111.11');
    });

    it('should preserve same format when currency changes and the locale does not use dot as a decimal separator', async () => {
      const wrapper = mountCurrencyInputAsTemplate(
        '<ec-currency-input :currencies="currencies" v-model="value" locale="es" />',
        {},
        {
          data() {
            return { currencies, value: { currency: 'GBP', amount: 11111.11 } };
          },
        },
      );

      expect(wrapper.findByDataTest('ec-currency-input__amount').element.value).toEqual('11.111,11');
      await selectItem(wrapper, currencies.indexOf('EUR'));
      expect(wrapper.findByDataTest('ec-currency-input__amount').element.value).toEqual('11.111,11');
    });

    it('should preserve empty value in amount when changing currency', async () => {
      const wrapper = mountCurrencyInputAsTemplate(
        '<ec-currency-input :currencies="currencies" v-model="value" />',
        {},
        {
          data() {
            return { currencies, value: { currency: 'GBP' } };
          },
        },
      );

      expect(wrapper.findByDataTest('ec-currency-input__amount').element.value).toEqual('');
      await selectItem(wrapper, currencies.indexOf('EUR'));
      expect(wrapper.findByDataTest('ec-currency-input__amount').element.value).toEqual('');
    });

    it('should preserve empty value in amount when changing locale', async () => {
      const wrapper = mountCurrencyInputAsTemplate(
        '<ec-currency-input :currencies="currencies" v-model="value" :locale="locale" />',
        {},
        {
          data() {
            return { currencies, locale: 'en', value: { currency: 'GBP' } };
          },
        },
      );

      expect(wrapper.findByDataTest('ec-currency-input__amount').element.value).toEqual('');
      await wrapper.setData({ locale: 'es' });
      expect(wrapper.findByDataTest('ec-currency-input__amount').element.value).toEqual('');
    });
  });
});

async function selectItem(wrapper, index) {
  wrapper.findByDataTest('ec-currency-input__currencies').trigger('mousedown');
  wrapper.findByDataTest('ec-currency-input__currencies').trigger('focus');
  wrapper.findByDataTest(`ec-dropdown-search__item--${index}`).trigger('click');
  await wrapper.vm.$nextTick();
}
