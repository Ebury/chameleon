import { mount, createLocalVue } from '@vue/test-utils';
import EcPhoneNumberInput from './ec-phone-number-input.vue';

const countries = [
  { value: '+44', text: 'United Kingdom', countryCode: 'UK' },
  { value: '+34', text: 'Spain', countryCode: 'ES' },
  { value: '+1658', text: 'Jamaica', countryCode: 'JM' },
];

const countriesModel = [
  {
    value: '+44',
    text: 'United Kingdom+44',
    name: 'United Kingdom',
    countryCode: 'UK',
    id: 'UK',
  },
  {
    value: '+34',
    text: 'Spain+34',
    name: 'Spain',
    countryCode: 'ES',
    id: 'ES',
  },
];

describe('EcPhoneNumberInput', () => {
  function mountPhoneNumberInput(props) {
    return mount(EcPhoneNumberInput, {
      propsData: {
        countries,
        value: {},
        ...props,
      },
    });
  }

  function mountPhoneNumberInputAsTemplate(template, props, wrapperComponentOpts, mountOpts) {
    const localVue = createLocalVue();

    const Component = localVue.extend({
      components: { EcPhoneNumberInput },
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
    const wrapper = mountPhoneNumberInput();

    expect(wrapper.element).toMatchSnapshot();
  });

  describe(':props', () => {
    it('should render with a label', () => {
      const wrapper = mountPhoneNumberInput({ label: 'Phone number input label' });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with a note', () => {
      const wrapper = mountPhoneNumberInput({ note: 'Phone number input note' });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with a bottom note', () => {
      const wrapper = mountPhoneNumberInput({ bottomNote: 'Phone number input bottom note' });

      expect(wrapper.findByDataTest('ec-phone-number-input__bottom-note').element).toMatchSnapshot();
    });

    it('should render with a warning', () => {
      const wrapper = mountPhoneNumberInput({
        bottomNote: 'Phone number input bottom note',
        isWarning: true,
      });

      expect(wrapper.findByDataTest('ec-phone-number-input__bottom-note').element).toMatchSnapshot();
    });

    it('should render with a warning tooltip', () => {
      const warningTooltipMessage = 'Warning tooltip message';
      const wrapper = mountPhoneNumberInput({
        bottomNote: 'Phone number input bottom note',
        isWarning: true,
        warningTooltipMessage,
      });

      expect(wrapper.findByDataTest('ec-phone-number-input__bottom-note').element).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-phone-number-input__warning-tooltip').attributes('data-ec-tooltip-mock-content')).toBe(warningTooltipMessage);
    });

    it('should render with an error message', () => {
      const wrapper = mountPhoneNumberInput({
        bottomNote: 'Phone number input bottom note',
        errorMessage: 'Random error message',
      });

      expect(wrapper.findByDataTest('ec-phone-number-input__bottom-note').exists()).toBeFalsy();
      expect(wrapper.findByDataTest('ec-phone-number-input__error-text').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with an error tooltip', () => {
      const errorTooltipMessage = 'Error tooltip message';

      const wrapper = mountPhoneNumberInput({
        bottomNote: 'Phone number input bottom note',
        errorMessage: 'Random error message',
        errorTooltipMessage,
      });

      expect(wrapper.findByDataTest('ec-phone-number-input__bottom-note').element).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-phone-number-input__error-tooltip').attributes('data-ec-tooltip-mock-content')).toBe(errorTooltipMessage);
    });

    it('should render in a loading state', () => {
      const wrapper = mountPhoneNumberInput({ areCountriesLoading: true });

      expect(wrapper.findByDataTest('ec-popover-dropdown-search').element).toMatchSnapshot();
    });

    it('should render in a disabled state', () => {
      const wrapper = mountPhoneNumberInput({ isDisabled: true });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with a disabled tooltip message', () => {
      const disabledTooltipMessage = 'Disabled tooltip message';
      const wrapper = mountPhoneNumberInput({
        isDisabled: true,
        disabledTooltipMessage,
      });

      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-phone-number-input__input-group').attributes('data-ec-tooltip-mock-content')).toBe(disabledTooltipMessage);
    });

    it('should render with a sensitive class when isSensitive prop is set to true', () => {
      const wrapper = mountPhoneNumberInput({ isSensitive: true });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with a country placeholder', () => {
      const countryPlaceholder = '+44';
      const wrapper = mountPhoneNumberInput({ countryPlaceholder });

      expect(wrapper.findByDataTest('ec-phone-number-input__countries').attributes('placeholder')).toBe(countryPlaceholder);
    });

    it('should render with a number placeholder', () => {
      const numberPlaceholder = '518545455';
      const wrapper = mountPhoneNumberInput({ numberPlaceholder });

      expect(wrapper.findByDataTest('ec-phone-number-input__number').attributes('placeholder')).toBe(numberPlaceholder);
    });

    it('should render with a search field', async () => {
      const wrapper = mountPhoneNumberInput({ isSearchEnabled: true });

      await wrapper.findByDataTest('ec-phone-number-input__countries').trigger('mousedown');

      expect(wrapper.findByDataTest('ec-dropdown-search__search-input').element).toMatchSnapshot();
    });

    it('should accept a custom search field text', async () => {
      const wrapper = mountPhoneNumberInput({
        isSearchEnabled: true,
        searchCountryPlaceholder: 'Search calling code',
      });

      await wrapper.findByDataTest('ec-phone-number-input__countries').trigger('mousedown');

      expect(wrapper.findByDataTest('ec-dropdown-search__search-input').element).toMatchSnapshot();
    });

    it('should accept a custom "no countries" search result text', async () => {
      const wrapper = mountPhoneNumberInput({
        isSearchEnabled: true,
        searchCountryPlaceholder: 'Search calling code',
        noCountriesText: 'No country found',
      });

      await wrapper.findByDataTest('ec-phone-number-input__countries').trigger('mousedown');
      await wrapper.findByDataTest('ec-dropdown-search__search-input').setValue('Norway');

      expect(wrapper.findByDataTest('ec-dropdown-search__item-list').element).toMatchSnapshot();
    });
  });

  describe('@events', () => {
    it('should emit change events when an item is selected', async () => {
      const wrapper = mountPhoneNumberInput();

      await selectItem(wrapper, 1);
      expect(wrapper.emitted('change').length).toEqual(1);
      expect(wrapper.emitted('focus').length).toEqual(1);
      expect(wrapper.emitted('value-change').length).toEqual(1);
      expect(wrapper.emitted('country-change').length).toEqual(1);
      await selectItem(wrapper, 2);
      expect(wrapper.emitted('change').length).toEqual(2);
      expect(wrapper.emitted('focus').length).toEqual(2);
      expect(wrapper.emitted('value-change').length).toEqual(2);
      expect(wrapper.emitted('country-change').length).toEqual(2);
    });

    it('should emit value-change event when number is set', async () => {
      const wrapper = mountPhoneNumberInput();

      await wrapper.findByDataTest('ec-phone-number-input__number').setValue('11');
      await wrapper.findByDataTest('ec-phone-number-input__number').trigger('change');
      expect(wrapper.emitted('change').length).toEqual(1);
      expect(wrapper.emitted('number-change').length).toEqual(1);
      expect(wrapper.emitted('value-change').length).toEqual(1);

      await wrapper.findByDataTest('ec-phone-number-input__number').setValue('111');
      await wrapper.findByDataTest('ec-phone-number-input__number').trigger('change');
      expect(wrapper.emitted('change').length).toEqual(2);
      expect(wrapper.emitted('number-change').length).toEqual(2);
      expect(wrapper.emitted('value-change').length).toEqual(2);
    });
  });

  describe('v-model', () => {
    it('should use the v-model with the country and emit the changes', async () => {
      const wrapper = mountPhoneNumberInputAsTemplate(
        '<ec-phone-number-input :countries="countries" v-model="value" />',
        {},
        {
          data() {
            return {
              countries,
              value: {
                country: '',
                number: '0',
              },
            };
          },
        },
      );

      await selectItem(wrapper, 0);
      expect(wrapper.vm.value.country).toEqual(countriesModel[0]);
      await selectItem(wrapper, 1);
      expect(wrapper.vm.value.country).toEqual(countriesModel[1]);
    });
  });

  it('should preselect the country item in the dropdown and the number in the input from the v-model', () => {
    const wrapper = mountPhoneNumberInputAsTemplate(
      '<ec-phone-number-input :countries="countries" v-model="value" />',
      {},
      {
        data() {
          return {
            countries,
            value: {
              country: countriesModel[1],
              number: '123456789',
            },
          };
        },
      },
    );

    expect(wrapper.findByDataTest('ec-phone-number-input__countries').element.value).toBe(countriesModel[1].value);
    expect(wrapper.findByDataTest('ec-phone-number-input__number').element.value).toBe('123456789');
  });

  it('should preselect the country item in the dropdown and the number in the input from the v-model AND obfuscate them when disabled', () => {
    const wrapper = mountPhoneNumberInputAsTemplate(
      '<ec-phone-number-input :is-disabled="true" :countries="countries" v-model="value" />',
      {},
      {
        data() {
          return {
            countries,
            value: {
              country: countriesModel[1],
              number: '123456789',
            },
          };
        },
      },
    );

    expect(wrapper.findByDataTest('ec-phone-number-input__countries').element.value).toBe(countriesModel[1].value);
    expect(wrapper.findByDataTest('ec-phone-number-input__number').element.value).toBe('******789');
  });

  it('should use the v-model with the number and emit the changes', async () => {
    const wrapper = mountPhoneNumberInputAsTemplate(
      '<ec-phone-number-input :countries="countries" v-model="value" />',
      {},
      {
        data() {
          return { countries, value: { number: 0 } };
        },
      },
    );

    await wrapper.findByDataTest('ec-phone-number-input__number').setValue('11');
    expect(wrapper.vm.value.number).toEqual('11');
  });
});

async function selectItem(wrapper, index) {
  wrapper.findByDataTest('ec-phone-number-input__countries').trigger('mousedown');
  wrapper.findByDataTest('ec-phone-number-input__countries').trigger('focus');
  wrapper.findByDataTest(`ec-dropdown-search__item--${index}`).trigger('click');
  await wrapper.vm.$nextTick();
}
