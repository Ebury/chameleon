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
  <div class="tw-flex tw-h-screen">
    <div class="tw-m-auto">
      <ec-popover open :placement="placement" :trigger="trigger">
        <button class="ec-btn ec-btn--primary ec-btn--md ec-btn--rounded">Activate popover</button>
        <div slot="popover" class="tw-bg-gray-8">
          <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded" v-ec-close-popover>close</button>
          <h1>Now you can see me!</h1>
        </div>
      </ec-popover>
    </div>
  </div>
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
  <div class="tw-flex tw-h-screen">
    <div class="tw-m-auto">
      <h1>Header</h1>
      <ec-popover class="tw-mb-4" popoverClass="ec-popover" :placement="placement" :trigger="trigger">
        <button v-ec-tooltip="'Custom'" class="tw-mb-16 ec-btn ec-btn--primary ec-btn--md ec-btn--rounded">Custom</button>
        <div slot="popover" class="tw-bg-gray-8">
          <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded" v-ec-close-popover>close</button>
          <h1 v-ec-tooltip="'Custom pop tooltip'">Now you see me!</h1>
        </div>
      </ec-popover>
      <ec-popover class="tw-mb-4" popoverClass="ec-popover" placement="top" :trigger="trigger">
        <button v-ec-tooltip="'Top'" class="tw-mb-16 ec-btn ec-btn--primary ec-btn--md ec-btn--rounded">Top</button>
        <div slot="popover" class="tw-bg-gray-8">
          <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded" v-ec-close-popover>close</button>
          <h1 v-ec-tooltip="'Top pop tooltip'">Now you see me!</h1>
        </div>
      </ec-popover>
      <ec-popover class="tw-mb-4" popoverClass="ec-popover" placement="bottom" :trigger="trigger">
        <button v-ec-tooltip="'Bottom'" class="tw-mb-16 ec-btn ec-btn--primary ec-btn--md ec-btn--rounded">Bottom</button>
        <div slot="popover" class="tw-bg-gray-8">
          <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded" v-ec-close-popover>close</button>
          <h1 v-ec-tooltip="'Bottom pop tooltip'">Now you see me!</h1>
        </div>
      </ec-popover>
      <ec-popover class="tw-mb-4" level="modal" placement="right" :trigger="trigger">
        <button v-ec-tooltip="'Right'" class="tw-mb-16 ec-btn ec-btn--primary ec-btn--md ec-btn--rounded">Right</button>
        <div slot="popover" class="tw-bg-gray-8">
          <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded" v-ec-close-popover>close</button>
          <h1 v-ec-tooltip="'Right pop tooltip'">Now you see me!</h1>
        </div>
      </ec-popover>
      <ec-popover class="tw-mb-4" popoverClass="ec-popover" placement="left" :trigger="trigger">
        <button v-ec-tooltip="'Left'" class="tw-mb-16 ec-btn ec-btn--primary ec-btn--md ec-btn--rounded">Left</button>
        <div slot="popover" class="tw-bg-gray-8">
          <button v-ec-close-popover class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded">close</button>
          <h1 v-ec-tooltip="'Left pop tooltip'">Now you see me!</h1>
          <ec-popover placement="top" :trigger="trigger">
              <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded">Foo</button>
              <h2 slot="popover" class="tw-bg-gray-8" v-ec-tooltip="'Foo bar tooltip'">Fooo bar</h2>
          </ec-popover>
        </div>
      </ec-popover>
      <h1>Footer</h1>
    </div>
  </div>`,
}));
