<template>
  <aside
    v-if="show"
    class="ec-panel"
  >
    <div
      class="ec-panel__content"
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

      <div class="ec-panel__main-scrollbar-container">
        <div
          class="ec-panel__main"
          data-test="ec-panel__main"
        >
          <slot name="main" />
        </div>
      </div>

      <div
        v-if="hasFooter()"
        class="ec-panel__footer"
        data-test="ec-panel__footer"
      >
        <slot name="footer" />
      </div>
    </div>
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
    hasFooter() {
      return !!this.$scopedSlots.footer;
    },
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
$ec-panel-gutter: 24px;

.ec-panel {
  width: 100%;
  max-width: $side-panel-max-width;
  position: absolute;
  right: 0;
  top: 0;

  &__content {
    width: 100%;
    height: 100vh;
    max-width: $side-panel-max-width;
    background: $ec-panel-background-color;
    position: fixed;
    display: flex;
    flex-direction: column;

    @include left-box-shadow-level-1;
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

  &__header {
    display: block;
    margin-top: 16px;
    margin-left: 24px;
    margin-right: 24px;
  }

  &__main-scrollbar-container {
    overflow-y: scroll;
    margin-top: 24px;
    margin-bottom: 24px;
    margin-left: 24px;
    margin-right: 24px;
    padding-right: 8px;

    @media screen and (min-width: map-get($breakpoints, 'sm')) {
      margin-right: 8px;
    }

    @include md-scrollbar;
  }

  &__main {
    max-width: calc(#{$side-panel-max-width} - (#{$ec-panel-gutter} * 2));
  }

  &__footer {
    margin: auto 24px 24px 24px;
  }
}

.ec-panel-container {
  position: relative;
}
</style>
