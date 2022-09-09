<template>
  <span
    class="ec-badge"
    data-test="ec-badge"
    :class="{
      [`ec-alert--${props.type}`]: props.type
    }"
  >
    {{ props.value }}
  </span>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator(value) {
      return ['error', 'info', 'success', 'warning'].includes(value);
    },
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

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
  @apply tw-flex tw-justify-center tw-items-center;
  @apply tw-ml-4;
  @apply tw-bg-key-5 tw-text-gray-8;
  @apply tw-rounded-1/2;
  @apply tw-text-center tw-flags-text;

  width: var(--ec-filter-badge-width);
  height: var(--ec-filter-badge-height);
}
</style>
