<template>
  <div
    class="ec-full-screen-overlay"
    data-test="ec-full-screen-overlay"
  >
    <div
      ref="overlayContainer"
      class="tw-col-full"
      data-test="ec-full-screen-overlay__container"
    >
      <div class="tw-grid tw-grid-cols-3">
        <div class="tw-col-full sm:tw-col-3" />
        <div class="tw-col-full sm:tw-col-6">
          <div class="tw-grid">
            <div class="tw-col-full sm:tw-col-9">
              <h1
                v-if="title"
                data-test="ec-full-screen-overlay__title"
                class="ec-full-screen-overlay__title"
              >
                {{ title }}
              </h1>
            </div>
            <div class="tw-col-full sm:tw-col-3 tw-text-right">
              <a
                href="#"
                data-test="ec-full-screen-overlay__close-icon-container"
                @click="emit('closeOverlay')"
              >
                <ec-icon
                  class="ec-full-screen-overlay__close-icon"
                  data-test="ec-full-screen-overlay__close-icon"
                  name="simple-close"
                  type="interactive"
                  :size="15"
                />
              </a>
            </div>
          </div>
        </div>
        <div class="tw-col-full sm:tw-col-3" />
      </div>
    </div>

  </div>
</template>

<script setup>
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { onUnmounted, ref } from 'vue';

import EcIcon from '../ec-icon';

defineProps({
  title: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['closeOverlay']);

const overlayContainer = ref(null);
const { deactivate } = useFocusTrap(overlayContainer, {
  immediate: true,
  escapeDeactivates: false,
  clickOutsideDeactivates: false,
});

onUnmounted(() => {
  deactivate();
});

</script>

<style>
  @import '../../styles/tools/transitions.css';

  .ec-full-screen-overlay {
    @apply tw-flex tw-flex-row tw-items-stretch;
    @apply tw-min-h-screen;
    @apply tw-z-level-3;
    @apply tw-absolute;
    @apply tw-inset-0;
    @apply tw-bg-gray-8;

    &__close-icon {
      @apply tw-text-gray-4;
      @apply tw-cursor-pointer;
    }

    &__title {
      @apply tw-h1;
      @apply tw-m-0;
      @apply tw-text-gray-3;
    }

    &--fade {
      @mixin ec-fade-transition;
    }
  }

</style>
