import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
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
          { text: 'Yes', value: 'yes', disabled: false },
          { text: 'No', value: 'no', disabled: false },
        ]),
      },
    },
    methods: {
      onChange: action('Changed'),
    },
    template: `
      <ec-button-group class="tw-m-16" v-model="value" :items="items" @change="onChange" />
    `,
  }), {
    visualRegressionTests: { enabled: false },
  })
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
        ],
      };
    },
    template: `
      <div class="tw-grid-container">
        <div class="tw-grid">
          <div class="tw-col-6" v-for="(btnGroup, index) in list" :key="index">
            <h3>{{ btnGroup.title }}</h3>
            <ec-button-group v-model="btnGroup.value" :items="btnGroup.items" />
            Value: {{ btnGroup.value }}
          </div>
        </div>
      </div>
    `,
  }));
