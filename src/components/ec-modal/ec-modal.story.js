/* eslint-disable no-alert, no-console */
import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';
import EcModal from './ec-modal.vue';

const stories = storiesOf('Modal', module);

stories
  .add('basic', () => ({
    components: { EcModal },
    props: {
      showModalFromProps: {
        default: boolean('Show Modal', true),
      },
      showHelpLink: {
        default: boolean('Help Link', true),
      },
      showCloseIcon: {
        default: boolean('Show Close Icon', true),
      },
      isLarge: {
        default: boolean('Is large', false),
      },
      negativeHasText: {
        default: boolean('Negative Button Has Text', true),
      },
      positiveHasText: {
        default: boolean('Positive Has Text', true),
      },
    },
    watch: {
      showModalFromProps: {
        immediate: true,
        handler(newValue) {
          this.showModal = newValue;
        },
      },
    },
    data() {
      return {
        showModal: false,
      };
    },
    methods: {
      negativeMethod() {
        this.showModal = false;
        console.log('Submit a form or similar');
      },
      positiveMethod() {
        this.showModal = false;
        console.log('Submit a form or similar');
      },
      closeMethod() {
        console.log('Register the event or similar');
      },
    },
    template: `
      <div>
        <ec-modal
          v-if="!isLarge"
          :large = "isLarge"
          :showHelpLink="showHelpLink"
          :showCloseIcon="showCloseIcon"
          @negativeAction = "negativeMethod()"
          @positiveAction = "positiveMethod()"
          @closeModal = "closeMethod()"
          v-model="showModal">

          <template #header>
            <h2>Update your management accounts</h2>
          </template>

          <template #main>
            <p class="ec-mt--0">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
          </template>

          <template #negative v-if="negativeHasText">Skip For Now</template>
          <template #positive v-if="positiveHasText">Update management accounts</template>
        </ec-modal>

        <ec-modal
          v-if="isLarge"
          :large = "isLarge"
          :showHelpLink="showHelpLink"
          :showCloseIcon="showCloseIcon"
          @negativeAction = "negativeMethod()"
          @positiveAction = "positiveMethod()"
          @closeModal = "closeMethod()"
          v-model="showModal">
          <template #header>
            <h2>Update your management accounts</h2>
          </template>

          <template #main>
            <div style="display:flex;flex-basis:1;">
              <div class="ec-mt--0">
                <p v-for="i in 10">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
              </div>

              <div>
                <p v-for="i in 10">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
              </div>
            </div>
          </template>

          <template #negative v-if="negativeHasText">Skip for now</template>
          <template #positive v-if="positiveHasText">Update management accounts</template>
        </ec-modal>
      </div>
      `,
  }));

export default stories;
