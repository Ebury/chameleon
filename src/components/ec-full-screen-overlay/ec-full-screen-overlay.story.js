import { action } from '@storybook/addon-actions';

import { fixedContainerDecorator } from '../../../.storybook/utils';
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

export const withSlots = args => ({
  components: { EcFullScreenOverlay },
  setup() {
    return { args };
  },
  template: `
    <div>
      <div>Background Text</div>

      <ec-full-screen-overlay
        v-bind="args"
        v-on="{ close: onClose }"
      >
        <template #header>
          <div>
            <div>Lorem logo</div>
            <h1 class="tw-mt-24">Lorem Title</h1>
          </div>
        </template>

        <template #main>
          <p v-for="i in 10">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a tristique enim. Nulla consequat vitae metus in ultricies. Curabitur dapibus, purus quis finibus rhoncus, purus augue blandit neque, quis fringilla urna justo consequat arcu. Nulla facilisi. Sed varius metus tempor, porta nunc in, pulvinar arcu. Duis quis lacus vehicula, lacinia arcu in, cursus tellus.</p>
        </template>
      </ec-full-screen-overlay>
    </div>
  `,
});

withSlots.args = { ...basic.args };
