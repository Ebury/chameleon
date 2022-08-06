<template>
  <div
    class="ec-main-container"
    data-test="ec-main-container"
  >
    <div
      v-if="title || hasCtaSlot()"
      class="tw-grid"
    >
      <template v-if="title">
        <div
          :class="{ 'tw-col-full': true, 'sm:tw-col-9': hasCtaSlot() }"
        >
          <div
            v-if="hasBreadcrumbs()"
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
      <template v-if="hasCtaSlot()">
        <div
          class="tw-col-full sm:tw-col-3"
          data-test="ec-main-container__cta"
        >
          <slot name="cta" />
        </div>
      </template>
    </div>
    <slot />
  </div>
</template>

<script setup>
import { useSlots } from 'vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  title: {
    type: String,
    default: null,
  },
  titleIntro: {
    type: String,
    default: null,
  },
});

const slots = useSlots();

function hasCtaSlot() {
  return !!slots.cta;
}

function hasBreadcrumbs() {
  return !!slots.breadcrumbs;
}
</script>

<script>
export default {
  name: 'EcMainContainer',
  compatConfig: {
    MODE: 3,
  },
};
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
