import { storiesOf } from '@storybook/vue';
import {
  boolean,
  text,
  number,
  select,
  array,
} from '@storybook/addon-knobs';
import EcTooltip from './ec-tooltip';

// Data
const content = 'test tooltip';
const show = false;
const placement = 'top';
const delay = 100;
const classes = ['ec-tooltip--level-1'];

const tooltipConfig = {
  content: '<p>Normal tooltip. Lorem ipsum dolor sit amet</p>',
  show: true,
};

const whiteTooltipConfig = {
  content: '<p>Popover like tooltip. Lorem ipsum dolor sit amet</p>',
  classes: ['ec-tooltip--bg-bright'],
  trigger: 'click',
  show: true,
};

const placements = ['right', 'top', 'bottom', 'left'];

const stories = storiesOf('Tooltip', module);

stories
  .add('basic', () => ({
    directives: { EcTooltip },
    props: {
      content: {
        default: text('content', content),
      },
      placement: {
        default: select('placement', ['top', 'bottom', 'left', 'right'], placement),
      },
      delay: {
        default: number('delay', delay),
      },
      show: {
        default: boolean('show', show),
      },
      classes: {
        default: array('classes', classes),
      },
    },
    template:
    `
      <div class="tw-m-48">
        <div
          class="tw-p-10 tw-rounded tw-text-gray-8 tw-my-auto tw-mx-20 tw-bg-additional-18"
          v-ec-tooltip="{ content, show, placement, delay, classes }">
          Here is a tooltip with all the options that you set in the knobs
        </div>
      </div>
    `,
  }), {
    visualRegressionTests: {
      enabled: false,
    },
  })
  .add('all colors & positions', () => ({
    directives: { EcTooltip },
    data() {
      return {
        tooltipConfig,
        whiteTooltipConfig,
        placements,
      };
    },
    template:
    ` <div class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-min-h-screen tw-bg-gray-5">
        <div class="tw-w-full tw-p-64 tw-my-40">
          <div class="tw-flex tw-flex-row tw-justify-between">
            <div
              v-for="placement in placements"
              class="tw-col-2">
              <div
                v-ec-tooltip="{...tooltipConfig, placement: placement}"
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
                v-ec-tooltip="{...whiteTooltipConfig, placement: placement}"
                class="tw-min-h-64 tw-w-1/2 tw-my-0 tw-mx-auto tw-text-gray-8 tw-p-20 tw-bg-success tw-text-center">
                White tooltip
              </div>
            </div>
          </div>
        </div>  
      </div>
        `,
  }));

export default stories;
