<template>
  <div class="ec-loading">
    <div
      v-if="show"
      class="ec-loading__content"
    >
      <ec-icon
        name="simple-loading"
        :size="size"
        class="ec-loading__icon"
      />
    </div>
    <slot />
  </div>
</template>

<script>
import EcIcon from '../ec-icon';

export default {
  name: 'EcLoading',
  components: {
    EcIcon,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    size: {
      type: Number,
      default: 48,
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/settings/colors/index';

.ec-loading {
  position: relative;

  &__content {
    position: absolute;
    background: rgba($white, 0.5);
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__icon {
    animation: 1s linear infinite both ec-loading__animation;
    fill: $level-4-tech-blue;
  }
}

@keyframes ec-loading__animation {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
