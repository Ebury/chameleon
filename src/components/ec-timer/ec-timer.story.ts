import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';

import EcTimer from './ec-timer.vue';

const meta: Meta = {
  title: 'Timer',
  component: EcTimer,
};

export default meta;

type EcTimerStory = StoryFn<typeof EcTimer>;

const Template: EcTimerStory = args => ({
  components: { EcTimer },
  setup() {
    return {
      args,
      onTimeExpired: action('time-expired'),
    };
  },
  template: `
    <div class="tw-flex tw-justify-center">
      <ec-timer v-bind="args" v-on="{ 'time-expired': onTimeExpired }" />
    </div>
  `,
});

export const basic = Template.bind({});
basic.args = {
  seconds: 20,
  isRunning: true,
};

export const stopped = Template.bind({});
stopped.args = {
  seconds: 30,
  isRunning: false,
};

stopped.parameters = {
  visualRegressionTests: { disable: true },
};

export const stoppedWithMinutes = Template.bind({});
stoppedWithMinutes.args = {
  seconds: 30,
  showMinutes: true,
  isRunning: false,
};

stoppedWithMinutes.parameters = {
  visualRegressionTests: { disable: true },
};

export const showMinutes = Template.bind({});
showMinutes.args = {
  showMinutes: true,
  seconds: 80,
  isRunning: true,
};
