<template>
  <transition name="ec-modal__fade">
    <div
      v-if="showModal"
      class="ec-modal"
      :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-modal` : 'ec-modal'"
      :style="zIndexStyle"
      @click.self="closeModal()"
    >
      <div
        v-ec-focus-trap="getFocusTrapOptions()"
        class="ec-modal__content"
        data-test="ec-modal__content"
        :class="{ 'ec-modal--lg': large }"
      >
        <header
          class="ec-modal__header"
          data-test="ec-modal__header"
        >
          <slot name="header" />
          <a
            v-if="isClosable"
            class="ec-modal__close"
            data-test="ec-modal__close"
            href="#"
            @click.stop.prevent="closeModal()"
          >
            <ec-icon
              class="ec-modal__close-icon"
              data-test="ec-modal__close-icon"
              name="simple-close"
              :size="24"
            />
          </a>
        </header>

        <main
          class="ec-modal__main"
          data-test="ec-modal__main"
        >
          <slot name="main" />
        </main>

        <footer
          v-if="hasFooter()"
          class="ec-modal__footer"
          data-test="ec-modal__footer"
        >
          <div
            v-if="hasFooterLeftContent()"
            class="ec-modal__footer-left-content"
            data-test="ec-modal__footer-left-content"
          >
            <slot name="footerLeftContent" />
          </div>

          <ec-loading
            v-if="hasNegativeButton()"
            class="ec-modal__btn-loading ec-modal__btn-loading--right"
            :show="isLoadingNegativeButton"
            :transparent="!isLoadingNegativeButton"
          >
            <ec-btn
              ref="negativeButton"
              is-rounded
              :is-submit="false"
              :category="negativeButtonCategory"
              class="ec-modal__negative-btn"
              data-test="ec-modal__negative-btn"
              @click="negativeAction()"
            >
              <slot name="negative" />
            </ec-btn>
          </ec-loading>

          <ec-loading
            v-if="hasPositiveButton()"
            class="ec-modal__btn-loading"
            :show="isLoadingPositiveButton"
            :transparent="!isLoadingPositiveButton"
          >
            <ec-btn
              ref="positiveButton"
              :category="positiveButtonCategory"
              is-rounded
              :is-submit="false"
              :class="{'ec-modal__positive-btn--right': !hasNegativeButton()}"
              class="ec-modal__positive-btn"
              data-test="ec-modal__positive-btn"
              @click="positiveAction()"
            >
              <slot name="positive" />
            </ec-btn>
          </ec-loading>
        </footer>
      </div>

    </div>
  </transition>
</template>

<script>
import EcFocusTrap from '../../directives/ec-focus-trap';
import * as KeyCode from '../../enums/key-code';
import EcBtn from '../ec-btn';
import EcIcon from '../ec-icon';
import EcLoading from '../ec-loading';

export default {
  components: {
    EcBtn,
    EcIcon,
    EcLoading,
  },
  directives: { EcFocusTrap },
  model: {
    prop: 'showModal',
    event: 'close',
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    showFooterLeftContent: {
      type: Boolean,
      default: false,
    },
    isClosable: {
      type: Boolean,
      default: true,
    },
    large: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Object,
      default: () => ({}),
    },
    zIndex: {
      type: Number,
      validator(value) {
        return value > 200 && value < 250;
      },
    },
    category: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['negative', 'positive', 'close'],
  computed: {
    isLoadingPositiveButton() {
      return !!this.isLoading.positive;
    },
    isLoadingNegativeButton() {
      return !!this.isLoading.negative;
    },
    positiveButtonCategory() {
      return this.category.positive || 'primary';
    },
    negativeButtonCategory() {
      return this.category.negative || 'secondary';
    },
    zIndexStyle() {
      return this.zIndex ? { zIndex: this.zIndex } : null;
    },
  },
  watch: {
    showModal: {
      immediate: true,
      handler(value) {
        if (value) {
          document.addEventListener('keyup', this.escapeIsPressed);
        } else {
          document.removeEventListener('keyup', this.escapeIsPressed);
        }
      },
    },
  },
  beforeUnmount() {
    document.removeEventListener('keyup', this.escapeIsPressed);
  },
  methods: {
    negativeAction() {
      this.$emit('negative');
    },
    positiveAction() {
      this.$emit('positive');
    },
    closeModal() {
      if (this.isClosable) {
        this.$emit('close', false);
      }
    },
    escapeIsPressed(e) {
      if (e.keyCode === KeyCode.ESC) {
        this.closeModal();
      }
    },
    getFocusTrapOptions() {
      const options = {
        escapeDeactivates: this.isClosable,
        clickOutsideDeactivates: this.isClosable,
      };

      if (this.hasPositiveButton()) {
        options.initialFocus = /* istanbul ignore next */ () => this.$refs.positiveButton.$el;
      } else if (this.hasNegativeButton()) {
        options.initialFocus = /* istanbul ignore next */ () => this.$refs.negativeButton.$el;
      }

      return options;
    },
    hasPositiveButton() {
      return !!this.$slots.positive;
    },
    hasNegativeButton() {
      return !!this.$slots.negative;
    },
    hasFooterLeftContent() {
      return !!this.$slots.footerLeftContent;
    },
    hasFooter() {
      return this.hasFooterLeftContent() || this.hasPositiveButton() || this.hasNegativeButton();
    },
  },
};
</script>

<style>
@import '../../styles/tools/scrollbars.css';
@import '../../styles/tools/transitions.css';

:root {
  --ec-modal-lg-max-width: 1100px;
  --ec-modal-sm-max-width: 680px;
}

.ec-modal {
  background: hsla(var(--ec-gray-color-level-2), 0.2);

  @apply tw-w-screen;
  @apply tw-h-screen;
  @apply tw-fixed;
  @apply tw-inset-0;
  @apply tw-text-gray-3;
  @apply tw-z-modal;

  &__content {
    width: calc(100% - theme('spacing.24'));
    max-width: var(--ec-modal-sm-max-width);
    max-height: calc(100% - theme('spacing.24'));
    transform: translate(-50%, -50%);

    @apply tw-relative;
    @apply tw-inset-1/2;
    @apply tw-bg-gray-8;
    @apply tw-overflow-y-auto;
    @apply tw-shadow-level-2;
    @apply tw-rounded;

    @mixin md-scrollbar;

    @media screen and (min-height: theme('screens.sm')) {
      @apply tw-flex tw-flex-col;
    }

    @screen lg {
      width: 60vw;
      max-height: 80vh;
    }

    @screen xl {
      width: 50vw;
    }
  }

  &__header {
    @apply tw-flex tw-flex-grow;
    @apply tw-p-24;
    @apply tw-items-center;

    .ec-modal--lg & {
      @apply tw-mb-24;

      @screen lg {
        @apply tw-border-b tw-border-solid tw-border-gray-7;
      }
    }
  }

  &__main {
    @apply tw-mt-0 tw-mb-24 tw-mx-24;

    @media screen and (min-height: theme('screens.sm')) {
      @mixin md-scrollbar;

      @apply tw-overflow-y-auto tw-overflow-x-hidden;
      @apply tw-flex tw-flex-col;
    }
  }

  &__footer {
    @apply tw-py-16 tw-px-12;
    @apply tw-bg-gray-7;
    @apply tw-flex tw-flex-col-reverse tw-items-center;

    @screen lg {
      @apply tw-flex-row;
    }
  }

  &__btn-loading {
    @apply tw-m-12;

    @screen lg {
      @apply tw-w-auto;

      &--right {
        @apply tw-ml-auto;
      }
    }
  }

  &__positive-btn,
  &__negative-btn {
    @apply tw-w-full;
  }

  &__close {
    @mixin ec-text-color-transition;

    @apply tw-ml-auto;
    @apply tw-text-gray-4;
    @apply tw-cursor-pointer;

    &:hover {
      @apply tw-text-key-4;
    }
  }

  &__close-icon {
    @apply tw-fill-current;
    @apply tw-inline-block;
    @apply tw-align-top;
  }

  &__footer-left-content {
    @apply tw-m-12;
  }

  &__fade {
    @mixin ec-fade-transition;
  }

  &--lg {
    @apply tw-max-w-full;

    @screen lg {
      width: 80vw;
      max-width: var(--ec-modal-lg-max-width);
      max-height: 80vh;
    }
  }
}
</style>
