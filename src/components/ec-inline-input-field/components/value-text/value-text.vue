<template>
  <div
    class="ec-inline-input-field-value-text"
    data-test="ec-inline-input-field-value-text"
  >
    <span :class="{ 'ec-inline-input-field-value-text__text': true, [config.sensitiveClass]: isSensitive }">
      {{ value }}
    </span>
    <button
      type="button"
      class="ec-inline-input-field-value-text__action"
      data-test="ec-inline-input-field-value-text__action"
      @click="emit('edit');"
    >
      <ec-icon
        class="ec-inline-input-field-value-text__edit-icon"
        name="simple-edit"
        :size="16"
      />
    </button>
  </div>
</template>

<script setup>
import useConfig from '../../../../composables/use-ec-config';
import EcIcon from '../../../ec-icon';

const config = useConfig();

defineProps({
  value: {
    default: '',
    type: String,
  },
  isSensitive: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['edit']);
</script>

<style>
.ec-inline-input-field-value-text {
  @apply tw-w-full;
  @apply tw-flex tw-justify-between tw-items-center;

  &__text {
    @apply tw-truncate;
  }

  &__action {
    @apply tw-border-0;
    @apply tw-bg-transparent tw-fill-gray-4;
    @apply tw-outline-none;

    line-height: 0;

    &:focus {
      @apply tw-fill-key-4;
    }
  }

  &__edit-icon:hover {
    @apply tw-fill-key-4;
    @apply tw-cursor-pointer;
  }
}
</style>
