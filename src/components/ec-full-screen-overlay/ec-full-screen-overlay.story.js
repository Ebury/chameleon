import { action } from '@storybook/addon-actions';

import { fixedContainerDecorator } from '../../../.storybook/utils';
import EcBtn from '../ec-btn';
import EcFullScreenOverlay from './ec-full-screen-overlay.vue';

export default {
  title: 'Full Screen Overlay',
  component: EcFullScreenOverlay,
  decorators: [
    fixedContainerDecorator(),
  ],
};

const Template = args => ({
  components: { EcFullScreenOverlay },
  setup() {
    return {
      args,
      onClose: action('close'),
    };
  },
  template: `
    <div>
      <div>Background Text</div>
      <ec-full-screen-overlay
        v-bind="args"
        v-on="{ close: onClose }"
      />
    </div>
  `,
});

export const basic = Template.bind({});
basic.args = {
  title: 'Lorem title',
  show: true,
};

export const withHeaderSlot = args => ({
  components: { EcFullScreenOverlay },
  setup() {
    return { args, onClose: action('close') };
  },
  template: `
    <div>
      <div>Background Text</div>

      <ec-full-screen-overlay
        v-bind="args"
        v-on="{ close: onClose }"
      >
        <template #header>
          <div class="tw-text-key-4">
            <div>Lorem logo</div>
            <h1 class="tw-mt-24">Lorem Title</h1>
          </div>
        </template>
      </ec-full-screen-overlay>
    </div>
  `,
});
withHeaderSlot.args = { ...basic.args };

export const withMainSlot = args => ({
  components: { EcFullScreenOverlay },
  setup() {
    return { args, onClose: action('close') };
  },
  template: `
    <div>
      <div>Background Text</div>

      <ec-full-screen-overlay
        v-bind="args"
        v-on="{ close: onClose }"
      >
        <template #main>
          <p v-for="i in 10">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a tristique enim. Nulla consequat vitae metus in ultricies. Curabitur dapibus, purus quis finibus rhoncus, purus augue blandit neque, quis fringilla urna justo consequat arcu. Nulla facilisi. Sed varius metus tempor, porta nunc in, pulvinar arcu. Duis quis lacus vehicula, lacinia arcu in, cursus tellus.</p>
        </template>
      </ec-full-screen-overlay>
    </div>
  `,
});
withMainSlot.args = { ...basic.args };

export const backgroundColorLevel = Template.bind({});
backgroundColorLevel.args = {
  title: 'Lorem title',
  show: true,
  backgroundColorLevel: 0,
};

export const withContentSlot = args => ({
  components: { EcFullScreenOverlay, EcBtn },
  setup() {
    return { args };
  },
  template: `
    <div>
      <div>Background Text</div>

      <ec-full-screen-overlay
        v-bind="args"
      >
        <template #content>
          <div style="width:600px" class="tw-bg-gray-8 tw-p-32">
            <h1>Slot content</h1>
            <p v-for="i in 3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a tristique enim. Nulla consequat vitae metus in ultricies. Curabitur dapibus, purus quis finibus rhoncus, purus augue blandit neque, quis fringilla urna justo consequat arcu. Nulla facilisi. Sed varius metus tempor, porta nunc in, pulvinar arcu. Duis quis lacus vehicula, lacinia arcu in, cursus tellus.</p>
            <div class="tw-flex tw-justify-end">
              <ec-btn
                class="tw-mr-16"
                is-rounded
                :is-submit="false"
                category="secondary"
              >
                Cancel
              </ec-btn>
              <ec-btn
                category="primary"
                is-rounded
                :is-submit="false"
              >
                Submit
              </ec-btn>
            </div>
          </div>
        </template>
      </ec-full-screen-overlay>
    </div>
  `,
});
withContentSlot.args = { ...basic.args, backgroundColorLevel: 7 };
