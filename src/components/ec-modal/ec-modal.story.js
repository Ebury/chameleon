import { storiesOf } from '@storybook/vue';
import { boolean, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import EcTooltip from '../../directives/ec-tooltip/ec-tooltip';
import EcIcon from '../ec-icon';
import EcModal from './ec-modal.vue';

const stories = storiesOf('Modal', module);

const tooltipConfig = {
  content: "<p>If you are experiencing issues, please send an email to: <a href='mailto:operationsteam@ebury.com'>operationsteam@ebury.com</a></p>",
  classes: ['ec-tooltip--bg-bright ec-tooltip--modal'],
  trigger: 'click',
  placement: 'bottom',
};

const NEGATIVE_BUTTON_GROUP_ID = 'Negative Button';
const POSITIVE_BUTTON_GROUP_ID = 'Positive Button';

const buttonCategories = ['', 'primary', 'secondary', 'success', 'error', 'warning'];

stories
  .add('stackable', () => ({
    components: { EcModal },
    props: {
      zIndex: {
        default: number('Z Index', 201),
      },
    },
    data() {
      return {
        showFirstModal: true,
        showSecondModal: true,
      };
    },
    methods: {
      firstModalAction: action('First modal action'),
      secondModalAction: action('Second modal action'),
    },
    template: `
    <div>
      <ec-modal
        is-closable
        large
        v-model="showFirstModal">

        <template #header>
          <h2>First Modal</h2>
        </template>

        <template #main>
        <a @click.prevent.stop="firstModalAction()">Action first modal</a>
          <p class="ec-mt--0">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
        </template>
      </ec-modal>

      <ec-modal
        is-closable
        :z-index="zIndex"
        v-model="showSecondModal">

        <template #header>
          <h2>Second Modal</h2>
        </template>

        <template #main>
          <a @click.prevent.stop="secondModalAction()">Action second modal</a>
          <p class="ec-mt--0">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
        </template>
      </ec-modal>
    </div>
  `,
  }))
  .add('basic', () => ({
    components: { EcModal, EcIcon },
    directives: { EcTooltip },
    props: {
      showModalFromProps: {
        default: boolean('Show Modal', true),
      },
      showFooterLeftContent: {
        default: boolean('Footer Left Content', true),
      },
      isClosable: {
        default: boolean('Show Close Icon', true),
      },
      isLarge: {
        default: boolean('Is large', false),
      },
      zIndex: {
        default: number('Z Index', 201),
      },
      negativeHasText: {
        default: boolean('Has Text', true, NEGATIVE_BUTTON_GROUP_ID),
      },
      isNegativeLoading: {
        default: boolean('Is Loading', false, NEGATIVE_BUTTON_GROUP_ID),
      },
      negativeButtonCategory: {
        default: select('Button Category', buttonCategories, '', NEGATIVE_BUTTON_GROUP_ID),
      },
      positiveHasText: {
        default: boolean('Has Text', true, POSITIVE_BUTTON_GROUP_ID),
      },
      isPositiveLoading: {
        default: boolean('Is Loading', false, POSITIVE_BUTTON_GROUP_ID),
      },
      positiveButtonCategory: {
        default: select('Button Category', buttonCategories, '', POSITIVE_BUTTON_GROUP_ID),
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
        <p>A qui dolorum voluptatibus ratione corrupti <a href="#">dignissimos</a> quia, alias ut excepturi. Reprehenderit quisquam dolorem eius rerum dignissimos porro sunt asperiores architecto, quidem totam necessitatibus voluptas molestiae pariatur consectetur. Ullam architecto minima animi alias aliquam, voluptates dicta. Ea ipsam alias autem laboriosam est accusamus distinctio praesentium minima? Impedit repudiandae provident reprehenderit ut beatae ducimus mollitia eius magni hic, quibusdam, ipsa voluptate porro vel non enim dolores at. Repellat.</p>
        <ec-modal
          v-if="!isLarge"
          :large = "isLarge"
          :is-closable="isClosable"
          :is-loading="{ positive: isPositiveLoading, negative: isNegativeLoading }"
          :category="{ positive: positiveButtonCategory || null, negative: negativeButtonCategory || null }"
          @negative = "rejected()"
          @positive = "accepted()"
          @close = "onClose()"
          :z-index="zIndex"
          v-model="showModal">

          <template #header>
            <h2>Update your management accounts</h2>
          </template>

          <template #main>
            <p class="ec-mt--0">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
            <p>Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
          </template>

          <template #footerLeftContent v-if="showFooterLeftContent">
            <a href="#" @click.prevent style="display:inline-block;">
              <span
                style="display: inline-flex;flex-grow-1;align-items:center;cursor:pointer;color: #00bef0;fill:#00bef0; vertical-align:top;"
                v-ec-tooltip="tooltipConfig"
              >
                <ec-icon
                  class="ec-mr--8"
                  name="simple-help"
                  :size="18"
                />
                Need help?
              </span>
            </a>
          </template>
          <template #negative v-if="negativeHasText">Skip For Now</template>
          <template #positive v-if="positiveHasText">Update management accounts</template>
        </ec-modal>

        <ec-modal
          v-if="isLarge"
          :large = "isLarge"
          :isClosable="isClosable"
          @negative = "rejected()"
          @positive = "accepted()"
          @close = "onClose()"
          :z-index="zIndex"
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

          <template #footerLeftContent v-if="showFooterLeftContent">
            <a href="#" @click.prevent style="display:inline-block;">
              <span
                style="display: inline-flex;flex-grow-1;align-items:center;cursor:pointer;color: #00bef0;fill:#00bef0; vertical-align:top;"
                v-ec-tooltip="tooltipConfig"
              >
                <ec-icon
                  class="ec-mr--8"
                  name="simple-help"
                  :size="18"
                />
                Need help?
              </span>
            </a>
          </template>
          <template #negative v-if="negativeHasText">Skip for now</template>
          <template #positive v-if="positiveHasText">Update management accounts</template>
        </ec-modal>


        <p>A qui dolorum voluptatibus ratione corrupti dignissimos quia, alias ut excepturi. Reprehenderit quisquam dolorem eius rerum dignissimos porro sunt asperiores architecto, quidem totam necessitatibus voluptas molestiae pariatur consectetur. Ullam architecto minima animi alias aliquam, voluptates dicta. Ea ipsam alias autem laboriosam est accusamus distinctio praesentium minima? Impedit repudiandae provident reprehenderit ut beatae ducimus mollitia eius magni hic, quibusdam, ipsa voluptate porro vel non enim dolores at. Repellat.</p>
      </div>
      `,
  }), {
    visualRegressionTests: {
      knobs: {
        large: { 'Is large': true },
        'no-texts': { [`Has Text_${NEGATIVE_BUTTON_GROUP_ID}`]: false, [`Has Text_${POSITIVE_BUTTON_GROUP_ID}`]: false },
        category: { [`Button Category_${NEGATIVE_BUTTON_GROUP_ID}`]: buttonCategories[3], [`Button Category_${POSITIVE_BUTTON_GROUP_ID}`]: buttonCategories[4] },
      },
    },
  });
