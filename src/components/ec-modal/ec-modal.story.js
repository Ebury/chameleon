import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import EcTooltip from '../../directives/ec-tooltip/ec-tooltip';
import EcIcon from '../ec-icon';
import EcModal from './ec-modal.vue';

const stories = storiesOf('Modal', module);

const tooltipConfig = {
  content: "<p>If you are experiencing issues, please send an email to: <a href='mailto:operationsteam@ebury.com'>operationsteam@ebury.com</a></p>",
  classes: ['ec-tooltip--bg-bright'],
  trigger: 'click',
  placement: 'bottom',
};

stories
  .add('basic', () => ({
    components: { EcModal, EcIcon },
    directives: { EcTooltip },
    props: {
      showModalFromProps: {
        default: boolean('Show Modal', true),
      },
      showFooterLeftContent: {
        default: boolean('Footer Right Content', true),
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
        tooltipConfig,
      };
    },
    methods: {
      rejected() {
        this.showModal = false;
        action('User rejected the modal')();
      },
      accepted() {
        this.showModal = false;
        action('User accepted the modal')();
      },
      onClose() {
        action('User closed the modal')();
      },
    },
    template: `
      <div>
        <ec-modal
          v-if="!isLarge"
          :large = "isLarge"
          :showFooterLeftContent="showFooterLeftContent"
          :showCloseIcon="showCloseIcon"
          @negative = "rejected()"
          @positive = "accepted()"
          @close = "onClose()"
          v-model="showModal">

          <template #header>
            <h2>Update your management accounts</h2>
          </template>

          <template #main>
            <p class="ec-mt--0">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
            <p>Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
          </template>

          <template #footer-left-content>
            <div 
              style="display: flex;flex-grow-1;align-items:center;cursor:pointer;"
              v-ec-tooltip="tooltipConfig"
            >
              <ec-icon
                class="ec-mr--8"
                name="simple-help"
                :size="18"
              />
              Need help?
            </div>
          </template>
          <template #negative v-if="negativeHasText">Skip For Now</template>
          <template #positive v-if="positiveHasText">Update management accounts</template>
        </ec-modal>

        <ec-modal
          v-if="isLarge"
          :large = "isLarge"
          :showFooterLeftContent="showFooterLeftContent"
          :showCloseIcon="showCloseIcon"
          @negative = "rejected()"
          @positive = "accepted()"
          @close = "onClose()"
          v-model="showModal">
          <template #header>
            <h2>Update your management accounts</h2>
          </template>

          <template #main>
            <div style="display:flex;flex-basis:1;">
              <div>
                <p class="ec-mt--0">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
                <p v-for="i in 20">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
              </div>

              <div>
                <p class="ec-mt--0">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
                <p v-for="i in 20">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
              </div>
            </div>
          </template>

          <template #footer-left-content>
            <div 
              style="display: flex;flex-grow-1;align-items:center;cursor:pointer;"
              v-ec-tooltip="tooltipConfig"
            >
              <ec-icon
                class="ec-mr--8"
                name="simple-help"
                :size="18"
              />
              Need help?
            </div>
          </template>
          <template #negative v-if="negativeHasText">Skip for now</template>
          <template #positive v-if="positiveHasText">Update management accounts</template>
        </ec-modal>
      </div>
      `,
  }));

export default stories;
