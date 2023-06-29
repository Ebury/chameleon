import EcClosePopover from '../../directives/ec-close-popover';
import EcTooltip from '../../directives/ec-tooltip';
import EcPopover from './ec-popover.vue';

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

const Template = ({ trigger, ...args }) => ({
  components: { EcPopover },
  directives: { EcClosePopover },
  setup() {
    return {
      args,
      trigger,
    };
  },
  template: `
    <div class="tw-flex tw-h-screen">
      <div class="tw-m-auto">
        <ec-popover v-bind="{ ...args, triggers: [trigger] }">
          <button class="ec-btn ec-btn--primary ec-btn--md ec-btn--rounded">Activate popover</button>
          <template #popper="{ hide }">
            <div class="tw-bg-gray-8 tw-border tw-border-solid tw-border-gray-6 tw-p-8 tw-text-center">
            <h1 data-test="test-popover-header">Test popover</h1>
            <p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>. Praesent ullamcorper, tortor vitae elementum fringilla, risus leo hendrerit libero, vitae luctus nibh ex non neque. Duis id ligula eros.</p>
            <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded" @click="hide">Close (fn)</button>
            <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded tw-ml-8" v-ec-close-popover>Close (directive)</button>
          </div>
          </template>
        </ec-popover>
      </div>
    </div>
  `,
});

export const basic = Template.bind({});

basic.args = {
  placement: 'top',
  trigger: 'click',
  shown: true,
  distance: 4,
  skidding: 0,
  disabled: false,
  delay: 100,
  autoHide: true,
};

basic.parameters = {
  visualRegressionTests: {
    waitOn: '[data-test~=test-popover-header]',
  },
};

export const zIndices = ({ trigger, ...args }) => ({
  components: { EcPopover },
  directives: { EcTooltip },
  setup() {
    return { args, trigger };
  },
  template: `
    <div class="tw-flex tw-h-screen">
      <div class="tw-mx-auto tw-mt-20">
        <h1>Header</h1>
        <p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>. Praesent ullamcorper, tortor vitae elementum fringilla, risus leo hendrerit libero, vitae luctus nibh ex non neque. Duis id ligula eros.</p>
        <div class="tw-flex tw-flex-col tw-items-center">
        <ec-popover class="tw-mb-4" v-bind="{ ...args, triggers: [trigger] }">
          <button v-ec-tooltip="'Custom popover'" class="tw-mb-16 ec-btn ec-btn--primary ec-btn--md ec-btn--rounded">Custom</button>
          <template #popper="{ hide }">
            <div class="tw-bg-gray-8 tw-border tw-border-solid tw-border-gray-6 tw-p-8 tw-text-center">
              <h1 v-ec-tooltip="'Custom pop tooltip'">Test popover</h1>
              <p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>.</p>
              <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded" @click="hide">Close</button>
            </div>
          </template>
        </ec-popover>
        <ec-popover class="tw-mb-4" v-bind="{ ...args, triggers: [trigger], placement: 'top' }">
          <button v-ec-tooltip="'Top placement popover'" class="tw-mb-16 ec-btn ec-btn--primary ec-btn--md ec-btn--rounded">Top</button>
          <template #popper="{ hide }">
            <div class="tw-bg-gray-8 tw-border tw-border-solid tw-border-gray-6 tw-p-8 tw-text-center">
              <h1 v-ec-tooltip="'Top popover tooltip'">Test popover</h1>
              <p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>.</p>
              <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded" @click="hide">Close</button>
            </div>
          </template>
        </ec-popover>
        <ec-popover class="tw-mb-4" v-bind="{ ...args, triggers: [trigger], placement: 'bottom' }">
          <button v-ec-tooltip="'Bottom placement popover'" class="tw-mb-16 ec-btn ec-btn--primary ec-btn--md ec-btn--rounded">Bottom</button>
          <template #popper="{ hide }">
            <div class="tw-bg-gray-8 tw-border tw-border-solid tw-border-gray-6 tw-p-8 tw-text-center">
              <h1 v-ec-tooltip="'Bottom popover tooltip'">Test popover</h1>
              <p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>.</p>
              <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded" @click="hide">Close</button>
            </div>
          </template>
        </ec-popover>
        <ec-popover class="tw-mb-4" v-bind="{ ...args, placement, triggers: [trigger], placement: 'right' }" level="modal">
          <button v-ec-tooltip="'Right placement popover'" class="tw-mb-16 ec-btn ec-btn--primary ec-btn--md ec-btn--rounded">Right</button>
          <template #popper="{ hide }">
            <div class="tw-bg-gray-8 tw-border tw-border-solid tw-border-gray-6 tw-p-8 tw-text-center">
              <h1 v-ec-tooltip="'Right popover tooltip'">Test popover</h1>
              <p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>.</p>
              <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded" @click="hide">Close</button>
            </div>
          </template>
        </ec-popover>
        <ec-popover class="tw-mb-4" v-bind="{ ...args, triggers: [trigger], placement: 'left' }">
          <button v-ec-tooltip="'Left placement popover'" class="tw-mb-16 ec-btn ec-btn--primary ec-btn--md ec-btn--rounded">Left</button>
          <template #popper="{ hide }">
            <div class="tw-bg-gray-8 tw-border tw-border-solid tw-border-gray-6 tw-p-8 tw-text-center">
              <h1 v-ec-tooltip="'Left popover tooltip'">Test popover</h1>
              <p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>.</p>
              <ec-popover class="tw-mb-8" v-bind="{ ...args, triggers: [trigger], placement: 'top' }">
                <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded">Open nested popover</button>
                <template #popper="{ hide }">
                  <div class="tw-bg-gray-8 tw-border tw-border-solid tw-border-gray-6 tw-p-8 tw-text-center" v-ec-tooltip="'Nested popover'">
                    <h1 v-ec-tooltip="'Right popover tooltip'">Test nested popover</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>.</p>
                    <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded" @click="hide">Close</button>
                  </div>
                </template>
              </ec-popover>
              <button @click="hide" class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded">Close</button>
            </div>
          </template>
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
  shown: false,
  distance: 8,
  skidding: 0,
  delay: 100,
};

zIndices.parameters = {
  docs: { disable: true },
};
