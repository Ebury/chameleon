<template>
  <div
    class="ec-full-screen-overlay"
    data-test="ec-full-screen-overlay"
  >
    <div class="tw-col-full">
      <div class="tw-grid tw-grid-cols-3">
        <div class="tw-col-full sm:tw-col-3" />
        <div class="tw-col-full sm:tw-col-6">
          <div class="tw-grid">
            <div class="tw-col-full sm:tw-col-9">
              <h1
                data-test="ec-full-screen-overlay__title"
                class="ec-full-screen-overlay__title"
              >
                {{ title }}
              </h1>
            </div>
            <div class="tw-col-full sm:tw-col-3 tw-text-right">
              <ec-icon
                class="ec-full-screen-overlay__close-icon"
                data-test="ec-full-screen-overlay__close-icon"
                name="simple-close"
                type="interactive"
                :size="15"
              />
            </div>
          </div>
        </div>
        <div class="tw-col-full sm:tw-col-3" />
      </div>
    </div>

  </div>
</template>

<script setup>
import EcIcon from '../ec-icon';

defineProps({
  title: {
    type: String,
    default: 'Default title',
  },
});
</script>

<style>
  .ec-full-screen-overlay {
    @apply tw-flex tw-flex-row tw-items-stretch;
    @apply tw-min-h-screen;
    @apply tw-z-level-3;

    &__close-icon {
      @apply tw-text-gray-4;
    }

    &__title {
      @apply tw-h1;
      @apply tw-m-0;
      @apply tw-text-gray-3; }
  }

</style>
