<template>
  <transition name="ec-full-screen-overlay__fade">
    <div
      ref="overlayContent"
      v-if="show"
      class="ec-full-screen-overlay"
      :class="`tw-bg-gray-${backgroundColorLevel}`"
      :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-full-screen-overlay` : 'ec-full-screen-overlay'"
    >
      <slot name="content">
        <div
          class="ec-full-screen-overlay__content"
          data-test="ec-full-screen-overlay__content"
        >
          <header
            class="ec-full-screen-overlay__header"
            data-test="ec-full-screen-overlay__header"
          >
            <slot
              v-if="hasHeaderSlot()"
              name="header"
            />

            <h1
              v-else-if="title"
              data-test="ec-full-screen-overlay__title"
              class="ec-full-screen-overlay__title"
            >
              {{ title }}
            </h1>

            <button
              type="button"
              class="ec-full-screen-overlay__close-icon-btn"
              data-test="ec-full-screen-overlay__close-icon-btn"
              @click="emit('close')"
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
      </slot>
    </div>
  </transition>
</template>

<script setup>
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { onUnmounted, ref, useSlots } from 'vue';

import EcIcon from '../ec-icon';

defineProps({
  title: {
    type: String,
    required: false,
  },
  show: {
    type: Boolean,
    default: false,
  },
  backgroundColorLevel: {
    type: Number,
    default: 8,
    validator(value) {
      return value >= 0 && value <= 8;
    },
  },
});

const emit = defineEmits(['close']);

const overlayContent = ref(null);
const { deactivate } = useFocusTrap(overlayContent, {
  immediate: true,
  escapeDeactivates: false,
  clickOutsideDeactivates: false,
  initialFocus: false,
  allowOutsideClick: true,
  fallbackFocus: 'body',
});

function getFocusTrapContainer() {
  return overlayContent.value;
}

defineExpose({
  getFocusTrapContainer,
});

onUnmounted(() => {
  deactivate();
});

const slots = useSlots();

function hasHeaderSlot() {
  return !!slots.header;
}
</script>

<style>
  @import '../../styles/tools/scrollbars.css';
  @import '../../styles/tools/transitions.css';

  :root,
  :host {
    --ec-full-screen-overlay__content-width: 656px;
  }

  .ec-full-screen-overlay {
    @apply tw-p-24;
    @apply tw-z-level-3;
    @apply tw-fixed;
    @apply tw-inset-0;
    @apply tw-flex tw-justify-center;
    @apply tw-overflow-y-auto;

    @mixin md-scrollbar;

    &__content {
      max-width: var(--ec-full-screen-overlay__content-width);
      @apply tw-w-full;
      @apply tw-self-baseline;
    }

    &__header {
      @apply tw-mb-36;
      @apply tw-w-full;
      @apply tw-flex;
    }

    &__close-icon-btn {
      @apply tw-leading-reset;
      @apply tw-self-baseline;
      @apply tw-bg-transparent;
      @apply tw-border-none;
      @apply tw-p-0;
      @apply tw-ml-auto;
    }

    &__close-icon {
      @mixin ec-fill-color-transition;

      @apply tw-text-gray-4;
      @apply tw-cursor-pointer;

      &:hover {
        @apply tw-fill-key-4;
      }
    }

    &__fade {
      @mixin ec-fade-transition;
    }
  }
</style>
