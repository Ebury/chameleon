import { action } from '@storybook/addon-actions';
import { reactive } from 'vue';

import EcAlert from './ec-alert.vue';

import './ec-alert.story.css';

export default {
  title: 'Alert',
  component: EcAlert,
  argTypes: {
    type: {
      options: ['error', 'info', 'success', 'warning'],
      control: { type: 'select' },
    },
  },
};

const Template = args => ({
  components: { EcAlert },
  setup() {
    return {
      args,
      onAction: action('action'),
      onChange: action('change'),
    };
  },
  template: `
    <ec-alert
      v-bind="args"
      v-on="{
        action: onAction,
        change: onChange,
      }" />
  `,
});

export const basic = Template.bind({});

basic.args = {
  title: 'Error',
  subtitle: 'Something went wrong with the update.',
  type: 'error',
  buttonText: 'Read more',
  dismissable: true,
  responsive: true,
  open: true,
};

export const responsive = args => ({
  components: { EcAlert },
  setup() {
    return { args };
  },
  template: `
    <div>
      <ec-alert v-bind="args" />

      <ec-alert
        class="my-alert tw-mt-16"
        v-bind="args"
        subtitle="This alert has a custom breakpoint at 640px, so it doesn't break the same way as the alert above with the default breakpoint."
        :responsive="false" />
    </div>
  `,
});

responsive.args = { ...basic.args };
responsive.parameters = {
  visualRegressionTests: { disable: true },
};

export const all = args => ({
  components: { EcAlert },
  setup() {
    const alerts = reactive([
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
          { title: 'Info Alert', type: 'info', subtitle: 'Subtitle' },
          { title: 'Success Alert', type: 'success', subtitle: 'Subtitle' },
          { title: 'Warning Alert', type: 'warning', subtitle: 'Subtitle' },
          { title: 'Error Alert', type: 'error', subtitle: 'Subtitle' },
        ],
      },
      {
        title: 'Custom, default and CTA Slot Alert',
        data: [
          {
            title: 'Info Alert', type: 'info', custom: true, subtitle: 'Subtitle',
          },
          {
            title: 'Success Alert', type: 'success', custom: true, subtitle: 'Subtitle',
          },
          {
            title: 'Warning Alert', type: 'warning', custom: true, subtitle: 'Subtitle',
          },
          {
            title: 'Error Alert', type: 'error', custom: true, subtitle: 'Subtitle',
          },
        ],
      },
      {
        title: 'Complete Alert',
        data: [
          {
            title: 'Info Alert', type: 'info', subtitle: 'Subtitle', 'button-text': 'Click here', dismissable: true, model: true,
          },
          {
            title: 'Success Alert', type: 'success', subtitle: 'Subtitle', 'button-text': 'Click here', dismissable: true, model: true,
          },
          {
            title: 'Warning Alert', type: 'warning', subtitle: 'Subtitle', 'button-text': 'Click here', dismissable: true, model: true,
          },
          {
            title: 'Error Alert', type: 'error', subtitle: 'Subtitle', 'button-text': 'Click here', dismissable: true, model: true,
          },
        ],
      },
    ]);

    return {
      args,
      alerts,
    };
  },
  template: `
    <div class="tw-m-16">
      <template v-for="(block, blockIndex) in alerts" :key="blockIndex">
        <h3 class="tw-m-8">{{ block.title }}</h3>
        <ec-alert v-for="(alert, alertIndex) in block.data" v-bind="alert" :key="blockIndex + '-' + alertIndex" v-model:open="alert.model" class="tw-m-8">
          <template v-if="alert.custom" #default="{ title, subtitle }">
            <div>
              Custom: {{ title }} - {{ subtitle }}
            </div>
          </template>
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
});

all.parameters = {
  controls: { disable: true },
  actions: { disable: true },
};
