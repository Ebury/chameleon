<template>
  <ec-icon
    name="simple-loading"
    :size="size"
    class="ec-loading-icon"
    data-test="ec-loading-icon"
  />
</template>

<script setup>
import EcIcon from '../ec-icon';

defineProps({
  size: {
    type: Number,
  },
});
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
