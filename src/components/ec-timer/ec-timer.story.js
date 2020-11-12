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
    <ec-timer
      :radius="radius"
      :seconds="seconds"
    />
  `,
});

export const basic = Template.bind({});

basic.args = {
  radius: 40,
  seconds: 10,
};
