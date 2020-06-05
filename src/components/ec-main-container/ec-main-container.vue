<template>
  <div class="ec-main-container">
    <div
      v-if="title || hasCtaSlot()"
      class="ec-main-container__header"
    >
      <template v-if="title">
        <div
          :class="{ 'tw-col-full': true, 'sm:tw-col-9': hasCtaSlot() }"
        >
          <h1 class="ec-main-container__title">{{ title }}</h1>
          <p class="ec-main-container__title-intro">{{ titleIntro }}</p>
        </div>
      </template>
      <template v-if="hasCtaSlot()">
        <div class="ec-main-container__cta tw-col-full sm:tw-col-3">
          <slot name="cta" />
        </div>
      </template>
    </div>
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
  methods: {
    hasCtaSlot() {
      return !!this.$scopedSlots.cta;
    },
  },
};
</script>

<style>
.ec-main-container {
  @apply tw-p-24;
  @apply tw-min-h-full;

  &__header {
    @apply tw-grid tw-items-center tw-justify-between;
  }

  &__cta {
    @apply tw-flex tw-justify-center tw-self-start;
  }

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
