<template>
  <ec-icon
    :name="IconName.SIMPLE_LOADING"
    :size="size"
    class="ec-loading-icon"
    data-test="ec-loading-icon"
  />
</template>

<script setup lang="ts">
import EcIcon from '../ec-icon';
import { IconName } from '../ec-icon/icon-names';
import type { LoadingIconProps } from './types';

defineProps<LoadingIconProps>();
</script>

<style>
.ec-loading-icon {
  @apply tw-fill-key-4;

  animation: 1s linear infinite both ec-loading-icon__animation;
}

@keyframes ec-loading-icon__animation {
  0% {
    transform: rotate(theme('rotate.0'));
  }

  100% {
    transform: rotate(theme('rotate.360'));
  }
}
</style>
