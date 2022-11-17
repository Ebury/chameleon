import EcIcon from '../ec-icon';
import EcSummaryInfo from './ec-summary-info.vue';

export default {
  title: 'Summary Info',
  component: EcSummaryInfo,
};

const basicArgs = {
  title: 'This is the title',
  iconName: 'simple-sell',
};

const Template = () => ({
  components: { EcSummaryInfo },
  setup() {
    return {
      args: basicArgs,
    };
  },
  template: `
    <ec-summary-info
      v-bind="args"
    />
  `,
});

export const basic = Template.bind({});

export const withContentLinesProp = () => ({
  components: { EcSummaryInfo },
  setup() {
    return {
      args: {
        ...basicArgs,
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
      },
    };
  },
  template: `
    <ec-summary-info
      v-bind="args"
    />
  `,
});

export const withSlots = () => ({
  components: { EcSummaryInfo, EcIcon },
  setup() {
    return { args: basicArgs };
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

