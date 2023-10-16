import { action } from '@storybook/addon-actions';
import { reactive, toRefs } from 'vue';

import EcAmountInput from './ec-amount-input.vue';

export default {
  title: 'Input Amount',
  component: EcAmountInput,
  argTypes: {
    locale: {
      options: ['en', 'es', 'de-ch', 'jp', 'sv'],
      control: { type: 'select' },
    },
    currency: {
      options: ['GBP', 'EUR', 'JPY', 'INR', 'USD', 'CAD'],
      control: { type: 'select' },
    },
  },
};

const Template = storyArgs => ({
  components: { EcAmountInput },
  setup() {
    const { modelValue: model, ...rest } = toRefs(storyArgs);
    const args = reactive(rest);

    function getModelType() {
      return typeof model.value;
    }

    return {
      args,
      model,
      getModelType,
      onChange: action('change'),
      onInput: action('input'),
    };
  },
  template: `
    <div class="tw-p-24">
      <div>
        <ec-amount-input v-bind="args" v-on="{ change: onChange, input: onInput }" v-model="model" />
      </div>
      <div class="tw-mt-24">The input value: {{ model }} (type: {{ getModelType() }})</div>
    </div>
  `,
});

export const basic = Template.bind({});
basic.args = {
  isMasked: false,
  locale: 'en',
  currency: 'GBP',
  label: 'Amount input',
  modelValue: '',
  isSensitive: false,
};

basic.parameters = {
  visualRegressionTests: {
    controls: {
      'with-value': { modelValue: '1234567.89' },
      'with-masked-value': { modelValue: '1234567.89', isMasked: true },
      'locale-with-no-decimals': { modelValue: '1234567.89', locale: 'de-ch', currency: 'JPY' },
    },
  },
};
