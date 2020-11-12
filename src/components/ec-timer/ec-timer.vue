<template>
  <div
    class="ec-timer"
    data-test="ec-timer"
  >
    <svg
      width="108"
      height="108"
      viewBox="0 0 108 108"
      class="ec-timer__svg"
    >
      <circle
        class="ec-timer__background"
        cx="54"
        cy="54"
        :r="radius"
        fill="transparent"
        stroke-width="11"
      />
      <text
        x="50%"
        y="50%"
        dominant-baseline="central"
        text-anchor="middle"
      >{{ secondsLeft }}</text>
      <circle
        class="ec-timer__remaining"
        cx="54"
        cy="54"
        :r="radius"
        fill="transparent"
        stroke-width="11"
        stroke-dasharray="dashArray"
        stroke-dashoffset="0"
      />

      <circle
        class="ec-timer__used"
        cx="54"
        cy="54"
        :r="radius"
        fill="transparent"
        stroke-width="11"
        stroke-dasharray="dashArray"
        stroke-dashoffset="dashOffset"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'EcTimer',
  props: {
    seconds: {
      type: Number,
    },
    radius: {
      type: Number,
    },
  },
  data() {
    return {
      secondsLeft: null,
    };
  },
  created() {
    this.secondsLeft = this.numberToInteger(this.seconds);
    this.countdown();
  },
  methods: {
    numberToInteger(seconds) {
      return Math.trunc(seconds);
    },
    countdown() {
      setTimeout(this.goMoreDown, 1000);
    },
    goMoreDown() {
      if (this.secondsLeft > 0) {
        this.secondsLeft -= 1;
        this.countdown();
      } else {
        alert('finished');
      }
    },
  },
};
</script>

<style>
.ec-timer {
  &__background {
    stroke: hsl(var(--ec-gray-color-level-7));
  }

  &__remaining {
    stroke: hsl(var(--ec-reserved-color-info));
  }

  &__used {
    stroke: hsl(var(--ec-gray-color-level-8));
    stroke-opacity: 0.5;
    animation: progress 1s ease-out;
  }
}
</style>
