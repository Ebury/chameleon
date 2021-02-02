import EcTimer from './ec-timer.vue';

export default {
  title: 'Timer',
  component: EcTimer,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    EcTimer,
  },
  template: `
    <div class="tw-flex tw-justify-center">
      <ec-timer
        :seconds="seconds"
        :isRunning="isRunning"
      />
    </div>`,
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
