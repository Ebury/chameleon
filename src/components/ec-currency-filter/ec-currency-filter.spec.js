import { mount, createLocalVue } from '@vue/test-utils';
import EcCurrencyFilter from './ec-currency-filter.vue';
import { withMockedConsole } from '../../../tests/utils/console';

const currencyItems = [{
  value: 'GBP',
  text: 'GBP',
}, {
  value: 'EUR',
  text: 'EUR',
}, {
  value: 'JPY',
  text: 'JPY',
}, {
  value: 'CAD',
  text: 'CAD',
}, {
  value: 'USD',
  text: 'USD',
}];

const comparisonSymbolItems = [{
  text: 'More than',
  value: '>',
}, {
  text: 'Equal to',
  value: '=',
}, {
  text: 'Less than',
  value: '<',
}];

describe('EcCurrencyFilter', () => {
  function mountEcCurrencyFilter(props, mountOpts) {
    return mount(EcCurrencyFilter, {
      propsData: {
        label: 'Price',
        currencyItems,
        comparisonSymbolItems,
        ...props,
      },
      ...mountOpts,
    });
  }

  function mountEcCurrencyFilterAsTemplate(template, props, wrapperComponentOpts, mountOpts) {
    const localVue = createLocalVue();

    const Component = localVue.extend({
      components: { EcCurrencyFilter },
      template,
      ...wrapperComponentOpts,
    });

    return mount(Component, {
      propsData: {
        ...props,
      },
      localVue,
      ...mountOpts,
    });
  }

  it('should render correctly', () => {
    const wrapper = mountEcCurrencyFilter();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should throw an error if required props are not given', () => {
    withMockedConsole((errorSpy) => {
      mountEcCurrencyFilter({}, {
        propsData: {},
      });
      expect(errorSpy).toHaveBeenCalledTimes(3);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "label"');
      expect(errorSpy.mock.calls[1][0]).toContain('Missing required prop: "currencyItems"');
      expect(errorSpy.mock.calls[2][0]).toContain('Missing required prop: "comparisonSymbolItems"');
    });
  });

  it('should preselect given filters from the value prop', () => {
    const wrapper = mountEcCurrencyFilter({
      value: {
        currencies: [
          currencyItems[1],
          currencyItems[3],
        ],
        amount: 1234,
        comparisonSymbol: comparisonSymbolItems[1],
      },
    });

    expect(wrapper.findByDataTest('ec-submenu__panel-0').element).toMatchSnapshot();
    expect(wrapper.findByDataTest('ec-submenu__panel-1').element).toMatchSnapshot();
  });

  it('should count every selected currency in numberOfSelectedFilters', () => {
    const wrapper = mountEcCurrencyFilter({
      value: {
        currencies: [
          currencyItems[1],
          currencyItems[3],
        ],
      },
    });

    expect(wrapper.findByDataTest('ec-filter-popover__trigger').element).toMatchSnapshot();
  });

  it('should count the amount as 1 in numberOfSelectedFilters', () => {
    const wrapper = mountEcCurrencyFilter({
      value: {
        amount: 1234,
        comparisonSymbol: comparisonSymbolItems[1],
      },
    });

    expect(wrapper.findByDataTest('ec-filter-popover__trigger').element).toMatchSnapshot();
  });

  it('should count every selected currency and the amount together in numberOfSelectedFilters', () => {
    const wrapper = mountEcCurrencyFilter({
      value: {
        currencies: [
          currencyItems[1],
          currencyItems[3],
        ],
        amount: 1234,
        comparisonSymbol: comparisonSymbolItems[1],
      },
    });

    expect(wrapper.findByDataTest('ec-filter-popover__trigger').element).toMatchSnapshot();
  });

  it('should render all given custom texts for currency tab', () => {
    const wrapper = mountEcCurrencyFilter({
      currencyTabHeaderText: 'Custom Currency tab text',
      selectAllCurrenciesText: 'Custom Select all text',
    });
    expect(wrapper.findByDataTest('ec-submenu__header-title-0').element).toMatchSnapshot();
    expect(wrapper.findByDataTest('ec-multiple-values-selection__select-all').element).toMatchSnapshot();
  });

  it('should render all given custom texts for amount tab', async () => {
    const wrapper = mountEcCurrencyFilter({
      amountTabHeaderText: 'Custom Amount tab text',
      amountPlaceholder: 'Custom placeholder text',
      clearAmountText: 'Custom clear amount text',
    });

    await wrapper.findByDataTest('ec-submenu__header-title-1').trigger('click');

    expect(wrapper.findByDataTest('ec-submenu__header-title-1').element).toMatchSnapshot();
    expect(wrapper.findByDataTest('ec-amount-filter-input__amount').element).toMatchSnapshot();
    expect(wrapper.findByDataTest('ec-currency-filter__clear-amount').element).toMatchSnapshot();
  });

  it('should pass down props required by ec-amount-filter-input', () => {
    const wrapper = mountEcCurrencyFilter({
      locale: 'es',
      isSensitive: true,
      errorMessage: 'Random validation error',
      value: {
        amount: 1234.56,
      },
    });

    expect(wrapper.findByDataTest('ec-amount-filter-input').element).toMatchSnapshot();
    expect(wrapper.findByDataTest('ec-amount-filter-input__amount').element.value).toBe('1.234,56');
  });

  it('should render currencies tab in loading state when isLoadingCurrencies is set', () => {
    const wrapper = mountEcCurrencyFilter({
      isLoadingCurrencies: true,
    });
    expect(wrapper.findByDataTest('ec-submenu__panel-0').element).toMatchSnapshot();
  });

  it('should render currencies tab in error state when currenciesErrorMessage is set', () => {
    const wrapper = mountEcCurrencyFilter({
      currenciesErrorMessage: 'Random error message',
    });
    expect(wrapper.findByDataTest('ec-submenu__panel-0').element).toMatchSnapshot();
  });

  it('should render currencies tab in empty state when currenciesEmptyMessage is set', () => {
    const wrapper = mountEcCurrencyFilter({
      currenciesEmptyMessage: 'Random no items message',
    });
    expect(wrapper.findByDataTest('ec-submenu__panel-0').element).toMatchSnapshot();
  });

  it('should disable clear amount button if the amount is empty', () => {
    const wrapper = mountEcCurrencyFilter({
      value: {
        amount: null,
      },
    });

    expect(wrapper.findByDataTest('ec-currency-filter__clear-amount').element).toMatchSnapshot();
  });

  it('should enable clear amount button if the amount is not empty', () => {
    const wrapper = mountEcCurrencyFilter({
      value: {
        amount: 1234,
      },
    });

    expect(wrapper.findByDataTest('ec-currency-filter__clear-amount').element).toMatchSnapshot();
  });

  describe('v-model', () => {
    it('should update v-model every time a currency is selected', async () => {
      const wrapper = mountEcCurrencyFilterAsTemplate(
        '<ec-currency-filter label="Price" :currencyItems="currencyItems" :comparisonSymbolItems="comparisonSymbolItems" v-model="value"></ec-currency-filter>',
        {},
        {
          data() {
            return {
              currencyItems,
              comparisonSymbolItems,
              value: {
                amount: null, comparisonSymbol: null, currencies: [],
              },
            };
          },
        },
      );

      await selectCurrency(wrapper, 0);
      expect(wrapper.findByDataTest('ec-submenu__panel-0').element).toMatchSnapshot();
      expect(wrapper.vm.value).toEqual({
        amount: null,
        comparisonSymbol: null,
        currencies: [{ text: 'GBP', value: 'GBP' }],
      });

      await selectCurrency(wrapper, 0);
      expect(wrapper.findByDataTest('ec-submenu__panel-0').element).toMatchSnapshot();
      expect(wrapper.vm.value).toEqual({
        amount: null,
        comparisonSymbol: null,
        currencies: [{ text: 'GBP', value: 'GBP' }, { text: 'EUR', value: 'EUR' }],
      });
    });

    it('should update v-model every time a currency is deselected', async () => {
      const wrapper = mountEcCurrencyFilterAsTemplate(
        '<ec-currency-filter label="Price" :currencyItems="currencyItems" :comparisonSymbolItems="comparisonSymbolItems" v-model="value"></ec-currency-filter>',
        {},
        {
          data() {
            return {
              currencyItems,
              comparisonSymbolItems,
              value: {
                amount: null,
                comparisonSymbol: null,
                currencies: [
                  { text: 'GBP', value: 'GBP' },
                  { text: 'EUR', value: 'EUR' },
                ],
              },
            };
          },
        },
      );

      await deselectCurrency(wrapper, 0);
      expect(wrapper.findByDataTest('ec-submenu__panel-0').element).toMatchSnapshot();
      expect(wrapper.vm.value).toEqual({
        amount: null,
        comparisonSymbol: null,
        currencies: [{ text: 'EUR', value: 'EUR' }],
      });

      await deselectCurrency(wrapper, 0);
      expect(wrapper.findByDataTest('ec-submenu__panel-0').element).toMatchSnapshot();
      expect(wrapper.vm.value).toEqual({
        amount: null,
        comparisonSymbol: null,
        currencies: [],
      });
    });

    it('should update v-model if select all checkbox is clicked', async () => {
      const wrapper = mountEcCurrencyFilterAsTemplate(
        '<ec-currency-filter label="Price" :currencyItems="currencyItems" :comparisonSymbolItems="comparisonSymbolItems" v-model="value"></ec-currency-filter>',
        {},
        {
          data() {
            return {
              currencyItems,
              comparisonSymbolItems,
              value: {
                amount: null, comparisonSymbol: null, currencies: [],
              },
            };
          },
        },
      );

      await selectAll(wrapper);
      expect(wrapper.findByDataTest('ec-submenu__panel-0').element).toMatchSnapshot('after select all');
      expect(wrapper.vm.value).toEqual({
        amount: null,
        comparisonSymbol: null,
        currencies: currencyItems,
      });

      await selectAll(wrapper);
      expect(wrapper.findByDataTest('ec-submenu__panel-0').element).toMatchSnapshot('after deselect all');
      expect(wrapper.vm.value).toEqual({
        amount: null,
        comparisonSymbol: null,
        currencies: [],
      });
    });

    it('should not update the v-model if a comparison symbol is selected until the amount is not empty', async () => {
      const wrapper = mountEcCurrencyFilterAsTemplate(
        '<ec-currency-filter label="Price" :currencyItems="currencyItems" :comparisonSymbolItems="comparisonSymbolItems" v-model="value"></ec-currency-filter>',
        {},
        {
          data() {
            return {
              currencyItems,
              comparisonSymbolItems,
              value: {
                amount: null, comparisonSymbol: comparisonSymbolItems[0], currencies: [],
              },
            };
          },
        },
      );

      await selectAmountTab(wrapper);
      await selectComparisonSymbol(wrapper, 2);

      expect(wrapper.vm.value).toEqual({
        amount: null,
        comparisonSymbol: comparisonSymbolItems[0],
        currencies: [],
      });

      await setAmount(wrapper, '1234');
      expect(wrapper.vm.value).toEqual({
        amount: 1234,
        comparisonSymbol: comparisonSymbolItems[2],
        currencies: [],
      });

      await selectComparisonSymbol(wrapper, 1);
      expect(wrapper.vm.value).toEqual({
        amount: 1234,
        comparisonSymbol: comparisonSymbolItems[1],
        currencies: [],
      });
    });

    it('should update the v-model if the amount is cleared by the user', async () => {
      const wrapper = mountEcCurrencyFilterAsTemplate(
        '<ec-currency-filter label="Price" :currencyItems="currencyItems" :comparisonSymbolItems="comparisonSymbolItems" v-model="value"></ec-currency-filter>',
        {},
        {
          data() {
            return {
              currencyItems,
              comparisonSymbolItems,
              value: {
                amount: null, comparisonSymbol: comparisonSymbolItems[0], currencies: [],
              },
            };
          },
        },
      );

      await selectAmountTab(wrapper);
      await selectComparisonSymbol(wrapper, 0);
      await setAmount(wrapper, '1234');
      expect(wrapper.vm.value).toEqual({
        amount: 1234,
        comparisonSymbol: comparisonSymbolItems[0],
        currencies: [],
      });

      await setAmount(wrapper, '');
      expect(wrapper.vm.value).toEqual({
        amount: null,
        comparisonSymbol: comparisonSymbolItems[0],
        currencies: [],
      });
    });

    it('should clear the amount and comparison symbol when the clear amount button is clicked', async () => {
      const wrapper = mountEcCurrencyFilterAsTemplate(
        '<ec-currency-filter label="Price" :currencyItems="currencyItems" :comparisonSymbolItems="comparisonSymbolItems" v-model="value"></ec-currency-filter>',
        {},
        {
          data() {
            return {
              currencyItems,
              comparisonSymbolItems,
              value: {
                amount: 1234,
                comparisonSymbol: comparisonSymbolItems[0],
                currencies: [
                  { text: 'GBP', value: 'GBP' },
                ],
              },
            };
          },
        },
      );

      await wrapper.findByDataTest('ec-currency-filter__clear-amount').trigger('click');
      expect(wrapper.vm.value).toEqual({
        amount: null,
        comparisonSymbol: null,
        currencies: [
          { text: 'GBP', value: 'GBP' },
        ],
      });
      expect(wrapper.findByDataTest('ec-submenu__panel-1').element).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-amount-input').element.value).toBe('');
    });
  });
});

async function selectCurrency(wrapper, index) {
  await wrapper.findByDataTest(`ec-multiple-values-selection__checkbox-select-${index}`).findByDataTest('ec-checkbox__label').trigger('click');
}

async function deselectCurrency(wrapper, index) {
  await wrapper.findByDataTest(`ec-multiple-values-selection__checkbox-deselect-${index}`).findByDataTest('ec-checkbox__label').trigger('click');
}

async function selectAll(wrapper) {
  await wrapper.findByDataTest('ec-multiple-values-selection__select-all').findByDataTest('ec-checkbox__label').trigger('click');
}

async function selectTab(wrapper, index) {
  await wrapper.findByDataTest(`ec-submenu__header-title-${index}`).trigger('click');
}

async function selectAmountTab(wrapper) {
  await selectTab(wrapper, 1);
}

async function selectComparisonSymbol(wrapper, index) {
  await wrapper.findByDataTest(`ec-dropdown-search__item--${index}`).trigger('click');
}

async function setAmount(wrapper, amount) {
  await wrapper.findByDataTest('ec-amount-input').setValue(amount);
  await wrapper.findByDataTest('ec-amount-input').trigger('change');
}
