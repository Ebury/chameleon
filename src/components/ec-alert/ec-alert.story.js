import { storiesOf } from '@storybook/vue';
import { boolean, text } from '@storybook/addon-knobs';
import EcAlert from './ec-alert.vue';

const stories = storiesOf('Alert', module);

stories.add('basic', () => ({
  components: { EcAlert },
  props: {
    title: {
      default: text('title', 'Error!'),
    },
    subtitle: {
      default: text('subtitle', 'Something was wrong with the update.'),
    },
    type: {
      default: text('type', 'error'),
    },
    textButton: {
      default: text('textButton', 'Read more'),
    },
    dismissable: {
      default: boolean('dismissable', true),
    },
  },
  data() {
    return { show: true };
  },
  template: `
    <div>
    <ec-alert :title="title" :subtitle="subtitle" :type="type" :dismissable="dismissable" :button-text="textButton" v-model="show">
    </ec-alert>

    <button @click="show = !show">{{ show ? 'Hide' : 'Show' }}</button>
    </div>`,
}));

stories.add('all', () => ({
  components: { EcAlert },
  data() {
    return {
      alerts: [
        {
          title: 'Simple Alert',
          data: [
            { title: 'Info Alert', type: 'info' },
            { title: 'Success Alert', type: 'success' },
            { title: 'Warning Alert', type: 'warning' },
            { title: 'Error Alert', type: 'error' },
          ],
        },
        {
          title: 'Dismissable Alert',
          data: [
            {
              title: 'Info Alert', type: 'info', dismissable: true, model: true,
            },
            {
              title: 'Success Alert', type: 'success', dismissable: true, model: true,
            },
            {
              title: 'Warning Alert', type: 'warning', dismissable: true, model: true,
            },
            {
              title: 'Error Alert', type: 'error', dismissable: true, model: true,
            },
          ],
        },
        {
          title: 'Button Alert',
          data: [
            { title: 'Info Alert', type: 'info', 'button-text': 'Click here' },
            { title: 'Success Alert', type: 'success', 'button-text': 'Click here' },
            { title: 'Warning Alert', type: 'warning', 'button-text': 'Click here' },
            { title: 'Error Alert', type: 'error', 'button-text': 'Click here' },
          ],
        },
        {
          title: 'Subtitle Alert',
          data: [
            { title: 'Info Alert', type: 'info', subtitle: 'subtitle' },
            { title: 'Success Alert', type: 'success', subtitle: 'subtitle' },
            { title: 'Warning Alert', type: 'warning', subtitle: 'subtitle' },
            { title: 'Error Alert', type: 'error', subtitle: 'subtitle' },
          ],
        },
        {
          title: 'Custom Slot Alert',
          data: [
            {
              title: 'Info Alert', type: 'info', custom: true, subtitle: 'subtitle',
            },
            {
              title: 'Success Alert', type: 'success', custom: true, subtitle: 'subtitle',
            },
            {
              title: 'Warning Alert', type: 'warning', custom: true, subtitle: 'subtitle',
            },
            {
              title: 'Error Alert', type: 'error', custom: true, subtitle: 'subtitle',
            },
          ],
        },
        {
          title: 'Complete Alert',
          data: [
            {
              title: 'Info Alert', type: 'info', subtitle: 'subtitle', 'button-text': 'Click here', dismissable: true, model: true,
            },
            {
              title: 'Success Alert', type: 'success', subtitle: 'subtitle', 'button-text': 'Click here', dismissable: true, model: true,
            },
            {
              title: 'Warning Alert', type: 'warning', subtitle: 'subtitle', 'button-text': 'Click here', dismissable: true, model: true,
            },
            {
              title: 'Error Alert', type: 'error', subtitle: 'subtitle', 'button-text': 'Click here', dismissable: true, model: true,
            },
          ],
        },
      ],
    };
  },
  template: `
  <div class="ec-m--16">
    <template v-for="(block, indexBlock) in alerts">
      <h3 class="ec-m--8" :key="indexBlock">{{ block.title }}</h3>
      <ec-alert v-for="(alert, index) in block.data" :key="indexBlock + '' + index" v-bind="alert" v-model="alert.model">
        <div v-if="alert.custom" slot-scope="{ title, subtitle }">
          Custom: {{ title }} - {{ subtitle }}
        </div>
      </ec-alert>
    </template>
    </div>`,
}));


export default stories;
