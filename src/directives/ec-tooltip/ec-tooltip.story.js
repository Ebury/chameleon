import EcTooltip from './ec-tooltip';

const placements = ['right', 'top', 'bottom', 'left'];

export default {
  title: 'Tooltip',
  argTypes: {
    placement: {
      options: placements,
      control: { type: 'select' },
    },
    trigger: {
      options: ['hover', 'click'],
      control: { type: 'select' },
    },
  },
};

const Template = (args, { argTypes }) => ({
  directives: { EcTooltip },
  props: Object.keys(argTypes),
  template: `
    <div class="tw-m-48">
      <div
        class="tw-p-12 tw-rounded tw-text-gray-8 tw-my-auto tw-mx-20 tw-bg-additional-18"
        v-ec-tooltip="$props">Hover over this element to see the tooltip.</div>
    </div>
  `,
});

export const basic = Template.bind({});

basic.args = {
  content: 'Test tooltip',
  show: true,
  placement: 'top',
  delay: 100,
  classes: ['ec-tooltip--level-1'],
  trigger: 'hover',
  offset: 0,
  autoHide: true,
  popperOptions: {},
};

basic.parameters = {
  visualRegressionTests: { disable: true },
};

export const allColorsAndPositions = () => ({
  directives: { EcTooltip },
  data() {
    return {
      tooltipConfig: {
        content: '<p>Normal tooltip. Lorem ipsum dolor sit amet</p>',
        show: true,
      },
      whiteTooltipConfig: {
        content: '<p>Popover like tooltip. Lorem ipsum dolor sit amet</p>',
        classes: ['ec-tooltip--bg-bright'],
        trigger: 'click',
        show: true,
      },
      placements,
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
              class="tw-min-h-64 tw-w-1/2 tw-my-0 tw-mx-auto tw-text-gray-8 tw-p-20 tw-bg-success tw-text-center">
              Black tooltip
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
              v-ec-tooltip="{ ...whiteTooltipConfig, placement: placement }"
              class="tw-min-h-64 tw-w-1/2 tw-my-0 tw-mx-auto tw-text-gray-8 tw-p-20 tw-bg-success tw-text-center">
              White tooltip
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
