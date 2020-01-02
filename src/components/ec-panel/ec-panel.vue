<template>
  <aside
    v-if="show"
    class="ec-panel"
  >
    <div class="ec-panel__header">
      <div class="ec-panel__header-icons">
        <a
          aria-label="close panel"
          class="ec-panel__close"
          href="#"
          @click.stop.prevent="$emit('close')"
        >
          <ec-icon
            class="ec-panel__close-icon"
            name="simple-close"
            :size="24"
          />
        </a>
      </div>

      <slot name="header" />
    </div>

    <slot name="main" />
  </aside>
</template>

<script>
import EcIcon from '../ec-icon';

export default {
  name: 'EcPanel',
  components: {
    EcIcon,
  },
  model: {
    prop: 'show',
    event: 'close',
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },

};
</script>

<style lang="scss">
@import '../../scss/settings/index';
@import '../../scss/tools/index';

$ec-panel-close-btn-fill: $level-4-interactive-elements !default;
$ec-panel-close-btn-fill-hover: $level-4-tech-blue !default;
$ec-panel-background-color: $white !default;

.ec-panel {
  width: 100%;
  max-width: $side-panel-max-width;
  height: 100vh;
  min-height: 100%;
  position: absolute;
  background: $ec-panel-background-color;
  right: 0;
  top: 0;
  padding: 16px 24px 24px 24px;
  overflow-y: auto;

  @include scrollbar;
  @include left-box-shadow-level-1;

  &__header {
    display: block;
  }

  &__header-icons {
    display: flex;
    flex-direction: row;
  }

  &__close {
    margin-left: auto;
    cursor: pointer;
    color: $ec-panel-close-btn-fill;

    @include color-transition;

    &:hover {
      color: $ec-panel-close-btn-fill-hover;
    }
  }

  &__close-icon {
    fill: currentColor;
    display: inline-block;
    vertical-align: top;
  }
}
</style>
