import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';
import { ref } from 'vue';

import EcAmountFilterInput from './ec-amount-filter-input.vue';
import type { AmountFilterInputModel } from './types';

const meta: Meta = {
  title: 'Filters/Amount Filter Input',
  component: EcAmountFilterInput,
  argTypes: {
    locale: {
      options: ['en', 'es', 'de-ch', 'jp', 'sv'],
      control: { type: 'select' },
    },
  },
};

export default meta;

const Template: StoryFn<typeof EcAmountFilterInput> = args => ({
  components: {
    EcAmountFilterInput,
  },
  setup() {
    const value = ref<AmountFilterInputModel>({
      comparisonSymbol: {
        text: 'Equal to',
        value: '=',
      },
    });

    return {
      args,
      value,
      onOpen: action('open'),
      onClose: action('close'),
      onChange: action('change'),
      onAmountChange: action('amount-change'),
      onComparisonSymbolChange: action('comparison-symbol-change'),
    };
  },
  template: `
    <div class="tw-my-64 tw-mx-auto tw-max-w-screen-sm">
      <ec-amount-filter-input
        v-bind="args"
        v-on="{
          open: onOpen,
          close: onClose,
          change: onChange,
          'amount-change': onAmountChange,
          'comparison-symbol-change': onComparisonSymbolChange,
        }"
        v-model="value"
      />
    </div>
  `,
});

export const basic = Template.bind({});

basic.args = {
  label: 'Amount Filter Input',
  note: 'With note',
  bottomNote: 'Filter by less than, equal to or more than the set amount',
  isWarning: false,
  warningTooltipMessage: 'Filtering for negative amounts will show no results',
  errorMessage: '',
  errorTooltipMessage: 'A random error tooltip message',
  comparisonSymbolItems: [
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
