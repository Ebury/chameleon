<template>
  <svg
    :width="size"
    :height="size"
    :class="['ec-icon', typeClass]"
  >
    <use :xlink:href="`#ec-${name}`" />
  </svg>
</template>

<script>
export default {
  name: 'EcIcon',
  compatConfig: {
    MODE: 3,
  },
};
</script>

<script setup>
import { computed, toRefs } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
  },
  type: {
    type: String,
    validator(value) {
      return ['error', 'info', 'success', 'warning', 'interactive'].includes(value);
    },
  },
});

const { name, size, type } = toRefs(props);

const typeClass = computed(() => (type.value ? `ec-icon--${type.value}` : null));
</script>

<style>
.ec-icon {
  &--error {
    @apply tw-fill-error;
  }

  &--info {
    @apply tw-fill-info;
  }

  &--success {
    @apply tw-fill-success;
  }

  &--warning {
    @apply tw-fill-warning;
  }

  &--interactive {
    @apply tw-fill-gray-4;
  }
}
</style>
