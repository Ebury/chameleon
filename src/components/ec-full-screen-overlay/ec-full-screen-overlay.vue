<template>
  <transition name="ec-full-screen-overlay__fade">
    <div
      v-if="show"
      class="ec-full-screen-overlay"
      data-test="ec-full-screen-overlay"
    >
      <div
        ref="overlayContent"
        class="ec-full-screen-overlay__content"
        data-test="ec-full-screen-overlay__content"
      >
        <header
          class="ec-full-screen-overlay__header"
          data-test="ec-full-screen-overlay__header"
        >
          <h1
            v-if="title"
            data-test="ec-full-screen-overlay__title"
            class="ec-full-screen-overlay__title"
          >
            {{ title }}
          </h1>

          <button
            class="ec-full-screen-overlay__close-icon-btn"
            data-test="ec-full-screen-overlay__close-icon-btn"
            @click="emit('close-overlay')"
          >
            <span class="tw-sr-only">Close</span>
            <ec-icon
              class="ec-full-screen-overlay__close-icon"
              data-test="ec-full-screen-overlay__close-icon"
              name="simple-close"
              type="interactive"
              :size="24"
            />
          </button>

        </header>
        <main data-test="ec-full-screen-overlay__main">
          <slot name="main" />
        </main>
      </div>

    </div>
  </transition>
</template>

<script setup>
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { onUnmounted, ref } from 'vue';

import EcIcon from '../ec-icon';

defineProps({
  title: {
    type: String,
    required: true,
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close-overlay']);

const overlayContent = ref(null);
const { deactivate } = useFocusTrap(overlayContent, {
  immediate: true,
  escapeDeactivates: false,
  clickOutsideDeactivates: false,
  initialFocus: false,
});

onUnmounted(() => {
  deactivate();
});

</script>

<style>
  @import '../../styles/tools/transitions.css';

  .ec-full-screen-overlay {
    @apply tw-min-h-screen;
    @apply tw-z-level-3;
    @apply tw-fixed;
    @apply tw-inset-0;
    @apply tw-bg-gray-8;
    @apply tw-flex;
    @apply tw-justify-center;
    @apply tw-overflow-y-auto;

    &__content {
      max-width: 656px;
      width: 656px;
      @apply tw-mt-24;
    }

    &__header {
      @apply tw-w-full;
      @apply tw-flex;
      @apply tw-mb-32;
    }

    &__close-icon-btn {
      width: 24px;
      height: 24px;
      @apply tw-bg-transparent;
      @apply tw-border-none;
      @apply tw-p-0;
      @apply tw-self-center;
    }

    &__close-icon {
      @apply tw-text-gray-4;
      @apply tw-cursor-pointer;
      @apply tw-justify-self-end;
    }

    &__title {
      flex-grow: 1;
      @apply tw-h1;
      @apply tw-m-0;
      @apply tw-text-gray-3;
    }

    &__fade {
      @mixin ec-fade-transition;
    }
  }

</style>
