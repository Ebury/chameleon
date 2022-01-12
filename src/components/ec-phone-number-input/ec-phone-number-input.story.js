import { action } from '@storybook/addon-actions';
import EcPhoneNumberInput from './ec-phone-number-input.vue';

export default {
  title: 'Phone Number Input',
  component: EcPhoneNumberInput,
};

export const basic = (args, { argTypes }) => ({
  components: { EcPhoneNumberInput },
  props: Object.keys(argTypes),
  data() {
    return {
      model: {},
    };
  },
  methods: {
    onChange: action('change'),
    onFocus: action('focus'),
    onOpen: action('open'),
    onNumberChange: action('number-change'),
    onCountryChange: action('country-change'),
  },
  template: `
    <div class="tw-my-64 tw-mx-auto tw-max-w-screen-sm">
      <ec-phone-number-input
        v-bind="$props"
        v-on="{
          change: onChange,
          focus: onFocus,
          open: onOpen,
          'number-change': onNumberChange,
          'country-change': onCountryChange
        }"
        v-model="model"
      >
        <template #bottomCTA>
          <a href="#" @click.prevent.stop class="tw-small-text">Change number</a>
        </template>
      </ec-phone-number-input>

      <p>Value: {{ model }}</p>
    </div>
  `,
});

basic.args = {
  label: 'Phone number input',
  note: 'Select country and set number',
  bottomNote: 'Phone number can be up to 14 characters',
  countries: [
    { value: '+44', text: 'United Kingdom', countryCode: 'GB' },
    { value: '+34', text: 'Spain', countryCode: 'ES' },
    { value: '+1658', text: 'Jamaica', countryCode: 'JM' },
    { value: '+260', text: 'Zambia', countryCode: 'ZM' },
    { value: '+973', text: 'Bahrain', countryCode: 'BH' },
  ],
};
