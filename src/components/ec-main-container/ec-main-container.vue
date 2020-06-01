<template>
  <div class="tw-p-24 tw-min-h-full ec-main-container">
    <template v-if="title">
      <h1
        class="tw-h1 tw-mt-0 tw-mb-8"
        data-test="ec-main-container__title"
      >
        {{ title }}
      </h1>
      <p
        class="tw-body-text tw-text-gray-4 tw-mt-0 tw-mb-16"
        data-test="ec-main-container__title-intro"
      >{{ titleIntro }}</p>
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
