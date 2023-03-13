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
            text: 'Label',
          },
          {
            text: 'Text',
            tooltipText: 'Some tooltip text',
          },
          {
            text: 'Description',
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
  <div class="tw-mx-0 tw-my-auto tw-flex tw-justify-center tw-items-center tw-h-screen tw-w-screen">
    <div
      class="tw-grid tw-bg-gray-7 tw-flex-1"
      style="max-width: 616px;">
      <ec-summary-info
        class="tw-col-4"
        v-for="(item, index) in 3"
        v-bind="args"
        :key="index"
      />
    </div>
  </div>
  `,
});

