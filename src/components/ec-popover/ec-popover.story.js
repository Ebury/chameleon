import EcPopover from './ec-popover.vue';
import EcClosePopover from '../../directives/ec-close-popover';
import EcTooltip from '../../directives/ec-tooltip';

export default {
  title: 'Popover',
  component: EcPopover,
  argTypes: {
    placement: {
      options: ['right', 'top', 'bottom', 'left'],
      control: { type: 'select' },
    },
    trigger: {
      options: ['hover', 'click', 'focus'],
      control: { type: 'select' },
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { EcPopover },
  directives: { EcClosePopover },
  props: Object.keys(argTypes),
  template: `
    <div class="tw-flex tw-h-screen">
      <div class="tw-m-auto">
        <ec-popover v-bind="$props">
          <button class="ec-btn ec-btn--primary ec-btn--md ec-btn--rounded">Activate popover</button>
          <div slot="popover" class="tw-bg-gray-8 tw-border tw-border-solid tw-border-gray-6 tw-p-8 tw-text-center">
            <h1>Test popover</h1>
            <p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>. Praesent ullamcorper, tortor vitae elementum fringilla, risus leo hendrerit libero, vitae luctus nibh ex non neque. Duis id ligula eros.</p>
            <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded" v-ec-close-popover>Close</button>
          </div>
        </ec-popover>
      </div>
    </div>
  `,
});

export const basic = Template.bind({});

basic.args = {
  placement: 'top',
  trigger: 'click',
  open: true,
  offset: 4,
  delay: 100,
};

export const zIndices = (args, { argTypes }) => ({
  components: { EcPopover },
  directives: { EcClosePopover, EcTooltip },
  props: Object.keys(argTypes),
  template: `
    <div class="tw-flex tw-h-screen">
      <div class="tw-mx-auto tw-mt-20">
        <h1>Header</h1>
        <p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>. Praesent ullamcorper, tortor vitae elementum fringilla, risus leo hendrerit libero, vitae luctus nibh ex non neque. Duis id ligula eros.</p>
        <div class="tw-flex tw-flex-col tw-items-center">
        <ec-popover class="tw-mb-4" popoverClass="ec-popover" v-bind="$props">
          <button v-ec-tooltip="'Custom popover'" class="tw-mb-16 ec-btn ec-btn--primary ec-btn--md ec-btn--rounded">Custom</button>
          <div slot="popover" class="tw-bg-gray-8 tw-border tw-border-solid tw-border-gray-6 tw-p-8 tw-text-center">
            <h1 v-ec-tooltip="'Custom pop tooltip'">Test popover</h1>
            <p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>.</p>
            <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded" v-ec-close-popover>Close</button>
          </div>
        </ec-popover>
        <ec-popover class="tw-mb-4" popoverClass="ec-popover" v-bind="{ ...$props, placement: 'top' }">
          <button v-ec-tooltip="'Top placement popover'" class="tw-mb-16 ec-btn ec-btn--primary ec-btn--md ec-btn--rounded">Top</button>
          <div slot="popover" class="tw-bg-gray-8 tw-border tw-border-solid tw-border-gray-6 tw-p-8 tw-text-center">
            <h1 v-ec-tooltip="'Top popover tooltip'">Test popover</h1>
            <p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>.</p>
            <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded" v-ec-close-popover>Close</button>
          </div>
        </ec-popover>
        <ec-popover class="tw-mb-4" popoverClass="ec-popover" v-bind="{ ...$props, placement: 'bottom' }">
          <button v-ec-tooltip="'Bottom placement popover'" class="tw-mb-16 ec-btn ec-btn--primary ec-btn--md ec-btn--rounded">Bottom</button>
          <div slot="popover" class="tw-bg-gray-8 tw-border tw-border-solid tw-border-gray-6 tw-p-8 tw-text-center">
            <h1 v-ec-tooltip="'Bottom popover tooltip'">Test popover</h1>
            <p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>.</p>
            <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded" v-ec-close-popover>Close</button>
          </div>
        </ec-popover>
        <ec-popover class="tw-mb-4" level="modal" v-bind="{ ...$props, placement: 'right' }">
          <button v-ec-tooltip="'Right placement popover'" class="tw-mb-16 ec-btn ec-btn--primary ec-btn--md ec-btn--rounded">Right</button>
          <div slot="popover" class="tw-bg-gray-8 tw-border tw-border-solid tw-border-gray-6 tw-p-8 tw-text-center">
            <h1 v-ec-tooltip="'Right popover tooltip'">Test popover</h1>
            <p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>.</p>
            <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded" v-ec-close-popover>Close</button>
          </div>
        </ec-popover>
        <ec-popover class="tw-mb-4" popoverClass="ec-popover" v-bind="{ ...$props, placement: 'left' }">
          <button v-ec-tooltip="'Left placement popover'" class="tw-mb-16 ec-btn ec-btn--primary ec-btn--md ec-btn--rounded">Left</button>
          <div slot="popover" class="tw-bg-gray-8 tw-border tw-border-solid tw-border-gray-6 tw-p-8 tw-text-center">
            <h1 v-ec-tooltip="'Left popover tooltip'">Test popover</h1>
            <p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>.</p>
            <ec-popover class="tw-mb-8" v-bind="{ ...$props, placement: 'top' }">
              <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded">Open nested popover</button>
              <div slot="popover" class="tw-bg-gray-8 tw-border tw-border-solid tw-border-gray-6 tw-p-8 tw-text-center" v-ec-tooltip="'Nested popover'">
                <h1 v-ec-tooltip="'Right popover tooltip'">Test nested popover</h1>
                <p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>.</p>
                <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded" v-ec-close-popover>Close</button>
              </div>
            </ec-popover>
            <button v-ec-close-popover class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded">Close</button>
          </div>
        </ec-popover>
        </div>
        <h1>Footer</h1>
        <p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>. Praesent ullamcorper, tortor vitae elementum fringilla, risus leo hendrerit libero, vitae luctus nibh ex non neque. Duis id ligula eros.</p>
      </div>
    </div>
  `,
});

zIndices.args = {
  placement: 'top',
  trigger: 'click',
  open: false,
  offset: 8,
  delay: 100,
};

zIndices.parameters = {
  docs: { disable: true },
};
