import { action } from '@storybook/addon-actions';
import EcTimer from './ec-timer.vue';

export default {
  title: 'Timer',
  component: EcTimer,
};

const Template = (args, { argTypes }) => ({
  components: { EcTimer },
  props: Object.keys(argTypes),
  methods: {
    onTimeExpired: action('time-expired'),
  },
  template: `
    <div class="tw-flex tw-justify-center">
      <ec-timer v-bind="$props" v-on="{ 'time-expired': onTimeExpired }" />
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
