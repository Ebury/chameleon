<template>
  <transition name="ec-modal__fade">
    <div
      v-if="showModal"
      class="ec-modal"
      @click.self="closeModal()"
    >
      <div
        v-ec-focus-trap="getFocusTrapOptions()"
        class="ec-modal__content"
        :class="{'ec-modal--lg': large}"
      >
        <header class="ec-modal__header">
          <slot name="header" />
          <a
            v-if="isClosable"
            class="ec-modal__close"
            href="#"
            @click.stop.prevent="closeModal()"
          >
            <ec-icon
              class="ec-modal__close-icon"
              name="simple-close"
              :size="24"
            />
          </a>
        </header>

        <main class="ec-modal__main">
          <slot name="main" />
        </main>

        <footer class="ec-modal__footer">
          <div
            v-if="$scopedSlots.footerLeftContent"
            class="ec-modal__footer-left-content"
          >
            <slot name="footerLeftContent" />
          </div>

          <button
            ref="negativeButton"
            v-if="hasNegativeButton()"
            class="ec-btn ec-btn--md ec-btn--secondary ec-btn--rounded ec-modal__negative-btn ec-modal__negative-btn--right"
            @click="negativeAction()"
          >
            <slot name="negative" />
          </button>

          <button
            ref="primaryButton"
            v-if="hasPrimaryButton()"
            :class="{'ec-modal__positive-btn--right': !hasNegativeButton()}"
            class="ec-btn ec-btn--md ec-btn--primary ec-btn--rounded ec-modal__positive-btn"
            @click="positiveAction()"
          >
            <slot name="positive" />
          </button>
        </footer>
      </div>

    </div>
  </transition>
</template>

<script>
import EcIcon from '../ec-icon';
import EcFocusTrap from '../../directives/ec-focus-trap';
import * as KeyCode from '../../enums/key-code';

export default {
  components: {
    EcIcon,
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
  methods: {
    negativeAction() {
      this.$emit('negative');
    },
    positiveAction() {
      this.$emit('positive');
    },
    closeModal() {
      if (this.isClosable) {
        this.$emit('close');
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

      if (this.hasPrimaryButton()) {
        options.initialFocus = /* istanbul ignore next */ () => this.$refs.primaryButton;
      } else if (this.hasNegativeButton()) {
        options.initialFocus = /* istanbul ignore next */ () => this.$refs.negativeButton;
      }

      return options;
    },
    hasPrimaryButton() {
      return !!this.$scopedSlots.positive;
    },
    hasNegativeButton() {
      return !!this.$scopedSlots.negative;
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/settings/colors/index';
@import '../../scss/tools/index';

$ec-modal-bg: rgba($level-2-doc-bodies-bg, 0.2) !default;
$ec-modal-color: $level-3-body-and-headings !default;
$ec-modal-content-bg: $white !default;
$ec-modal-content-footer-bg: $level-7-backgrounds !default;
$ec-modal-close-btn-fill: $level-4-interactive-elements !default;
$ec-modal-close-btn-fill-hover: $level-4-tech-blue !default;

.ec-modal {
  background: $ec-modal-bg;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  color: $ec-modal-color;

  @include z-index-modal;

  &__content {
    width: calc(100% - 24px);
    max-width: 680px;
    position: relative;
    top: 50%;
    left: 50%;
    background: $ec-modal-content-bg;
    transform: translate(-50%, -50%);
    max-height: calc(100% - 24px);
    overflow-y: auto;

    @include box-shadow-level-2;
    @include scrollbar;
    @include shape-border-radius;

    @media screen and (min-height: 568px) {
      display: flex;
      flex-direction: column;
    }

    @include media__from-1024 {
      width: 60vw;
      max-width: 700px;
      max-height: 80vh;
    }

    @include media__from-1280 {
      width: 50vw;
      max-width: 700px;
      max-height: 80vh;
    }
  }

  &__header {
    flex-grow: 1;
    display: flex;
    padding: 24px;
    align-items: center;

    .ec-modal--lg & {
      margin-bottom: 24px;

      @include media__from-1024 {
        border-bottom: 1px solid $ec-modal-content-footer-bg;
      }
    }
  }

  &__main {
    margin: 0 24px 24px 24px;

    @media screen and (min-height: 640px) {
      @include scrollbar;

      overflow-y: auto;
      min-height: 120px;
      display: flex;
      flex-direction: column;
    }
  }

  &__footer {
    padding: 16px 12px;
    background: $ec-modal-content-footer-bg;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;

    @include media__from-1024 {
      align-items: center;
      flex-direction: row;
    }
  }

  &__positive-btn,
  &__negative-btn {
    margin: 12px;
    width: 100%;

    @include media__from-1024 {
      width: auto;

      &--right {
        margin-left: auto;
      }
    }
  }

  &__close {
    margin-left: auto;
    transition: fill 0.3s ease-out;
    color: $ec-modal-close-btn-fill;
    cursor: pointer;

    &:hover {
      color: $ec-modal-close-btn-fill-hover;
    }
  }

  &__close-icon {
    fill: currentColor;
    display: inline-block;
    vertical-align: top;
  }

  &__footer-left-content {
    margin: 12px;
  }

  &__fade {
    @include fade-transition;
  }

  &--lg {
    max-width: 100%;

    @include media__from-1024 {
      width: 80vw;
      max-width: 1100px;
      max-height: 80vh;
    }
  }
}
</style>
