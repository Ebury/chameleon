<template>
  <div class="ec-privacy-policy">
    <div class="ec-privacy-policy__content">
      <div class="ec-privacy-policy__title ec-privacy-policy__item">{{ title }}</div>
      <div class="ec-privacy-policy__item">
        <slot />
      </div>
      <div class="ec-privacy-policy__item">
        <button
          type="button"
          class="ec-privacy-policy__btn ec-btn ec-btn--rounded ec-btn--sm"
          data-test="ec-privacy-policy__btn"
          @click="emit('accept')"
        >{{ buttonText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['accept']);
</script>

<style>
.ec-privacy-policy {
  @apply tw-z-level-1;

  background: hsla(var(--ec-key-color-level-7), 0.95);

  @apply tw-fixed tw-bottom-0;
  @apply tw-w-full;
  @apply tw-text-center;

  &__content {
    @apply tw-py-24 tw-px-48;

    max-width: var(--ec-body-max-width);

    @apply tw-m-auto;
    @apply tw-flex tw-flex-wrap tw-items-center tw-justify-between;

    @media screen and (max-width: 640px) {
      @apply tw-py-24 tw-px-16;
    }
  }

  &__title {
    @apply tw-h4;

    @media screen and (max-width: 1260px) {
      @apply tw-hidden;
    }
  }

  &__item {
    @media screen and (max-width: 1260px) {
      @apply tw-w-full;
      @apply tw-my-4 tw-mx-auto;
    }
  }
}
</style>
