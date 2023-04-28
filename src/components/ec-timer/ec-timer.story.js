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
stopped.args = {
  seconds: 30,
  showMinutes: true,
  isRunning: false,
};

stopped.parameters = {
  visualRegressionTests: { disable: true },
};

export const ShowMinutes = Template.bind({});
ShowMinutes.args = {
  showMinutes: true,
  seconds: 20,
  isRunning: true,
};

ShowMinutes.parameters = {
  visualRegressionTests: { disable: true },
};
