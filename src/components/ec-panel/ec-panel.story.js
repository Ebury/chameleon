import { action } from '@storybook/addon-actions';
import { toRefs } from 'vue';

import { fixedContainerDecorator } from '../../../.storybook/utils';
import EcPanel from './ec-panel.vue';

export default {
  title: 'Panel',
  component: EcPanel,
  decorators: [
    fixedContainerDecorator(),
  ],
};

export const basic = storyArgs => ({
  components: { EcPanel },
  setup() {
    const {
      show: model,
      numberOfBodyParagraphs,
      numberOfPanelParagraphs,
      showHeader,
      showFooter,
    } = toRefs(storyArgs);

    return {
      model,
      numberOfBodyParagraphs,
      numberOfPanelParagraphs,
      showHeader,
      showFooter,
      onBack: action('back'),
      onClose: action('close'),
    };
  },
  template: `
    <div class="tw-bg-gray-7 tw-min-h-screen ec-panel-container">
      <div class="tw-max-w-screen-lg tw-my-0 tw-mx-auto tw-bg-gray-8 tw-p-24">
        <h1 class="tw-m-24">Panel story</h1>

        <div v-for="i in numberOfBodyParagraphs" class="tw-m-24">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum nobis obcaecati optio magnam, porro inventore? Suscipit sit atque a! Ullam provident quidem recusandae, itaque error labore porro inventore? Suscipit sit atque a! Ullam provident quidem recusandae, itaque error labore</div>

        <ec-panel
          v-model:show="model"
          v-on="{
            back: onBack,
            close: onClose,
          }"
        >
          <template v-if="showHeader" #header>
            <h3 class="tw-mb-24">Header</h3>

            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
          </template>

          <template #main>
            <h3>Main</h3>

            <p v-for="i in numberOfPanelParagraphs">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum nobis obcaecati optio magnam, porro inventore?</p>
          </template>

          <template v-if="showFooter" #footer>
            <h3>Footer</h3>

            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>

            <div class="tw-mt-36 tw-text-center">
              <a href="#" class="ec-btn ec-btn--primary ec-btn--rounded ec-btn--md">Lorem, ipsum</a>
            </div>
          </template>
        </ec-panel>
      </div>
    </div>
  `,
});

basic.args = {
  show: true,
  showHeader: true,
  showFooter: true,
  numberOfBodyParagraphs: 3,
  numberOfPanelParagraphs: 1,
};
