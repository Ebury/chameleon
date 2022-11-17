import EcIcon from '../ec-icon';
import EcSummaryInfo from './ec-summary-info.vue';

export default {
  title: 'Summary Info',
  component: EcSummaryInfo,
};

const basicArgs = {
  iconName: 'simple-sell',
};

export const withContentLinesProp = () => ({
  components: { EcSummaryInfo },
  setup() {
    return {
      args: {
        ...basicArgs,
        lineItems: [
          {
            stylePreset: 'title',
            text: 'The title',
          },
          {
            stylePreset: 'description',
            text: 'Some text',
            iconName: 'simple-info',
            tooltipText: 'Some tooltip text',
          },
          {
            stylePreset: 'help',
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
        <div class="tw-small-text">
          <div>
            <span class="tw-text-gray-5 tw-small-text">
              Slot title
            </span>
          </div>
          <div>
            <span class="tw-text-key-4">
              Slot description
            </span>
          </div>
        </div>
    </ec-summary-info>
  `,
});

export const truncatedText = () => ({
  components: { EcSummaryInfo, EcIcon },
  setup() {
    return {
      args: {
        ...basicArgs,
        lineItems: [
          {
            stylePreset: 'title',
            text: 'A very very very long title',
          },
          {
            stylePreset: 'description',
            text: 'A very very very long description',
            iconName: 'simple-info',
            tooltipText: 'Some tooltip text',
          },
          {
            stylePreset: 'help',
            text: 'A very very very long help text',
          },
        ],
      },
    };
  },
  template: `
    <ec-summary-info 
      style="width: 100px;" 
      v-bind="args" 
    />
  `,
});

