<template>
  <aside
    v-if="show"
    class="ec-panel"
    data-test="ec-panel"
  >
    <div class="ec-panel__header">
      <div class="ec-panel__header-icons">
        <a
          v-if="isBackEnabled"
          aria-label="Go back"
          class="ec-panel__header-action ec-panel__header-action--back"
          href="#"
          data-test="ec-panel__header-action--back"
          @click.stop.prevent="goBack"
        >
          <ec-icon
            class="ec-panel__header-icon"
            name="simple-chevron-left"
            :size="24"
          />
        </a>
        <a
          aria-label="Close panel"
          class="ec-panel__header-action ec-panel__header-action--close"
          href="#"
          data-test="ec-panel__header-action--close"
          @click.stop.prevent="closePanel"
        >
          <ec-icon
            class="ec-panel__header-icon"
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
    event: 'show-panel',
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isBackEnabled() {
      return this.$listeners.back;
    },
  },
  methods: {
    goBack() {
      this.$emit('show-panel', false);
      this.$emit('back');
    },
    closePanel() {
      this.$emit('show-panel', false);
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/settings/index';
@import '../../scss/tools/index';

$ec-panel-header-btn-fill: $level-4-interactive-elements !default;
$ec-panel-header-btn-fill-hover: $level-4-tech-blue !default;
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

  &__header-icon {
    fill: currentColor;
    display: inline-block;
    vertical-align: top;
  }

  &__header-action {
    cursor: pointer;
    color: $ec-panel-header-btn-fill;

    @include color-transition;

    &:hover {
      color: $ec-panel-header-btn-fill-hover;
    }

    &--back {
      margin-right: auto;
    }

    &--close {
      margin-left: auto;
    }
  }
}

.ec-panel-container {
  position: relative;
}
</style>
