import EcLoadingIcon from './ec-loading-icon.vue';

export default {
  title: 'Loading Icon',
  component: EcLoadingIcon,
};

export const basic = (args, { argTypes }) => ({
  components: { EcLoadingIcon },
  props: Object.keys(argTypes),
  template: `
    <div class="tw-p-24 tw-flex tw-justify-center">
      <ec-loading-icon v-bind="$props" />
    </div>
  `,
});

basic.args = {
  size: 48,
};
