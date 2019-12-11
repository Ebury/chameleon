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
  content: '<p>This is the normal tooltip</p>',
  placement: 'bottom',
  show: true,
};

const whiteTooltipConfig = {
  content: '<p>This is a popover style tooltip</p>',
  classes: ['ec-tooltip--bg-bright'],
  trigger: 'click',
  show: true,
  placement: 'bottom',
};


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
  }))
  .add('all colors', () => ({
    directives: { EcTooltip },
    data() {
      return {
        tooltipConfig,
        whiteTooltipConfig,
      };
    },
    template:
    ` <div style="background-color:rgb(132, 149, 154); width: 100vw; height: 100vh; display:flex; flex-direction: column; align-items: center;justify-content: center;">
        <div style="max-width: 200px;margin: 50px;background:rgb(21, 188, 139);color: white; padding: 20px;" v-ec-tooltip="tooltipConfig"> Black background tooltip</div>
        <div style="max-width: 200px;margin: 50px;background:rgb(21, 188, 139);color: white; padding: 20px;" v-ec-tooltip="whiteTooltipConfig"> White background tooltip</div>
      </div>
    `,
  }));

export default stories;
