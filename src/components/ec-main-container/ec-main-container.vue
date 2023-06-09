<template>
  <div
    class="ec-main-container"
    data-test="ec-main-container"
  >
    <div
      v-if="title || hasSlot('cta')"
      class="tw-grid"
    >
      <template v-if="title">
        <div
          :class="{ 'tw-col-full': true, 'md:tw-col-9': hasSlot('cta') }"
        >
          <div
            v-if="hasSlot('breadcrumbs')"
            data-test="ec-main-container__breadcrumbs"
            class="ec-main-container__breadcrumbs"
          >
            <slot name="breadcrumbs" />
          </div>

          <h1
            data-test="ec-main-container__title"
            class="ec-main-container__title"
          >{{ title }}</h1>
          <p
            v-if="titleIntro"
            data-test="ec-main-container__title-intro"
            class="ec-main-container__title-intro"
          >{{ titleIntro }}</p>
        </div>
      </template>
      <template v-if="hasSlot('cta')">
        <div
          class="tw-col-full md:tw-col-3"
          data-test="ec-main-container__cta"
        >
          <slot name="cta" />
        </div>
      </template>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

interface MainContainerProps {
  title?: string,
  titleIntro?: string,
}

defineProps<MainContainerProps>();

const slots = useSlots();

function hasSlot(slotName: string) {
  return slotName in slots;
}
</script>

<style>
.ec-main-container {
  @apply tw-p-24;
  @apply tw-min-h-full;

  &__title {
    @apply tw-h1;
    @apply tw-m-0;
  }

  &__title-intro {
    @apply tw-body-text;
    @apply tw-text-gray-4;
    @apply tw-mt-8 tw-mb-0;
  }

  &__breadcrumbs {
    @apply tw-mb-16;
  }
}
</style>
