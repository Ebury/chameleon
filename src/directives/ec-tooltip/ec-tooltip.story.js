import { reactive } from 'vue';

import EcTooltip from './ec-tooltip';

const defaultPlacements = ['right', 'top', 'bottom', 'left'];

export default {
  title: 'Tooltip',
  argTypes: {
    placement: {
      options: defaultPlacements,
      control: { type: 'select' },
    },
    trigger: {
      options: ['hover', 'click'],
      control: { type: 'select' },
    },
    popperClass: {
      options: [
        '',
        'ec-tooltip--level-1',
        'ec-tooltip--level-2',
        'ec-tooltip--level-3',
        'ec-tooltip--bg-bright',
        'ec-tooltip--bg-success',
        'ec-tooltip--bg-error',
      ],
      control: { type: 'select' },
    },
  },
};

const Template = ({ trigger, ...args }) => ({
  directives: { EcTooltip },
  inheritAttrs: false,
  setup() {
    return { args, trigger };
  },
  template: `
    <div class="tw-m-80">
      <div
        class="tw-p-12 tw-rounded tw-text-gray-8 tw-my-auto tw-mx-20 tw-bg-additional-18"
        v-ec-tooltip="{ ...args, triggers: [trigger] }">Hover over this element to see the tooltip.</div>
    </div>
  `,
});

export const basic = Template.bind({});

basic.args = {
  content: 'Test tooltip',
  shown: true,
  placement: 'top',
  delay: 100,
  popperClass: '',
  trigger: 'hover',
  distance: 8,
  skidding: 0,
  autoHide: true,
};

basic.parameters = {
  visualRegressionTests: { disable: true },
};

export const allColorsAndPositions = () => ({
  directives: { EcTooltip },
  setup() {
    const tooltipConfig = reactive({
      content: '<p>Normal tooltip. Lorem ipsum dolor sit amet</p>',
      shown: true,
      triggers: ['click'],
    });

    const customBgTooltipConfig = reactive({
      content: '<p>Popover like tooltip. Lorem ipsum dolor sit amet</p>',
      popperClass: ['ec-tooltip--bg-bright'],
      triggers: ['click'],
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
  controls: { disable: true },
  actions: { disable: true },
  docs: { disable: true },
};
