<template>
  <div
    class="ec-main-container"
    data-test="ec-main-container"
  >
    <div
      class="tw-flex tw-justify-between"
    >
      <div>
        <div
          v-if="hasSlot('breadcrumbs')"
          data-test="ec-main-container__breadcrumbs"
          class="ec-main-container__breadcrumbs"
        >
          <slot name="breadcrumbs" />
        </div>
        <h1
          v-if="title"
          data-test="ec-main-container__title"
          class="ec-main-container__title"
        >{{ title }}</h1>
      </div>

      <template v-if="hasSlot('cta') && !isBelowBreakPointSize">
        <div
          data-test="ec-main-container__cta"
        >
          <slot name="cta" />
        </div>
      </template>
    </div>

    <p
      v-if="titleIntro"
      data-test="ec-main-container__title-intro"
      class="ec-main-container__title-intro"
    >{{ titleIntro }}</p>

    <template v-if="hasSlot('cta') && isBelowBreakPointSize">
      <div
        data-test="ec-main-container__cta"
        class="tw-mt-8"
      >
        <slot name="cta" />
      </div>
    </template>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';
import { useSlots } from 'vue';

interface MainContainerProps {
  title?: string,
  titleIntro?: string,
}

defineProps<MainContainerProps>();

const slots = useSlots();

const isBelowBreakPointSize = useMediaQuery('(max-width: 344px)');

function hasSlot(slotName: string) {
  return slotName in slots;
}
</script>

<style>
.ec-main-container {
  @apply tw-p-24;
  @apply tw-min-h-full;

  &__title {
    @apply tw-h2;
    @apply tw-m-0;

    @screen sm {
      @apply tw-h1;
    }
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
