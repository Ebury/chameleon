<template>
  <div
    v-if="show"
    class="ec-modal"
  >

    <div class="ec-modal__content">
      <header class="ec-modal__header">
        <slot name="header" />
        <ec-icon
          class="ec-modal__close"
          name="simple-close"
          :size="24"
          @click="close"
        />
      </header>

      <main class="ec-modal__main">
        <slot name="main" />
      </main>

      <footer class="ec-modal__footer">
        <slot name="footer" />
      </footer>
    </div>

  </div>
</template>

<script>
import EcIcon from '../ec-icon';

export default {
  components: {
    EcIcon,
  },
  model: {
    prop: 'show',
    event: 'change',
  },
  props: {
    show: { type: Boolean, default: false },
  },
  methods: {
    close() {
      this.$emit('change', !this.show);
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/settings/colors/index';
@import '../../scss/tools/index';

$ec-modal-bg: rgba($level-2-doc-bodies-bg, 0.8) !default;
$ec-modal-color: $level-3-body-and-headings !default;
$ec-modal-content-bg: $white !default;
$ec-modal-content-footer-bg: $level-7-backgrounds !default;
$close-btn-fill: $level-4-interactive-elements;
$close-btn-fill-hover: $level-4-tech-blue;

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
    position: fixed;
    top: 50%;
    left: 50%;
    background: $ec-modal-content-bg;
    transform: translate(-50%, -50%);
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

    @include media__from-1024 {
      display: flex;
      align-items: center;
    }
  }

  &__close {
    margin-left: auto;
    transition: fill 0.3s ease-out;
    fill: $close-btn-fill;
    cursor: pointer;

    &:hover {
      fill: $close-btn-fill-hover;
    }
  }
}
</style>
