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
    onPhoneNumberChange: action('phone-phone-number-change'),
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
          'phone-number-change': onPhoneNumberChange,
          'country-change': onCountryChange
        }"
        :disabled="isDisabled"
        v-model="model"
      >
        <template #bottomCTA>
          <a href="#" @click.prevent.stop class="tw-small-text">Change number</a>
        </template>
      </ec-phone-number-input>

      <p class="tw-mt-48">Value: {{ model }}</p>
      <button @click="isDisabled=!isDisabled"> Toggle Disabled</button>
    </div>
  `,
});

basic.args = {
  label: 'Phone number input',
  note: 'Select country and set number',
  bottomNote: 'Phone number can be up to 14 characters',
  isDisabled: false,
  countries: [
    { value: '+44', text: 'United Kingdom', countryCode: 'GB' },
    { value: '+34', text: 'Spain', countryCode: 'ES' },
    { value: '+1 658', text: 'Jamaica', countryCode: 'JM' },
    { value: '+260', text: 'Zambia', countryCode: 'ZM' },
    { value: '+973', text: 'Bahrain', countryCode: 'BH' },
    { value: '+201', text: 'New Country', countryCode: 'XX' },
  ],
};
