<template>
  <div
    v-if="showModal"
    class="ec-modal"
  >

    <div class="ec-modal__content">
      <header class="ec-modal__header">
        <slot name="header" />
        <ec-icon
          class="ec-modal__close"
          name="simple-close"
          :size="24"
          @click="negativeAction()"
        />
      </header>

      <main class="ec-modal__main">
        <slot name="main" />
      </main>

      <footer class="ec-modal__footer">
        <div
          v-if="showHelpLink"
          v-ec-tooltip="tooltipConfig"
          class="ec-modal__help-link"
        >
          <ec-icon
            class="ec-mr--8"
            name="simple-help"
            :size="18"
          />
          Need help?
        </div>

        <button
          v-if="this.$slots.negative"
          class="ec-modal__negative-btn ec-btn ec-btn--md ec-btn--secondary ec-btn--rounded ec-push-right"
          @click="negativeAction()"
        >
          <slot name="negative" />
        </button>

        <button
          v-if="this.$slots.positive"
          :class="{'ec-push-right': !this.$slots.negative}"
          class="ec-modal__positive-btn ec-btn ec-btn--md ec-btn--primary ec-btn--rounded"
          @click="positiveAction()"
        >
          <slot name="positive" />
        </button>
      </footer>
    </div>

  </div>
</template>

<script>
import EcIcon from '../ec-icon';
import EcTooltip from '../../directives/ec-tooltip/ec-tooltip';

export default {
  components: {
    EcIcon,
  },
  directives: { EcTooltip },
  model: {
    prop: 'showModal',
    event: 'negativeAction',
  },
  props: {
    showModal: { type: Boolean, default: false },
    showHelpLink: { type: Boolean, default: false },
  },
  data() {
    return {
      tooltipConfig: {
        content: "<p>If you are experiencing issues, please send an email to: <a href='mailto:operationsteam@ebury.com'>operationsteam@ebury.com</a></p>",
        classes: ['ec-tooltip--bg-white'],
        trigger: 'click',
        placement: 'bottom',
      },
    };
  },
  methods: {
    negativeAction() {
      this.$emit('negativeAction', !this.showModal);
    },
    positiveAction() {
      this.$emit('positiveAction');
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
$ec-modal-close-btn-fill: $level-4-interactive-elements;
$ec-modal-close-btn-fill-hover: $level-4-tech-blue;
$ec-modal-help-link-color: $level-4-tech-blue !default;
$ec-modal-help-link-color-hover: $level-3-hover !default;

.ec-modal {
  background: $ec-modal-bg;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  color: $ec-modal-color;

  &__content {
    width: calc(100% - 24px);
    max-width: 680px;
    max-height: calc(100% - 24px);
    position: fixed;
    top: 50%;
    left: 50%;
    overflow: scroll;
    background: $ec-modal-content-bg;
    transform: translate(-50%, -50%);

    @include media__from-1024 {
      max-height: 576px;
    }
  }

  &__header {
    display: flex;
    padding: 24px;
    padding-bottom: 24px;
  }

  &__main {
    display: block;
    padding: 0 24px 24px 24px;
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

    &.ec-push-right {
      margin-left: auto;
    }

    @include media__from-1024 {
      width: auto;
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

  &__help-link {
    margin: 12px;
    display: flex;
    align-items: center;
    color: $ec-modal-help-link-color;
    fill: $ec-modal-help-link-color;
    transition: color 0.3s ease-out, fill 0.3s ease-out;

    &:hover {
      color: $ec-modal-help-link-color-hover;
      fill: $ec-modal-help-link-color-hover;
      cursor: pointer;
    }
  }
}
</style>
