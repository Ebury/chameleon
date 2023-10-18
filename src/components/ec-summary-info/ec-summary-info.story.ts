
import type { Meta, StoryFn } from '@storybook/vue3';

import { IconName } from '../ec-icon/types';
import EcSummaryInfo from './ec-summary-info.vue';
import { StylePreset } from './types';

export default {
  title: 'Summary Info',
  component: EcSummaryInfo,
  argTypes: {
    iconName: {
      control: { type: 'select' },
      options: Object.values(IconName),
    },
    lineItems: {
      control: { type: 'object' },
    },
  },
} as Meta<typeof EcSummaryInfo>;

const basicArgs = {
  iconName: IconName.SimplePayment,
  lineItems: [],
};

type EcSummaryInfoStory = StoryFn<typeof EcSummaryInfo>;

const Template: EcSummaryInfoStory = args => ({
  components: { EcSummaryInfo },
  setup() {
    return { args };
  },
  template: `
    <div
      style="margin: -100px 0 0 -150px;"
      class="tw-p-8 tw-absolute tw-top-1/2 tw-left-1/2"
    >
      <ec-summary-info v-bind="args" />
    </div>
  `,
});

export const basic = Template.bind({});
basic.args = {
  ...basicArgs,
  lineItems: [
    {
      text: 'Label',
      stylePreset: StylePreset.LABEL,
    },
    {
      text: 'Text',
      stylePreset: StylePreset.TEXT,
      isSensitive: false,
      tooltipText: 'Tooltip text for Text',
    },
    {
      text: 'Description',
      stylePreset: StylePreset.DESCRIPTION,
      tooltipText: 'Tooltip text for Description',
    },
  ],
};

export const withSlots: EcSummaryInfoStory = args => ({
  components: { EcSummaryInfo },
  setup() {
    return { args };
  },
  template: `
    <div
      style="margin: -100px 0 0 -150px;"
      class="tw-p-8 tw-absolute tw-top-1/2 tw-left-1/2"
    >
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
withSlots.args = basicArgs;

export const truncatedText: EcSummaryInfoStory = args => ({
  components: { EcSummaryInfo },
  setup() {
    return { args };
  },
  template: `
    <div class="tw-mx-0 tw-my-auto tw-flex tw-justify-center tw-items-center tw-h-screen tw-w-screen">
      <div
        class="tw-grid tw-bg-gray-7 tw-flex-1"
        style="max-width: 616px;"
      >
        <ec-summary-info
          v-for="(item, index) in 3"
          v-bind="args"
          :key="index"
          class="tw-col-4"
        />
      </div>
    </div>
  `,
});
truncatedText.args = {
  ...basicArgs,
  lineItems: [
    {
      stylePreset: StylePreset.LABEL,
      text: 'A very very very long label',
    },
    {
      stylePreset: StylePreset.TEXT,
      text: 'A very very very long text',
      tooltipText: 'Some tooltip text',
    },
    {
      stylePreset: StylePreset.DESCRIPTION,
      text: 'A very very very long description',
    },
  ],
};
