<template>
  <aside
    v-if="show"
    class="ec-panel"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-panel` : 'ec-panel'"
  >
    <div
      class="ec-panel__content-container"
      data-test="ec-panel__content-container"
    >
      <div
        class="ec-panel__header"
        data-test="ec-panel__header"
      >
        <div
          class="ec-panel__header-icons"
          data-test="ec-panel__header-icons"
        >
          <button
            v-if="isBackEnabled"
            type="button"
            aria-label="Go back"
            class="ec-panel__header-action ec-panel__header-action--back"
            data-test="ec-panel__header-action--back"
            @click.stop.prevent="goBack"
          >
            <ec-icon
              class="ec-panel__header-icon"
              name="simple-chevron-left"
              :size="24"
            />
          </button>

          <button
            type="button"
            aria-label="Close panel"
            class="ec-panel__header-action ec-panel__header-action--close"
            data-test="ec-panel__header-action--close"
            @click.stop.prevent="closePanel"
          >
            <ec-icon
              class="ec-panel__header-icon"
              name="simple-close"
              :size="24"
            />
          </button>
        </div>

        <slot name="header" />
      </div>

      <div class="ec-panel__main-container">
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

<style>
@import '../../styles/tools/scrollbars.css';
@import '../../styles/tools/transitions.css';

.ec-panel {
  max-width: var(--ec-side-panel-max-width);

  @apply tw-w-full;
  @apply tw-absolute tw-right-0 tw-top-0;

  &__content-container {
    max-width: var(--ec-side-panel-max-width);

    @apply tw-w-full tw-h-screen;
    @apply tw-fixed;
    @apply tw-flex tw-flex-col;
    @apply tw-bg-light;
    @apply tw-shadow-level-1-rtl;
  }

  &__header-icons {
    @apply tw-flex tw-flex-row;
  }

  &__header-icon {
    @apply tw-fill-current;
    @apply inline-block;
    @apply tw-align-top;
  }

  &__header-action {
    @apply tw-cursor-pointer;
    @apply tw-text-gray-4;
    @apply tw-bg-transparent;
    @apply tw-border-none;

    @mixin ec-text-color-transition;

    &:hover {
      @apply tw-text-key-4;
    }

    &--back {
      @apply tw-mr-auto;
    }

    &--close {
      @apply tw-ml-auto;
    }
  }

  &__header {
    @apply tw-block;
    @apply tw-mt-16 tw-mx-24;
  }

  &__main-container {
    @apply tw-overflow-y-auto;
    @apply tw-m-24;
    @apply tw-pr-8;

    @screen sm {
      @apply tw-mr-8;
    }

    @mixin md-scrollbar;
  }

  &__main {
    max-width: var(--ec-side-panel-content-max-width);
  }

  &__footer {
    @apply tw-mt-auto tw-mb-24 tw-mx-24;
  }
}

.ec-panel-container {
  @apply tw-relative;
}
</style>
