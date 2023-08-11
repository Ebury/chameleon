import { reactive } from 'vue';

import EcTooltip from './ec-tooltip';
import { TooltipPlacement, TooltipPopperClass, TooltipTrigger } from './types';

const defaultPlacements = [TooltipPlacement.BOTTOM, TooltipPlacement.LEFT, TooltipPlacement.RIGHT, TooltipPlacement.TOP];

export default {
  title: 'Tooltip',
  argTypes: {
    placement: {
      options: defaultPlacements,
      control: { type: 'select' },
    },
    triggers: {
      options: [TooltipTrigger.HOVER, TooltipTrigger.CLICK],
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
};

const Template = ({ triggers, ...args }: { triggers: TooltipTrigger }) => ({
  directives: { EcTooltip },
  inheritAttrs: false,
  setup() {
    return { args, triggers };
  },
  template: `
    <div class="tw-m-80">
      <div
        class="tw-p-12 tw-rounded tw-text-gray-8 tw-my-auto tw-mx-20 tw-bg-additional-18"
        v-ec-tooltip="{ ...args, triggers: [triggers] }">Hover over this element to see the tooltip.</div>
    </div>
  `,
});

export const basic = Template.bind({});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
basic.args = {
  content: 'Test tooltip',
  shown: true,
  placement: TooltipPlacement.TOP,
  delay: 100,
  popperClass: '',
  triggers: TooltipTrigger.HOVER,
  distance: 8,
  skidding: 0,
  autoHide: true,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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
    <div class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-min-h-screen tw-bg-gray-5">
      <div class="tw-w-full tw-p-64 tw-my-40">
        <div class="tw-flex tw-flex-row tw-justify-between">
          <div
            v-for="placement in placements"
            class="tw-col-2">
            <div
              v-ec-tooltip="{ ...tooltipConfig, placement: placement }"
              class="tw-min-h-64 tw-min-w-full tw-w-1/2 tw-my-0 tw-mx-auto tw-text-gray-8 tw-p-20 tw-bg-success tw-text-center">
              Default tooltip
            </div>
          </div>
        </div>
      </div>

      <div class="tw-w-full tw-p-64 tw-my-40">
        <div class="tw-flex tw-flex-row tw-justify-between">
          <div
            v-for="placement in placements"
            class="tw-col-2">
            <div
              v-ec-tooltip="{ ...customBgTooltipConfig, placement: placement }"
              class="tw-min-h-64 tw-min-w-full tw-w-1/2 tw-my-0 tw-mx-auto tw-text-gray-8 tw-p-20 tw-bg-success tw-text-center">
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
        class="tw-p-12 tw-rounded tw-text-gray-8 tw-my-auto tw-mx-20 tw-bg-additional-18"
        v-ec-tooltip="'Test string tooltip value'">Hover over this element to see the tooltip.</div>
    </div>`,
});

stringAsTooltipValue.parameters = {
  controls: { disable: true },
  actions: { disable: true },
};
