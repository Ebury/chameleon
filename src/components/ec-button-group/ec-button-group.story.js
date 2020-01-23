import { storiesOf } from '@storybook/vue';
import { object } from '@storybook/addon-knobs';
import EcButtonGroup from './ec-button-group.vue';

const stories = storiesOf('Button Group', module);

stories
  .add('basic', () => ({
    components: { EcButtonGroup },
    data() {
      return {
        value: 'si',
      };
    },
    props: {
      items: {
        default: object('Items', [
          { text: 'Yes', value: 'si', disabled: true },
          { text: 'No', value: 'dsa' },
        ]),
      },
    },
    template: `
      <ec-button-group v-model="value" :items="items" />
    `,
  }));
