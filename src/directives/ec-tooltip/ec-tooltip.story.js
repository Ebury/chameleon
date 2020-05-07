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
      <div style="margin: 50px;">
        <div
          style="padding: 10px; border-radius: 5px; color: white; margin: auto 20px; background: rgb(109, 81, 44);"
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
    ` <div style="background-color:rgb(132, 149, 154); min-height: 100vh;">
        <div style="display:flex; flex-direction: row; height: 50vh;">
          <div
            v-for="placement in placements"
            style="flex-basis: 25%;display:flex; flex-direction: row; justify-content:center;align-items:center;">
            <div
              v-ec-tooltip="{...tooltipConfig, placement: placement}"
              style="max-width: 80px; min-height: 100px; background:rgb(21, 188, 139); color: white; padding: 20px;">
              Black tooltip
            </div>
          </div>
        </div>

        <div style="display:flex; flex-direction: row; height: 50vh;">
          <div
            v-for="placement in placements"
            style="flex-basis: 25%;display:flex; flex-direction: row; justify-content:center;align-items:center;">
            <div
              v-ec-tooltip="{...whiteTooltipConfig, placement: placement}"
              style="max-width: 80px; min-height: 100px; background:rgb(21, 188, 139); color: white; padding: 20px;">
              White tooltip
            </div>
          </div>
        </div>
      </div>
        `,
  }));

export default stories;
