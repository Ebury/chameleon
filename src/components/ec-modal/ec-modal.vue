<template>
  <transition name="ec-modal--fade">
    <div
      v-if="showModal"
      class="ec-modal"
    >
      <div
        class="ec-modal__content"
        :class="{'ec-modal--lg': large}"
      >
        <header class="ec-modal__header">
          <slot name="header" />
          <ec-icon
            v-if="showCloseIcon"
            class="ec-modal__close"
            name="simple-close"
            :size="24"
            @click="closeModal()"
          />
        </header>

        <main class="ec-modal__main">
          <slot name="main" />
        </main>

        <footer class="ec-modal__footer">
          <div
            v-if="showFooterLeftContent"
            class="ec-modal__footer-left-content"
          >
            <slot name="footer-left-content" />
          </div>

          <button
            v-if="this.$slots.negative"
            class="ec-modal__negative-btn ec-btn ec-btn--md ec-btn--secondary ec-btn--rounded ec-modal__negative-btn--right"
            @click="negativeAction()"
          >
            <slot name="negative" />
          </button>

          <button
            v-if="this.$slots.positive"
            :class="{'ec-modal__positive-btn--right': !this.$slots.negative}"
            class="ec-modal__positive-btn ec-btn ec-btn--md ec-btn--primary ec-btn--rounded"
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

export default {
  components: {
    EcIcon,
  },
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
    showCloseIcon: {
      type: Boolean,
      default: true,
    },
    large: {
      type: Boolean,
      default: false,
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
      this.$emit('close', false);
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

  &__content {
    display: flex;
    flex-direction: column;
    width: calc(100% - 24px);
    max-width: 680px;
    max-height: calc(100% - 24px);
    position: fixed;
    top: 50%;
    left: 50%;
    background: $ec-modal-content-bg;
    transform: translate(-50%, -50%);
    overflow: hidden;

    @include shape-border-radius;

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
    flex-grow: 3;
    overflow-y: auto;
    margin: 0 24px 24px 24px;
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
    fill: $ec-modal-close-btn-fill;
    cursor: pointer;

    &:hover {
      fill: $ec-modal-close-btn-fill-hover;
    }
  }

  &__footer-left-content {
    margin: 12px;
  }

  &--fade {
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
