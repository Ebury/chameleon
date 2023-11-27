import type { Meta, StoryFn } from '@storybook/vue3';
import { reactive, ref, watchEffect } from 'vue';

import type { Maybe } from '../../../global';
import EcTooltip from './ec-tooltip';
import {
  type TooltipOptions, TooltipPlacement, TooltipPopperClass, TooltipTrigger,
} from './types';

const defaultPlacements = Object.values(TooltipPlacement);

export default {
  title: 'Tooltip',
  argTypes: {
    placement: {
      options: defaultPlacements,
      control: { type: 'select' },
    },
    triggers: {
      options: Object.values(TooltipTrigger),
      control: { type: 'select' },
    },
    popperClass: {
      options: [
        TooltipPopperClass.EC_TOOLTIP_BG_BRIGHT,
        TooltipPopperClass.EC_TOOLTIP_BG_ERROR,
        TooltipPopperClass.EC_TOOLTIP_BG_SUCCESS,
        TooltipPopperClass.EC_TOOLTIP_LEVEL_1,
        TooltipPopperClass.EC_TOOLTIP_LEVEL_2,
        TooltipPopperClass.EC_TOOLTIP_LEVEL_3,
      ],
      control: { type: 'select' },
    },
  },
} as Meta<typeof EcTooltip>;

type EcTooltipStory = StoryFn<Omit<TooltipOptions, 'triggers' | 'popperClass'> & {
  triggers: TooltipTrigger,
  popperClass: Maybe<TooltipPopperClass>,
}>;

const Template: EcTooltipStory = storyArgs => ({
  directives: { EcTooltip },
  inheritAttrs: false,
  setup() {
    const triggers = ref<TooltipTrigger>();
    const popperClass = ref<Maybe<TooltipPopperClass>>();
    const args = ref({});

    watchEffect(() => {
      const {
        triggers: triggersFromArgs,
        popperClass: popperClassFromArgs,
        ...rest
      } = storyArgs;
      triggers.value = triggersFromArgs;
      popperClass.value = popperClassFromArgs;
      args.value = rest;
    });

    return { args, triggers, popperClass };
  },
  template: `
    <div class="tw-m-80">
      <div
        v-ec-tooltip="{ ...args, triggers: [triggers], popperClass: [popperClass] }"
        class="tw-p-12 tw-rounded tw-text-gray-8 tw-my-auto tw-mx-20 tw-bg-additional-18"
      >Hover over this element to see the tooltip.</div>
    </div>
  `,
});

export const basic = Template.bind({});

basic.args = {
  content: 'Test tooltip',
  shown: true,
  placement: TooltipPlacement.TOP,
  delay: 100,
  popperClass: null,
  triggers: TooltipTrigger.HOVER,
  distance: 8,
  skidding: 0,
  autoHide: true,
};

basic.parameters = {
  visualRegressionTests: {
    disable: false,
    waitOn: '.v-popper__popper--shown',
  },
};

export const allColorsAndPositions = () => ({
  directives: { EcTooltip },
  setup() {
    const tooltipConfig = reactive({
      content: '<p>Normal tooltip. Lorem ipsum dolor sit amet</p>',
      shown: true,
      triggers: [TooltipTrigger.CLICK],
    });

    const customBgTooltipConfig = reactive({
      content: '<p>Popover like tooltip. Lorem ipsum dolor sit amet</p>',
      popperClass: [TooltipPopperClass.EC_TOOLTIP_BG_BRIGHT],
      triggers: [TooltipTrigger.CLICK],
      shown: true,
    });

    return {
      placements: defaultPlacements,
      tooltipConfig,
      customBgTooltipConfig,
    };
  },
  template: `
    <div class="tw-flex tw-flex-col tw-w-full tw-max-w-full tw-justify-center tw-items-center tw-min-h-screen tw-bg-gray-5">
      <div class="tw-w-full tw-p-64 tw-my-40">
        <div class="tw-flex tw-flex-row tw-justify-between">
          <div v-for="placement in placements">
            <div
              v-ec-tooltip="{ ...tooltipConfig, placement: placement }"
              class="tw-min-h-64 tw-min-w-full tw-w-1/2 tw-my-0 tw-mx-auto tw-text-gray-8 tw-p-20 tw-bg-success tw-text-center"
            >
              Default tooltip
            </div>
          </div>
        </div>
      </div>

      <div class="tw-w-full tw-p-64 tw-my-40">
        <div class="tw-flex tw-flex-row tw-justify-between">
          <div v-for="placement in placements">
            <div
              v-ec-tooltip="{ ...customBgTooltipConfig, placement: placement }"
              class="tw-min-h-64 tw-min-w-full tw-w-1/2 tw-my-0 tw-mx-auto tw-text-gray-8 tw-p-20 tw-bg-success tw-text-center"
            >
              Custom bg tooltip
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
});

allColorsAndPositions.parameters = {
  visualRegressionTests: {
    waitOn: '.v-popper__popper--shown',
  },
  controls: { disable: true },
  actions: { disable: true },
};

export const stringAsTooltipValue = () => ({
  directives: { EcTooltip },
  template: `
    <div class="tw-m-80">
      <div
        v-ec-tooltip="'Test string tooltip value'"
        class="tw-p-12 tw-rounded tw-text-gray-8 tw-my-auto tw-mx-20 tw-bg-additional-18"
      >Hover over this element to see the tooltip.</div>
    </div>
  `,
});

stringAsTooltipValue.parameters = {
  controls: { disable: true },
  actions: { disable: true },
};
