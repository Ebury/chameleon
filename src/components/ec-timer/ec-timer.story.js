import { action } from '@storybook/addon-actions';

import EcTimer from './ec-timer.vue';

export default {
  title: 'Timer',
  component: EcTimer,
};

const Template = ({ ...args }) => ({
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

export const basic = Template.bind({
  args: {
    seconds: 20,
    isRunning: true,
  },
});

export const stopped = Template.bind({
  args: {
    seconds: 30,
    isRunning: false,
  },
  parameters: {
    visualRegressionTests: { disable: true },
  },
});

export const stoppedWithMinutes = Template.bind({
  args: {
    seconds: 30,
    showMinutes: true,
    isRunning: false,
  },
  parameters: {
    visualRegressionTests: { disable: true },
  },
});

export const ShowMinutes = Template.bind({
  args: {
    showMinutes: true,
    seconds: 80,
    isRunning: true,
  },
});
