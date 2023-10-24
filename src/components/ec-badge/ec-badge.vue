<template>
  <span
    class="ec-badge"
    data-test="ec-badge"
    :class="{
      [`ec-badge--${type}`]: type,
    }"
  >
    <slot v-bind="{ value }">{{ value }}</slot>
  </span>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    validator(value) {
      return ['error', 'info', 'success', 'warning'].includes(value);
    },
    default: 'info',
  },
  value: {
    type: [String, Number],
    required: true,
  },
});
</script>

<style>
:root,
:host {
  --ec-badge-width: theme('spacing.16');
}

.ec-badge {
  @apply tw-text-gray-8;
  @apply tw-text-center tw-help-text;
  @apply tw-py-0 tw-px-4;

  min-width: var(--ec-badge-width);
  border-radius: calc(var(--ec-badge-width) / 2);

  &--info {
    @apply tw-bg-key-5;
  }

  &--success {
    @apply tw-bg-success;
  }

  &--warning {
    @apply tw-bg-warning;
  }

  &--error {
    @apply tw-bg-error;
  }
}
</style>
