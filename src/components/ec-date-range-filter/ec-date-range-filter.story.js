import EcDateRangeFilter from './ec-date-range-filter.vue';

export default {
  title: 'Filters/Date range filter',
  component: EcDateRangeFilter,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EcDateRangeFilter },
  data() {
    return {
      valueFromProps: null,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        this.valueFromProps = newValue;
      },
    },
  },
  methods: {
    clearValues() {
      this.valueFromProps = { from: null, to: null };
    },
  },
  template: `
    <ec-date-range-filter
      class="tw-flex tw-justify-center tw-items-center tw-p-20 tw-m-auto"
      :label="label"
      :from-label-text="fromLabelText"
      :to-label-text="toLabelText"
      :clear-text="clearText"
      :from-error-message="fromErrorMessage"
      :to-error-message="toErrorMessage"
      :date-range-error-message="dateRangeErrorMessage"
      v-model="valueFromProps"
      :popover-options="{ open: true }"
      @clear="clearValues()"
    />
  `,
});

export const basic = Template.bind({});

basic.args = {
  label: 'Due date',
  fromLabelText: 'From',
  toLabelText: 'To',
  clearText: 'Clear dates',
  fromErrorMessage: '',
  toErrorMessage: '',
  dateRangeErrorMessage: '',
  value: { from: '2020-03-14', to: null },
};
