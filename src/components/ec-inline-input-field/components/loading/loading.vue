<template>
  <div
    class="ec-inline-input-field-loading"
    data-test="ec-inline-input-field-loading"
  >
    <div class="ec-inline-input-field-loading__simulated-input">
      <span class="ec-inline-input-field-loading__text">{{ value }}</span>
      <ec-loading
        show
        :size="24"
      >
        <div class="ec-inline-input-field-loading__spinner" />
      </ec-loading>
    </div>
    <div class="ec-inline-input-field-loading__buttons">
      <ec-icon
        name="simple-check"
        :size="16"
      />
      <ec-icon
        class="ec-inline-input-field-loading__close-button"
        name="simple-close"
        :size="16"
      />
    </div>
  </div>
</template>

<script>
import EcIcon from '@/components/ec-icon';
import EcLoading from '@/components/ec-loading';

export default {
  name: 'EcInlineInputFieldLoading',
  components: { EcIcon, EcLoading },
  props: {
    value: {
      default: '',
      type: String,
    },
  },
};
</script>

<style>
.ec-inline-input-field-loading {
  @apply tw-flex;

  &__simulated-input {
    @apply tw-flex tw-flex-grow;
    @apply tw-border tw-border-solid tw-border-gray-6 tw-rounded;
    @apply tw-truncate;
  }

  &__text {
    @apply tw-flex-grow;
    @apply tw-text-gray-5;
    @apply tw-pl-12 tw-py-8;
    @apply tw-truncate;
  }

  &__spinner {
    @apply tw-w-40;
  }

  &__buttons {
    @apply tw-flex tw-items-center;
    @apply tw-ml-20;
    @apply tw-fill-gray-6;
  }

  &__close-button {
    @apply tw-ml-8;
  }
}
</style>
