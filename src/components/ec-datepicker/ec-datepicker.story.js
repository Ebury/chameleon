import { action } from '@storybook/addon-actions';
import { Spanish } from 'flatpickr/dist/l10n/es';
import { French } from 'flatpickr/dist/l10n/fr';

import EcDatepicker from './ec-datepicker.vue';

export default {
  title: 'Datepicker',
  component: EcDatepicker,
  argTypes: {
    locale: {
      options: ['none', 'ES', 'FR'],
      control: { type: 'select' },
    },
    dateFormat: {
      options: ['none', 'd/m/Y', 'd.m.Y', 'd-m-Y', 'j-n-Y', 'Y年n月j日'],
      control: { type: 'select' },
    },
  },
};

export const basic = args => ({
  components: { EcDatepicker },
  setup() {
    return {
      args,
    };
  },
  data() {
    return {
      model: new Date('2022-02-24'),
      disableWeekends: false,
      notAvailableDates: {
        '2022-02-21': 'Bank holiday',
      },
    };
  },
  methods: {
    toggleWeekendAvailability() {
      this.disableWeekends = !this.disableWeekends;
    },
    changeDisabledDates(date) {
      this.notAvailableDates = {
        [date]: 'Bank holiday',
      };
    },
    onReady: action('ready'),
    onOpen: action('open'),
    onClose: action('close'),
    onChange: action('change'),
    onBlur: action('blur'),
    getLocale(locale) {
      switch (locale) {
        case 'FR':
          return French;
        case 'ES':
          return Spanish;
        default:
          return null;
      }
    },
    getDateFormat(dateFormat) {
      if (dateFormat === 'none') {
        return undefined;
      }
      return dateFormat;
    },
  },
  template: `
    <div class="tw-my-64 tw-mx-auto tw-max-w-screen-sm">
      <ec-datepicker
        v-bind="{
          ...args,
          locale: getLocale(args.locale),
          dateFormat: getDateFormat(args.dateFormat),
        }"
        v-model="model"
        :are-weekends-disabled="disableWeekends"
        :disabled-dates="notAvailableDates"
        v-on="{
          ready: onReady,
          open: onOpen,
          close: onClose,
          change: onChange,
          blur: onBlur,
        }"
      />

      <p class="tw-mt-48">Value: {{ model }}</p>

      <button @click="toggleWeekendAvailability">Toggle weekend availability</button>
      <button @click="changeDisabledDates('2022-02-22')">Disable 2022-02-22 UTC</button>
      <button @click="model = new Date(2022, 1, 25)">Select 2022-02-25 date</button>
    </div>
  `,
});

basic.args = {
  label: 'Datepicker',
  placeholder: 'Choose a date...',
  options: {
    minDate: '2022-01-10',
    maxDate: '2022-03-10',
  },
};
