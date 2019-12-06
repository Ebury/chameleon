<template>
  <div class="ec-loading__container">
    <div
      v-if="show"
      class="ec-loading"
    >
      <svg
        class="ec-loading__svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="ec-loading__circle"
          cx="50"
          cy="50"
          r="45"
        />
      </svg>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
};
</script>


<style lang="scss">
@import '../../scss/settings/colors/index';

.ec-loading {
  position: absolute;
  background: rgba($white, 0.5);
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;

  &__container {
    position: relative;
  }

  &__svg {
    width: 48px;
  }

  &__circle {
    animation: 1s linear infinite both circle-animation;
    display: block;
    fill: transparent;
    stroke: $level-4-tech-blue;
    stroke-linecap: round;
    stroke-dasharray: 280;
    stroke-dashoffset: 140;
    stroke-width: 10px;
    transform-origin: 50% 50%;
  }
}

@keyframes circle-animation {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
