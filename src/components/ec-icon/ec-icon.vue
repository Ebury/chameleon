<template>
  <svg
    :width="size"
    :height="size"
    :class="['ec-icon', typeClass]"
  >
    <use :xlink:href="`#ec-${name}`" />
  </svg>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';

import type { IconName, IconType } from './types';

interface IconProps {
  name: IconName,
  size?: number,
  type?: IconType,
}

const props = defineProps<IconProps>();

const { name, size, type } = toRefs(props);

const typeClass = computed(() => (type?.value ? `ec-icon--${type.value}` : null));
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
