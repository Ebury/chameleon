import EcIcon from '../ec-icon';
import EcSummaryInfo from './ec-summary-info.vue';

export default {
  title: 'Summary Info',
  component: EcSummaryInfo,
};

const basicArgs = {
  iconName: 'simple-payment',
};

export const basic = () => ({
  components: { EcSummaryInfo },
  setup() {
    return {
      args: {
        ...basicArgs,
        lineItems: [
          {
            text: 'The label',
          },
          {
            text: 'Some text',
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
  <div 
    style="margin: -100px 0 0 -150px;" 
    class="tw-p-8 tw-absolute tw-top-1/2 tw-left-1/2">
      <ec-summary-info
        v-bind="args"
      />
    </div>
  `,
});

export const withSlots = () => ({
  components: { EcSummaryInfo, EcIcon },
  setup() {
    return { args: basicArgs };
  },
  template: `
  <div 
    style="margin: -100px 0 0 -150px;" 
    class="tw-p-8 tw-absolute tw-top-1/2 tw-left-1/2">
    <ec-summary-info v-bind="args">
        <div class="tw-small-text">
          <div>
            <span class="tw-text-gray-5 tw-small-text">
              Slot label
            </span>
          </div>
          <div>
            <span class="tw-text-key-4">
              Slot text
            </span>
          </div>
        </div>
    </ec-summary-info>
  </div>
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
            stylePreset: 'label',
            text: 'A very very very long label',
          },
          {
            stylePreset: 'text',
            text: 'A very very very long text',
            tooltipText: 'Some tooltip text',
          },
          {
            stylePreset: 'description',
            text: 'A very very very long description',
          },
        ],
      },
    };
  },
  template: `
  <div 
    style="margin: -100px 0 0 -150px;" 
    class="tw-p-8 tw-absolute tw-top-1/2 tw-left-1/2 tw-w-96">
    <ec-summary-info 
      v-bind="args" 
    />
  </div>
  `,
});

