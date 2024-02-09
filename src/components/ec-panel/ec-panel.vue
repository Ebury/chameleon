<template>
  <aside
    v-if="show"
    class="ec-panel"
    v-bind="{
      ...attrs,
      onBack: null,
      'data-test': attrs['data-test'] ? `${attrs['data-test']} ec-panel` : 'ec-panel',
    }"
  >
    <div
      class="ec-panel__fixed-container"
      data-test="ec-panel__fixed-container"
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
            :name="IconName.SIMPLE_ARROW_LEFT"
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
            :name="IconName.SIMPLE_CLOSE"
            :size="24"
          />
        </button>
      </div>

      <div class="ec-panel__content-container">
        <div
          v-if="hasSlot('header')"
          class="ec-panel__header"
          data-test="ec-panel__header"
        >

          <slot name="header" />
        </div>

        <div
          class="ec-panel__main"
          data-test="ec-panel__main"
        >
          <slot name="main" />
        </div>

        <div
          v-if="hasSlot('footer')"
          class="ec-panel__footer"
          data-test="ec-panel__footer"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue';

import EcIcon from '../ec-icon';
import { IconName } from '../ec-icon/icon-names';
import type { PanelProps } from './types';

defineOptions({
  inheritAttrs: false,
});

withDefaults(defineProps<PanelProps>(), {
  show: false,
});

const emit = defineEmits<{
  'update:show': [value: boolean],
  'close': []
}>();

const slots = useSlots();

function hasSlot(slotName: 'header' | 'main' | 'footer') {
  return slotName in slots;
}

const attrs = useAttrs();

const isBackEnabled = computed(() => !!attrs.onBack);

function goBack() {
  emit('update:show', false);
  if (typeof attrs.onBack === 'function') {
    attrs.onBack();
  }
}

function closePanel() {
  emit('update:show', false);
  emit('close');
}
</script>

<style>
@import '../../styles/tools/scrollbars.css';
@import '../../styles/tools/transitions.css';

:root,
:host {
  --ec-side-panel-max-width: 352px;
}

.ec-panel {
  max-width: var(--ec-side-panel-max-width);

  @apply tw-w-full;
  @apply tw-absolute tw-right-0 tw-top-0;

  &__fixed-container {
    max-width: var(--ec-side-panel-max-width);

    @apply tw-w-full tw-h-screen;
    @apply tw-fixed;
    @apply tw-flex tw-flex-col;
    @apply tw-bg-gray-8;
    @apply tw-shadow-level-1-rtl;
  }

  &__header-icons {
    @apply tw-flex tw-flex-row;
    @apply tw-mt-24 tw-mb-8 tw-mx-24;
  }

  &__header-icon {
    @apply tw-fill-current;
    @apply tw-inline-block;
    @apply tw-align-top;
  }

  &__header-action {
    @apply tw-cursor-pointer;
    @apply tw-text-gray-4;
    @apply tw-bg-transparent;
    @apply tw-border-none;
    @apply tw-p-0;

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

  &__content-container {
    @apply tw-flex tw-flex-col;
    @apply tw-h-full;
    @apply tw-overflow-y-scroll;

    @mixin md-scrollbar;

    @screen md {
      @apply tw-overflow-y-hidden;
    }
  }

  &__header {
    @apply tw-block;
    @apply tw-mx-24;
  }

  &__main {
    @apply tw-pb-24;
    @apply tw-pl-24;
    @apply tw-pr-16;
    @apply tw-flex-grow;

    @screen md {
      @apply tw-overflow-y-scroll;

      @mixin md-scrollbar;
    }
  }

  &__footer {
    @apply tw-mt-auto tw-mb-24 tw-mx-24;
  }
}

.ec-panel-container {
  @apply tw-relative;
}
</style>
