
import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';
import { reactive } from 'vue';

import EcAlert from './ec-alert.vue';
import { AlertType } from './types';

import './ec-alert.story.css';

export default {
  title: 'Alert',
  component: EcAlert,
  argTypes: {
    type: {
      options: Object.values(AlertType),
      control: { type: 'select' },
    },
  },
} as Meta<typeof EcAlert>;

const defaultArgs = {
  title: 'Error',
  subtitle: 'Something went wrong with the update.',
  type: AlertType.ERROR,
  buttonText: 'Read more',
  dismissable: true,
  responsive: true,
  open: true,
};

type EcAlertStory = StoryFn<typeof EcAlert>;

const Template: EcAlertStory = args => ({
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
basic.args = { ...defaultArgs };

export const responsive: EcAlertStory = args => ({
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

responsive.args = { ...defaultArgs };
responsive.parameters = {
  visualRegressionTests: { disable: true },
};

export const all: EcAlertStory = args => ({
  components: { EcAlert },
  setup() {
    const alerts = reactive([
      {
        title: 'Simple Alert',
        data: [
          { title: 'Info Alert', type: AlertType.INFO },
          { title: 'Success Alert', type: AlertType.SUCCESS },
          { title: 'Warning Alert', type: AlertType.WARNING },
          { title: 'Error Alert', type: AlertType.ERROR },
        ],
      },
      {
        title: 'Dismissable Alert',
        data: [
          {
            title: 'Info Alert', type: AlertType.INFO, dismissable: true, model: true,
          },
          {
            title: 'Success Alert', type: AlertType.SUCCESS, dismissable: true, model: true,
          },
          {
            title: 'Warning Alert', type: AlertType.WARNING, dismissable: true, model: true,
          },
          {
            title: 'Error Alert', type: AlertType.ERROR, dismissable: true, model: true,
          },
        ],
      },
      {
        title: 'Button Alert',
        data: [
          { title: 'Info Alert', type: AlertType.INFO, 'button-text': 'Click here' },
          { title: 'Success Alert', type: AlertType.SUCCESS, 'button-text': 'Click here' },
          { title: 'Warning Alert', type: AlertType.WARNING, 'button-text': 'Click here' },
          { title: 'Error Alert', type: AlertType.ERROR, 'button-text': 'Click here' },
        ],
      },
      {
        title: 'Subtitle Alert',
        data: [
          { title: 'Info Alert', type: AlertType.INFO, subtitle: 'Subtitle' },
          { title: 'Success Alert', type: AlertType.SUCCESS, subtitle: 'Subtitle' },
          { title: 'Warning Alert', type: AlertType.WARNING, subtitle: 'Subtitle' },
          { title: 'Error Alert', type: AlertType.ERROR, subtitle: 'Subtitle' },
        ],
      },
      {
        title: 'Custom, default and CTA Slot Alert',
        data: [
          {
            title: 'Info Alert', type: AlertType.INFO, custom: true, subtitle: 'Subtitle',
          },
          {
            title: 'Success Alert', type: AlertType.SUCCESS, custom: true, subtitle: 'Subtitle',
          },
          {
            title: 'Warning Alert', type: AlertType.WARNING, custom: true, subtitle: 'Subtitle',
          },
          {
            title: 'Error Alert', type: AlertType.ERROR, custom: true, subtitle: 'Subtitle',
          },
        ],
      },
      {
        title: 'Complete Alert',
        data: [
          {
            title: 'Info Alert', type: AlertType.INFO, subtitle: 'Subtitle', 'button-text': 'Click here', dismissable: true, model: true,
          },
          {
            title: 'Success Alert', type: AlertType.SUCCESS, subtitle: 'Subtitle', 'button-text': 'Click here', dismissable: true, model: true,
          },
          {
            title: 'Warning Alert', type: AlertType.WARNING, subtitle: 'Subtitle', 'button-text': 'Click here', dismissable: true, model: true,
          },
          {
            title: 'Error Alert', type: AlertType.ERROR, subtitle: 'Subtitle', 'button-text': 'Click here', dismissable: true, model: true,
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
