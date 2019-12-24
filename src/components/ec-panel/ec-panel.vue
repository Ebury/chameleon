<template>
  <aside
    v-if="showPanel"
    class="ec-panel"
  >
    <header class="ec-panel__header">
      <div class="ec-panel__header-icons">
        <ec-icon
          class="ec-panel__close"
          name="simple-close"
          :size="24"
          @click="$emit('close')"
        />
      </div>

      <div>
        <slot name="header" />
      </div>
    </header>

    <main>
      <slot name="main" />
    </main>
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
    prop: 'showPanel',
    event: 'close',
  },
  props: {
    showPanel: {
      type: Boolean,
      default: false,
    },
  },

};
</script>

<style lang="scss">
@import '../../scss/settings/colors/index';
@import '../../scss/tools/index';

$ec-panel-close-btn-fill: $level-4-interactive-elements !default;
$ec-panel-close-btn-fill-hover: $level-4-tech-blue !default;

.ec-panel {
  display: block;
  width: 100%;
  max-width: 352px;
  height: 100vh;
  min-height: 100%;
  position: absolute;
  background: white;
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
    fill: $ec-panel-close-btn-fill;
    cursor: pointer;

    &:hover {
      fill: $ec-panel-close-btn-fill-hover;
    }
  }

  &__main {
    display: block;
  }
}
</style>
