import EcLoadingIcon from './ec-loading-icon.vue';

export default {
  title: 'Loading Icon',
  component: EcLoadingIcon,
};

export const basic = args => ({
  components: { EcLoadingIcon },
  setup() {
    return { args };
  },
  template: `
    <div class="tw-p-24 tw-flex tw-justify-center">
      <ec-loading-icon v-bind="args" />
    </div>
  `,
});

basic.args = {
  size: 48,
};
