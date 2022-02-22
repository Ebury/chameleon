import { action } from '@storybook/addon-actions';
import EcDatepicker from './ec-datepicker.vue';

export default {
  title: 'Datepicker',
  component: EcDatepicker,
};

export const basic = (args, { argTypes }) => ({
  components: { EcDatepicker },
  props: Object.keys(argTypes),
  data() {
    return {
      model: '2022-02-06',
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
  },
  template: `
    <div class="tw-my-64 tw-mx-auto tw-max-w-screen-sm">
      <ec-datepicker
        v-bind="$props"
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

      <button @click="toggleWeekendAvailability">Disable weekends</button>
      <button @click="changeDisabledDates('2022-02-22')">Disable 2022-02-22</button>
    </div>
  `,
});

basic.args = {
  label: 'Datepicker',
  placeholder: 'Choose a date...',
  options: {
    // minDate: '2022-02-10',
    // maxDate: '2022-03-10',
  },
};
