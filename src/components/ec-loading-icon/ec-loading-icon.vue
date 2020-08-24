<template>
  <ec-icon
    name="simple-loading"
    :size="size"
    class="ec-loading-icon"
    data-test="ec-loading-icon"
  />
</template>

<script>
import EcIcon from '../ec-icon';

export default {
  name: 'EcLoadingIcon',
  components: {
    EcIcon,
  },
  props: {
    size: {
      type: Number,
    },
  },
};
</script>

<style>
.ec-loading-icon {
  @apply tw-fill-key-4;

  animation: 1s linear infinite both ec-loading-icon__animation;
}

@keyframes ec-loading-icon__animation {
  0% {
    @apply tw-rotate-0;
  }

  100% {
    @apply tw-rotate-360;
  }
}
</style>
