<template>
  <div
    class="ec-main-container"
    data-test="ec-main-container"
  >

    <div
      v-if="hasSlot('breadcrumbs')"
      class="tw-flex tw-justify-between tw-items-center tw-mb-16"
    >
      <div
        data-test="ec-main-container__breadcrumbs"
      >
        <slot name="breadcrumbs" />
      </div>
      <template v-if="hasSlot('cta')">
        <div
          data-test="ec-main-container__cta"
        >
          <slot name="cta" />
        </div>
      </template>
    </div>

    <div
      v-if="title"
      class="tw-flex tw-justify-between tw-items-center tw-flex-wrap-reverse tw--mt-16"
    >
      <h1
        data-test="ec-main-container__title"
        class="ec-main-container__title"
      >{{ title }}</h1>
      <template v-if="hasSlot('cta') && !hasSlot('breadcrumbs')">
        <div
          data-test="ec-main-container__cta"
          class="tw-ml-auto tw-mt-16"
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
    @apply tw-h2;
    @apply tw-pr-12;
    @apply tw-m-0;
    @apply tw-mt-16;

    @screen sm {
      @apply tw-h1;
    }
  }

  &__title-intro {
    @apply tw-body-text;
    @apply tw-text-gray-4;
    @apply tw-mt-8 tw-mb-0;
  }
}
</style>
