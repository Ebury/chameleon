<template>
  <span
    class="ec-badge"
    data-test="ec-badge"
    :class="{
      [`ec-badge--${props.type}`]: props.type
    }"
  >
    <slot
      v-if="hasValueSlot"
      name="custom"
    />
    <span>
      {{ props.value }}
    </span>
  </span>
</template>

<script setup>
import { useSlots } from 'vue';

const props = defineProps({
  type: {
    type: String,
    validator(value) {
      return ['error', 'info', 'success', 'warning'].includes(value);
    },
    default: 'info',
  },
  value: {
    type: String,
    required: true,
  },
});
const slots = useSlots();
const hasValueSlot = () => !!slots.custom;
</script>

<script>
export default {
  name: 'EcBadge',
  compatConfig: {
    MODE: 3,
  },
};
</script>

<style>
:root {
  --ec-filter-badge-width: 16px;
  --ec-filter-badge-height: 16px;
}

.ec-badge {
  @apply tw-text-gray-8;
  @apply tw-text-center tw-flags-text;
  @apply tw-py-0 tw-px-4;

  min-width: var(--ec-filter-badge-width);
  height: var(--ec-filter-badge-height);
  border-radius: calc(var(--ec-filter-badge-width) / 2);

  &--info {
    @apply tw-bg-info;
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
