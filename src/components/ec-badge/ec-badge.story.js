import { action } from '@storybook/addon-actions';
import { reactive } from 'vue';

import EcBadge from './ec-badge.vue';

// import './ec-badge.story.css';

export default {
  title: 'Badge',
  component: EcBadge,
  argTypes: {
    type: {
      options: ['error', 'info', 'success', 'warning'],
      control: { type: 'select' },
    },
  },
};

const Template = args => ({
  components: { EcBadge },
  setup() {
    return {
      args,
      onAction: action('action'),
      onChange: action('change'),
    };
  },
  template: `
    <ec-badge
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
  components: { EcBadge },
  setup() {
    return { args };
  },
  template: `
    <div>
      <ec-badge v-bind="args" />

      <ec-badge
        class="my-badge tw-mt-16"
        v-bind="args"
        subtitle="This badge has a custom breakpoint at 640px, so it doesn't break the same way as the badge above with the default breakpoint."
        :responsive="false" />
    </div>
  `,
});

responsive.args = { ...basic.args };
responsive.parameters = {
  visualRegressionTests: { disable: true },
};

export const all = args => ({
  components: { EcBadge },
  setup() {
    const badges = reactive([
      {
        title: 'Simple Badge',
        data: [
          { title: 'Info Badge', type: 'info' },
          { title: 'Success Badge', type: 'success' },
          { title: 'Warning Badge', type: 'warning' },
          { title: 'Error Badge', type: 'error' },
        ],
      },
      {
        title: 'Dismissable Badge',
        data: [
          {
            title: 'Info Badge', type: 'info', dismissable: true, model: true,
          },
          {
            title: 'Success Badge', type: 'success', dismissable: true, model: true,
          },
          {
            title: 'Warning Badge', type: 'warning', dismissable: true, model: true,
          },
          {
            title: 'Error Badge', type: 'error', dismissable: true, model: true,
          },
        ],
      },
      {
        title: 'Button Badge',
        data: [
          { title: 'Info Badge', type: 'info', 'button-text': 'Click here' },
          { title: 'Success Badge', type: 'success', 'button-text': 'Click here' },
          { title: 'Warning Badge', type: 'warning', 'button-text': 'Click here' },
          { title: 'Error Badge', type: 'error', 'button-text': 'Click here' },
        ],
      },
      {
        title: 'Subtitle Badge',
        data: [
          { title: 'Info Badge', type: 'info', subtitle: 'Subtitle' },
          { title: 'Success Badge', type: 'success', subtitle: 'Subtitle' },
          { title: 'Warning Badge', type: 'warning', subtitle: 'Subtitle' },
          { title: 'Error Badge', type: 'error', subtitle: 'Subtitle' },
        ],
      },
      {
        title: 'Custom, default and CTA Slot Badge',
        data: [
          {
            title: 'Info Badge', type: 'info', custom: true, subtitle: 'Subtitle',
          },
          {
            title: 'Success Badge', type: 'success', custom: true, subtitle: 'Subtitle',
          },
          {
            title: 'Warning Badge', type: 'warning', custom: true, subtitle: 'Subtitle',
          },
          {
            title: 'Error Badge', type: 'error', custom: true, subtitle: 'Subtitle',
          },
        ],
      },
      {
        title: 'Complete Badge',
        data: [
          {
            title: 'Info Badge', type: 'info', subtitle: 'Subtitle', 'button-text': 'Click here', dismissable: true, model: true,
          },
          {
            title: 'Success Badge', type: 'success', subtitle: 'Subtitle', 'button-text': 'Click here', dismissable: true, model: true,
          },
          {
            title: 'Warning Badge', type: 'warning', subtitle: 'Subtitle', 'button-text': 'Click here', dismissable: true, model: true,
          },
          {
            title: 'Error Badge', type: 'error', subtitle: 'Subtitle', 'button-text': 'Click here', dismissable: true, model: true,
          },
        ],
      },
    ]);

    return {
      args,
      badges,
    };
  },
  template: `
    <div class="tw-m-16">
      <template v-for="(block, blockIndex) in badges" :key="blockIndex">
        <h3 class="tw-m-8">{{ block.title }}</h3>
        <ec-badge v-for="(badge, badgeIndex) in block.data" v-bind="badge" :key="blockIndex + '-' + badgeIndex" v-model:open="badge.model" class="tw-m-8">
          <template v-if="badge.custom" #default="{ title, subtitle }">
            <div>
              Custom: {{ title }} - {{ subtitle }}
            </div>
          </template>
          <template v-if="badge.custom" #cta>
            <a
              href="#"
              @click.stop.prevent
            >
              Custom CTA
            </a>
          </template>
        </ec-badge>
      </template>
    </div>`,
});

all.parameters = {
  controls: { disable: true },
  actions: { disable: true },
};
