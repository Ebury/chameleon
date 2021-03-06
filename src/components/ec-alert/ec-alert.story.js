import { storiesOf } from '@storybook/vue';
import { boolean, text } from '@storybook/addon-knobs';
import EcAlert from './ec-alert.vue';
import './ec-alert.story.css';

const stories = storiesOf('Alert', module);

stories.add('basic', () => ({
  components: { EcAlert },
  props: {
    title: {
      default: text('title', 'Error'),
    },
    subtitle: {
      default: text('subtitle', 'Something was wrong with the update.'),
    },
    type: {
      default: text('type', 'error'),
    },
    buttonText: {
      default: text('buttonText', 'Read more'),
    },
    dismissable: {
      default: boolean('dismissable', true),
    },
    responsive: {
      default: boolean('responsive', true),
    },
  },
  data() {
    return { show: true };
  },
  template: `
    <div>
      <button class="ec-btn ec-btn--primary ec-btn--rounded ec-btn--sm tw-m-16" @click="show = !show">{{ show ? 'Hide' : 'Show' }}</button>

      <ec-alert
        :title="title"
        :subtitle="subtitle"
        :type="type"
        :dismissable="dismissable"
        :responsive="responsive"
        :button-text="buttonText"
        v-model="show" />

      <ec-alert
        :title="title"
        subtitle="This alert has custom breakpoint at 640px, so it doesn't break the same way as the alert above with default breakpoint"
        :type="type"
        :dismissable="dismissable"
        :responsive="false"
        :button-text="buttonText"
        v-model="show"
        class="my-alert tw-mt-16" />
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
          title: 'Custom, default and CTA Slot Alert',
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
  <div class="tw-m-16">
    <template v-for="(block, blockIndex) in alerts">
      <h3 class="tw-m-8" :key="blockIndex">{{ block.title }}</h3>
      <ec-alert v-for="(alert, alertIndex) in block.data" :key="blockIndex + '-' + alertIndex" v-bind="alert" v-model="alert.model" class="tw-m-8">
        <div v-if="alert.custom" slot-scope="{ title, subtitle }">
          Custom: {{ title }} - {{ subtitle }}
        </div>

        <template v-if="alert.custom" #cta>
          <a
            href="#"
            @click.stop.prevent
          >
            Custom CTA
          </a>
        </template>
      </ec-alert>
    </template>
  </div>`,
}));
