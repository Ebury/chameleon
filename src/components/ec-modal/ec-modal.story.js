import { action } from '@storybook/addon-actions';
import { reactive, ref, toRefs } from 'vue';

import { fixedContainerDecorator } from '../../../.storybook/utils';
import EcTooltip from '../../directives/ec-tooltip/ec-tooltip';
import EcIcon from '../ec-icon';
import EcModal from './ec-modal.vue';

export default {
  title: 'Modal',
  component: EcModal,
  decorators: [
    fixedContainerDecorator(),
  ],
};

const basicProps = {
  show: true,
  showFooterLeftContent: true,
  isClosable: true,
  large: false,
  zIndex: 201,
  isLoading: {
    positive: false,
    negative: false,
  },
  category: {
    positive: null,
    negative: null,
  },
  positiveButtonProps: {
    isDisabled: false,
  },
  negativeButtonProps: {
    isDisabled: false,
  },
  negativeHasText: true,
  positiveHasText: true,
};

export const basic = storyArgs => ({
  components: { EcModal, EcIcon },
  directives: { EcTooltip },
  setup() {
    const {
      large,
      show,
      isClosable,
      isLoading,
      category,
      showFooterLeftContent,
      negativeHasText,
      positiveHasText,
      zIndex,
      positiveButtonProps,
      negativeButtonProps,
      ...rest
    } = toRefs(storyArgs);
    const args = reactive(rest);

    const model = ref(show);
    const tooltipConfig = ref({
      content: "<p>If you are experiencing issues, please send an email to: <a href='mailto:operationsteam@ebury.com'>operationsteam@ebury.com</a></p>",
      popperClass: ['ec-tooltip--bg-bright ec-tooltip--modal'],
      triggers: ['click'],
      placement: 'bottom',
    });

    return {
      model,
      tooltipConfig,
      large,
      args,
      isClosable,
      isLoading,
      category,
      showFooterLeftContent,
      negativeHasText,
      positiveHasText,
      positiveButtonProps,
      negativeButtonProps,
      zIndex,
      onReject: action('reject'),
      onAccept: action('accept'),
      onClose: action('close'),
    };
  },
  template: `
    <div>
      <p>A qui dolorum voluptatibus ratione corrupti <a href="#">dignissimos</a> quia, alias ut excepturi. Reprehenderit quisquam dolorem eius rerum dignissimos porro sunt asperiores architecto, quidem totam necessitatibus voluptas molestiae pariatur consectetur. Ullam architecto minima animi alias aliquam, voluptates dicta. Ea ipsam alias autem laboriosam est accusamus distinctio praesentium minima? Impedit repudiandae provident reprehenderit ut beatae ducimus mollitia eius magni hic, quibusdam, ipsa voluptate porro vel non enim dolores at. Repellat.</p>
      <ec-modal
        v-if="!large"
        v-model:show="model"
        :large="large"
        :positive-button-props="positiveButtonProps"
        :negative-button-props="negativeButtonProps"
        :is-closable="isClosable"
        :is-loading="isLoading"
        :category="category"
        :z-index="zIndex"
        v-on="{
          negative: onReject,
          positive: onAccept,
          close: onClose,
        }"
      >

        <template #header>
          <h2>Update your management accounts</h2>
        </template>

        <template #main>
          <p class="tw-mt-0">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
          <p>Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
        </template>

        <template #footerLeftContent v-if="showFooterLeftContent">
          <a href="#" class="tw-inline-block" @click.prevent>
            <span
              v-ec-tooltip="tooltipConfig"
              class="tw-inline-flex tw-flex-grow tw-items-center tw-cursor-pointer tw-align-top tw-fill-key-4 tw-text-key-4"
            >
              <ec-icon
                class="tw-mr-8"
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
        v-if="large"
        v-model:show="model"
        :large="large"
        :is-closable="isClosable"
        :is-loading="isLoading"
        :category="category"
        :z-index="zIndex"
        v-on="{
          negative: onReject,
          positive: onAccept,
          close: onClose,
        }"
      >
        <template #header>
          <h2>Update your management accounts</h2>
        </template>

        <template #main>
          <div class="tw-flex">
            <div>
              <p class="tw-mt-0">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
              <p v-for="i in 20">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
            </div>

            <div>
              <p class="tw-mt-0">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
              <p v-for="i in 20">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
            </div>
          </div>
        </template>

        <template #footerLeftContent v-if="showFooterLeftContent">
          <a href="#" class="tw-inline-block" @click.prevent>
            <span
              v-ec-tooltip="tooltipConfig"
              class="tw-inline-flex tw-flex-grow tw-items-center tw-cursor-pointer tw-align-top tw-fill-key-4 tw-text-key-4"
            >
              <ec-icon
                class="tw-mr-8"
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
});

const buttonCategories = ['', 'primary', 'secondary', 'success', 'error', 'warning'];

basic.args = { ...basicProps };

basic.parameters = {
  visualRegressionTests: {
    controls: {
      large: { large: true },
      'no-texts': { negativeHasText: false, positiveHasText: false },
      category: { 'category.negative': buttonCategories[3], 'category.positive': buttonCategories[4] },
    },
  },
};

export const stackable = () => ({
  components: { EcModal },
  setup() {
    return {
      showFirstModal: ref(true),
      showSecondModal: ref(true),
      firstModalAction: action('firstModalAction'),
      secondModalAction: action('secondModalAction'),
    };
  },
  template: `
    <div>
      <ec-modal
        v-model:show="showFirstModal"
        is-closable
        large
      >

        <template #header>
          <h2>First Modal</h2>
        </template>

        <template #main>
          <div>
            <button @click.prevent.stop="firstModalAction">Action first modal</button>
            <p class="tw-mt-0">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
          </div>
        </template>
      </ec-modal>

      <ec-modal
        v-model:show="showSecondModal"
        is-closable
      >

        <template #header>
          <h2>Second Modal</h2>
        </template>

        <template #main>
          <div>
            <button @click.prevent.stop="secondModalAction">Action second modal</button>
            <p class="tw-mt-0">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
          </div>
        </template>
      </ec-modal>
    </div>
  `,
});

stackable.args = {
  zIndex: 201,
};

stackable.parameters = {
  docs: { disable: true },
};

export const buttonsDisabled = storyArgs => ({
  components: { EcModal, EcIcon },
  directives: { EcTooltip },
  setup() {
    const {
      large,
      show,
      isClosable,
      isLoading,
      category,
      showFooterLeftContent,
      negativeHasText,
      positiveHasText,
      zIndex,
      positiveButtonProps,
      negativeButtonProps,
      ...rest
    } = toRefs(storyArgs);
    const args = reactive(rest);

    const model = ref(show);
    const tooltipConfig = ref({
      content: "<p>If you are experiencing issues, please send an email to: <a href='mailto:operationsteam@ebury.com'>operationsteam@ebury.com</a></p>",
      popperClass: ['ec-tooltip--bg-bright ec-tooltip--modal'],
      triggers: ['click'],
      placement: 'bottom',
    });

    return {
      model,
      tooltipConfig,
      large,
      args,
      isClosable,
      isLoading,
      category,
      showFooterLeftContent,
      negativeHasText,
      positiveHasText,
      zIndex,
      positiveButtonProps,
      negativeButtonProps,
      onReject: action('reject'),
      onAccept: action('accept'),
      onClose: action('close'),
    };
  },
  template: `
    <div>
      <p>A qui dolorum voluptatibus ratione corrupti <a href="#">dignissimos</a> quia, alias ut excepturi. Reprehenderit quisquam dolorem eius rerum dignissimos porro sunt asperiores architecto, quidem totam necessitatibus voluptas molestiae pariatur consectetur. Ullam architecto minima animi alias aliquam, voluptates dicta. Ea ipsam alias autem laboriosam est accusamus distinctio praesentium minima? Impedit repudiandae provident reprehenderit ut beatae ducimus mollitia eius magni hic, quibusdam, ipsa voluptate porro vel non enim dolores at. Repellat.</p>
      <ec-modal
        v-if="!large"
        :large="large"
        :positive-button-props="positiveButtonProps"
        :negative-button-props="negativeButtonProps"
        :is-closable="isClosable"
        :is-loading="isLoading"
        :category="category"
        v-on="{
          negative: onReject,
          positive: onAccept,
          close: onClose,
        }"
        :z-index="zIndex"
        v-model:show="model">

        <template #header>
          <h2>Update your management accounts</h2>
        </template>

        <template #main>
          <p class="tw-mt-0">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
          <p>Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
        </template>

        <template #footerLeftContent v-if="showFooterLeftContent">
          <a href="#" @click.prevent class="tw-inline-block">
            <span
              class="tw-inline-flex tw-flex-grow tw-items-center tw-cursor-pointer tw-align-top tw-fill-key-4 tw-text-key-4"
              v-ec-tooltip="tooltipConfig"
            >
              <ec-icon
                class="tw-mr-8"
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
        v-if="large"
        :large="large"
        :isClosable="isClosable"
        :is-loading="isLoading"
        :category="category"
        v-on="{
          negative: onReject,
          positive: onAccept,
          close: onClose,
        }"
        :z-index="zIndex"
        v-model:show="model">
        <template #header>
          <h2>Update your management accounts</h2>
        </template>

        <template #main>
          <div class="tw-flex">
            <div>
              <p class="tw-mt-0">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
              <p v-for="i in 20">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
            </div>

            <div>
              <p class="tw-mt-0">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
              <p v-for="i in 20">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
            </div>
          </div>
        </template>

        <template #footerLeftContent v-if="showFooterLeftContent">
          <a href="#" @click.prevent class="tw-inline-block">
            <span
              class="tw-inline-flex tw-flex-grow tw-items-center tw-cursor-pointer tw-align-top tw-fill-key-4 tw-text-key-4"
              v-ec-tooltip="tooltipConfig"
            >
              <ec-icon
                class="tw-mr-8"
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
});

buttonsDisabled.args = {
  ...basicProps,
  positiveButtonProps: {
    isDisabled: true,
  },
  negativeButtonProps: {
    isDisabled: true,
  },
};
