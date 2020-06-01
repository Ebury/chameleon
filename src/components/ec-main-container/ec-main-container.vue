<template>
  <div class="ec-main-container">
    <template v-if="title">
      <h1 class="ec-main-container__title">{{ title }}</h1>
      <p class="ec-main-container__title-intro">{{ titleIntro }}</p>
    </template>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'EcMainContainer',
  props: {
    title: {
      type: String,
      default: null,
    },
    titleIntro: {
      type: String,
      default: null,
    },
  },
};
</script>

<style>
.ec-main-container {
  @apply tw-p-24;
  @apply tw-min-h-full;

  &__title {
    @apply tw-h1;
    @apply tw-mt-0 tw-mb-8;
  }

  &__title-intro {
    @apply tw-body-text;
    @apply tw-text-gray-4;
    @apply tw-mt-0 tw-mb-16;
  }
}
</style>
