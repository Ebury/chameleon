import EcIcon from '../ec-icon';
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
  title: 'This is the title',
  iconName: 'simple-sell',
};

export const withContentLinesProp = args => ({
  components: { EcSummaryInfo },
  setup() {
    return { args };
  },
  template: `
    <ec-summary-info
      v-bind="args"
    />
  `,
});

withContentLinesProp.args = {
  ...basic.args,
  lineItems: [
    {
      text: 'Some text',
      cssClasses: ['tw-text-gray-4', 'tw-uppercase'],
      iconCssClasses: ['tw-h-16'],
      iconName: 'simple-info',
      tooltipText: 'Some tooltip text',
    },
    {
      text: 'Another text',
    },
  ],
};

export const withSlots = args => ({
  components: { EcSummaryInfo, EcIcon },
  setup() {
    return { args };
  },
  template: `
    <ec-summary-info v-bind="args">
        <div class="tw-flex tw-small-text">
          <span class="tw-text-key-4">
            Some text from a slot
          </span>
        </div>
    </ec-summary-info>
  `,
});

withSlots.args = {
  ...basic.args,
};

