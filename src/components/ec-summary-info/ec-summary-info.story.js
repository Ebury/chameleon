import EcSummaryInfo from './ec-summary-info.vue';

export default {
  title: 'Summary Info',
  component: EcSummaryInfo,
};

const Template = args => ({
  components: { EcSummaryInfo },
  setup() {
    return {
      args,
    };
  },
  template: `
    <ec-summary-info
      v-bind="args"
    />
  `,
});

export const basic = Template.bind({});

basic.args = {
};
