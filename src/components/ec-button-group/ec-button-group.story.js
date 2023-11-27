import { action } from '@storybook/addon-actions';
import { ref } from 'vue';

import EcButtonGroup from './ec-button-group.vue';

export default {
  title: 'Button Group',
  component: EcButtonGroup,
};

const Template = args => ({
  components: { EcButtonGroup },
  setup() {
    const model = ref('yes');
    return {
      args,
      model,
      onChange: action('change'),
    };
  },
  template: `
    <ec-button-group
      class="tw-m-16"
      v-bind="args"
      v-on="{ change: onChange }"
      v-model="model"
    />
  `,
});

export const basic = Template.bind({});

basic.args = {
  items: [
    { text: 'Yes', value: 'yes', disabled: false },
    { text: 'No', value: 'no', disabled: false },
  ],
};

basic.parameters = {
  visualRegressionTests: { disable: true },
};

export const all = args => ({
  components: { EcButtonGroup },
  setup() {
    const list = ref([
      {
        value: 'yes',
        title: 'Two options',
        items: [
          { text: 'Yes', value: 'yes' },
          { text: 'No', value: 'no' },
        ],
      },
      {
        value: true,
        title: 'Two options with boolean',
        items: [
          { text: 'Yes', value: true },
          { text: 'No', value: false },
        ],
      },
      {
        value: 2,
        title: 'Two options with numbers',
        items: [
          { text: 'Yes', value: 1 },
          { text: 'No', value: 2 },
        ],
      },
      {
        value: 'yes',
        title: 'One option disabled',
        items: [
          { text: 'Yes', value: 'yes' },
          { text: 'No', value: 'no', disabled: true },
        ],
      },
      {
        value: 'no',
        title: 'More than 2 options',
        items: [
          { text: 'Yes', value: 'yes' },
          { text: 'No', value: 'no' },
          { text: 'Maybe', value: 'maybe' },
        ],
      },
      {
        value: '2nd',
        title: 'More than 2 options with disabled options',
        items: [
          { text: 'First', value: '1st', disabled: true },
          { text: 'Second', value: '2nd' },
          { text: 'Third', value: '3rd' },
          { text: 'Fourth', value: '4th', disabled: true },
          { text: 'Fifth', value: '5th', disabled: true },
        ],
      },
    ]);

    return { args, list };
  },
  template: `
    <div class="tw-flex-grid-container">
      <div class="tw-flex-grid">
        <div v-for="(btnGroup, index) in list" :key="index" class="tw-flex-col-6">
          <h3>{{ btnGroup.title }}</h3>
          <ec-button-group v-model="btnGroup.value" :items="btnGroup.items" />
          Value: {{ btnGroup.value }}
        </div>
      </div>
    </div>
  `,
});

all.parameters = {
  controls: { disable: true },
  actions: { disable: true },
};
