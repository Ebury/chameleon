import { storiesOf } from '@storybook/vue';
import { object } from '@storybook/addon-knobs';
import EcButtonGroup from './ec-button-group.vue';

const stories = storiesOf('Button Group', module);

stories
  .add('basic', () => ({
    components: { EcButtonGroup },
    data() {
      return {
        value: 'yes',
      };
    },
    props: {
      items: {
        default: object('Items', [
          { text: 'Yes', value: 'yes', disabled: true },
          { text: 'No', value: 'no' },
        ]),
      },
    },
    template: `
      <ec-button-group class="ec-m--16 v-model="value" :items="items" />
    `,
  }))
  .add('all', () => ({
    components: { EcButtonGroup },
    data() {
      return {
        list: [
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
            value: 'yes',
            title: 'More than 2 options with disabled options',
            items: [
              { text: 'No', value: 'no', disabled: true },
              { text: 'Yes', value: 'yes' },
              { text: 'Maybe', value: 'maybe' },
              { text: 'No', value: 'random', disabled: true },
              { text: 'No', value: 'random2', disabled: true },
            ],
          },
        ],
      };
    },
    template: `
    <div class="ec-grid ec-grid__row">
      <div class="ec-col-6 ec-p--16" v-for="(btnGroup, index) in list" :key="index">
        <h3>{{ btnGroup.title }}</h3>
        <ec-button-group v-model="btnGroup.value" :items="btnGroup.items" />
        Value: {{ btnGroup.value }}
      </div>
    </div>
    `,
  }));
