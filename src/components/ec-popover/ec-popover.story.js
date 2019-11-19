import { storiesOf } from '@storybook/vue';
import { select } from '@storybook/addon-knobs';
import EcPopover from './ec-popover.vue';
import EcClosePopover from '../../directives/ec-close-popover';
import EcTooltip from '../../directives/ec-tooltip';

const stories = storiesOf('Popover', module);

stories.add('basic', () => ({
  components: { EcPopover },
  directives: { EcClosePopover },
  props: {
    placement: {
      default: select('placement', ['top', 'bottom', 'left', 'right'], 'top'),
    },
    trigger: {
      default: select('trigger', ['click', 'hover', 'focus', 'manual'], 'click'),
    },
  },
  template: `
    <ec-popover :placement="placement" :trigger="trigger">
      <button class="ec-btn">Activate popover</button>
      <div slot="popover">
        <button v-ec-close-popover>close</button>
        <h1>Now you can see me!</h1>
      </div>
    </ec-popover>
  `,
})).add('z-indices', () => ({
  components: { EcPopover },
  directives: { EcClosePopover, EcTooltip },
  props: {
    placement: {
      default: select('placement', ['top', 'bottom', 'left', 'right'], 'top'),
    },
    trigger: {
      default: select('trigger', ['click', 'hover', 'focus', 'manual'], 'click'),
    },
  },
  template: `
  <div style="display: flex; height: 100vh">
    <div style="margin: auto">
      <h1>Header</h1>
      <ec-popover class="ec-mb-2" popoverClass="ec-popover custompop1" :placement="placement" :trigger="trigger">
        <button v-ec-tooltip="'Custom'" class="ec-btn custom1">Custom</button>
        <div slot="popover" style="background: tomato">
          <button v-ec-close-popover>close</button>
          <h1 v-ec-tooltip="'Custom pop tooltip'">Now you see me!</h1>
        </div>
      </ec-popover>
      <ec-popover class="ec-mb-2" popoverClass="ec-popover custompop2" placement="top" :trigger="trigger">
        <button v-ec-tooltip="'Top'" class="ec-btn custom2">Top</button>
        <div slot="popover" style="background: tomato">
          <button v-ec-close-popover>close</button>
          <h1 v-ec-tooltip="'Top pop tooltip'">Now you see me!</h1>
        </div>
      </ec-popover>
      <ec-popover class="ec-mb-2" popoverClass="ec-popover custompop3" placement="bottom" :trigger="trigger">
        <button v-ec-tooltip="'Bottom'" class="ec-btn custom3">Bottom</button>
        <div slot="popover" style="background: tomato">
          <button v-ec-close-popover>close</button>
          <h1 v-ec-tooltip="'Bottom pop tooltip'">Now you see me!</h1>
        </div>
      </ec-popover>
      <ec-popover class="ec-mb-2" level="modal" placement="right" :trigger="trigger">
        <button v-ec-tooltip="'Right'" class="ec-btn custom4">Right</button>
        <div slot="popover" style="background: tomato">
          <button v-ec-close-popover>close</button>
          <h1 v-ec-tooltip="'Right pop tooltip'">Now you see me!</h1>
        </div>
      </ec-popover>
      <ec-popover class="ec-mb-2" popoverClass="ec-popover custompop5" placement="left" :trigger="trigger">
        <button v-ec-tooltip="'Left'" class="ec-btn custom5">Left</button>
        <div slot="popover" style="background: tomato">
          <button v-ec-close-popover>close</button>
          <h1 v-ec-tooltip="'Left pop tooltip'">Now you see me!</h1>
          <ec-popover class="ec-innerpop" placement="top" :trigger="trigger">
              <button>Foo</button>
              <h2 slot="popover" v-ec-tooltip="'Foo bar tooltip'">Fooo bar</h2>
          </ec-popover>
        </div>
      </ec-popover>
      <h1>Bottom</h1>
      </div>
  </div>`,
}));

export default stories;
