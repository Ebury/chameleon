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

const stories = storiesOf('Tooltip', module);

stories.add('basic', () => ({
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
}));

export default stories;
