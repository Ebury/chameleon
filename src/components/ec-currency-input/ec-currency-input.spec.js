import { mount, createLocalVue } from '@vue/test-utils';
import EcCurrencyInput from './ec-currency-input.vue';

describe('EcCurrencyInput', () => {
  const currencies = ['GBP', 'EUR', 'USD', 'JPY'];

  function mountCurrencyInput(props, mountOpts) {
    return mount(EcCurrencyInput, {
      sync: false,
      propsData: {
        currencies,
        value: {},
        ...props,
      },
      stubs: { EcPopover: true },
      ...mountOpts,
    });
  }

  function mountCurrencyInputAsTemplate(template, props, mountOpts) {
    const localVue = createLocalVue();

    const Component = localVue.extend({
      components: { EcCurrencyInput },
      template,
    });

    return mount(Component, {
      sync: false,
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

  describe(':props', () => {
    it('should render the label when the label is given', () => {
      const wrapper = mountCurrencyInput({ label: 'Currency Input' });
      expect(wrapper.findByDataTest('ec-currency-input__label-text').element).toMatchSnapshot();
    });

    it('should render the note when the note is given', () => {
      const wrapper = mountCurrencyInput({ note: 'Random note' });
      expect(wrapper.findByDataTest('ec-currency-input__note').element).toMatchSnapshot();
    });

    it('should render the error when the errorMessage is given', () => {
      const wrapper = mountCurrencyInput({ errorMessage: 'Random message' });

      expect(wrapper.findByDataTest('ec-currency-input__currencies').classes('ec-input-field__input--has-error')).toBe(true);
      expect(wrapper.findByDataTest('ec-currency-input__amount').classes('ec-input-field__input--has-error')).toBe(true);
      expect(wrapper.findByDataTest('ec-currency-input__error-text').element).toMatchSnapshot();
      expect(wrapper.findAllByDataTest('ec-input-field__error-text').length).toBe(0);
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

    it('should render the component with the dropdown disabled when isCurrenciesDisabled is set true', () => {
      const wrapper = mountCurrencyInput({ isCurrenciesDisabled: true });

      expect(wrapper.findByDataTest('ec-currency-input__currencies').element).toMatchSnapshot();
    });

    it('should render the component with the input disabled when isAmountDisabled is set true', () => {
      const wrapper = mountCurrencyInput({ isAmountDisabled: true });

      expect(wrapper.findByDataTest('ec-currency-input__amount').element).toMatchSnapshot();
    });
  });

  describe('@events', () => {
    it('should emit change events when an item is selected', () => {
      const wrapper = mountCurrencyInput();

      selectItem(wrapper, 1);
      expect(wrapper.emitted('change').length).toEqual(1);
      expect(wrapper.emitted('value-change').length).toEqual(1);
      expect(wrapper.emitted('currency-change').length).toEqual(1);
      selectItem(wrapper, 2);
      expect(wrapper.emitted('change').length).toEqual(2);
      expect(wrapper.emitted('value-change').length).toEqual(2);
      expect(wrapper.emitted('currency-change').length).toEqual(2);
    });

    it('should emit value-change event when amount is set', async () => {
      const wrapper = mountCurrencyInput();

      wrapper.findByDataTest('ec-currency-input__amount').setValue('11');
      await wrapper.vm.$nextTick();
      wrapper.findByDataTest('ec-currency-input__amount').trigger('change');
      expect(wrapper.emitted('change').length).toEqual(1);
      expect(wrapper.emitted('amount-change').length).toEqual(1);
      expect(wrapper.emitted('value-change').length).toEqual(1);

      wrapper.findByDataTest('ec-currency-input__amount').setValue('111');
      await wrapper.vm.$nextTick();
      wrapper.findByDataTest('ec-currency-input__amount').trigger('change');
      expect(wrapper.emitted('change').length).toEqual(2);
      expect(wrapper.emitted('amount-change').length).toEqual(2);
      expect(wrapper.emitted('value-change').length).toEqual(2);
    });
  });

  describe('v-model', () => {
    it('should use the v-model with the currency and emit the changes', () => {
      const wrapper = mountCurrencyInputAsTemplate(
        '<ec-currency-input :currencies="currencies" v-model="value" />',
        {},
        {
          data() {
            return { currencies, value: { currency: '', amount: 0 } };
          },
        },
      );

      selectItem(wrapper, 0);
      expect(wrapper.vm.value.currency).toEqual(currencies[0]);
      selectItem(wrapper, 1);
      expect(wrapper.vm.value.currency).toEqual(currencies[1]);
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

      wrapper.findByDataTest('ec-currency-input__amount').setValue('11');
      await wrapper.vm.$nextTick();
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
      selectItem(wrapper, currencies.indexOf('JPY'));
      await wrapper.vm.$nextTick();
      expect(wrapper.findByDataTest('ec-currency-input__amount').element.value).toEqual('11,111');
    });
  });
});

function selectItem(wrapper, index) {
  wrapper.findByDataTest(`ec-dropdown-search__item--${index}`).trigger('click');
}
