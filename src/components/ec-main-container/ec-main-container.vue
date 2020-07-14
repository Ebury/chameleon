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

  &__title {
    @apply tw-h1;
    @apply tw-m-0;
  }

  &__title-intro {
    @apply tw-body-text;
    @apply tw-text-gray-4;
    @apply tw-mt-8 tw-mb-0;
  }
}
</style>
