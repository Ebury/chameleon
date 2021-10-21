import EcAmountFilterInput from './ec-amount-filter-input.vue';

export default {
  title: 'Filters/Amount Filter Input',
  component: EcAmountFilterInput,
  argTypes: {
    locale: {
      control: {
        type: 'select',
        options: ['en', 'es', 'de-ch', 'jp', 'sv'],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    EcAmountFilterInput,
  },
  data() {
    return {
      value: {},
    };
  },
  template: `
  <div class="tw-my-64 tw-mx-auto tw-max-w-screen-sm">
    <ec-amount-filter-input 
      v-model="value"
      :label="label"
      :note="note"
      :amount-placeholder="amountPlaceholder"
      :bottom-note="bottomNote"
      :is-warning="isWarning"
      :warning-tooltip-message="warningTooltipMessage"
      :error-message="errorMessage"
      :error-tooltip-message="errorTooltipMessage"
      :comparison-symbols="comparisonSymbols"
      :clearAmountButtonText="clearAmountButtonText"
    />
  </div>
  `,
});

export const basic = Template.bind({});

basic.args = {
  label: 'Amount Filter Input',
  note: 'With note',
  amountPlaceholder: '',
  bottomNote: 'Filter by less than, equal to or more than the set amount',
  isWarning: false,
  warningTooltipMessage: 'Filtering for negative amounts will show no results',
  errorMessage: '',
  errorTooltipMessage: 'A random error tooltip message',
  clearAmountButtonText: 'Clear amount',
  comparisonSymbols: [
    {
      text: 'More than',
      value: '>',
    },
    {
      text: 'Equal to',
      value: '=',
    },
    {
      text: 'Less than',
      value: '<',
    },
  ],
};
