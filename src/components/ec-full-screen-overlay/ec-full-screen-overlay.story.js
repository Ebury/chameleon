import EcFullScreenOverlay from './ec-full-screen-overlay.vue';

export default {
  title: 'Full Screen Overlay',
  component: EcFullScreenOverlay,
};

const Template = ({ modelValue, ...args }) => ({
  components: { EcFullScreenOverlay },
  setup() {
    return {
      args,
    };
  },
  template: `
    <ec-full-screen-overlay v-bind="args"></ec-full-screen-overlay>
  `,
});

export const basic = Template.bind({});
basic.args = {
  title: 'I am a title',
};

