<template>
  <div
    class="ec-timer"
    data-test="ec-timer"
  >
    <svg
      :width="diameter"
      :height="diameter"
      :viewBox="viewbox"
      class="ec-timer__svg"
    >
      <circle
        class="ec-timer__background"
        cx="50%"
        cy="50%"
        :r="radius"
        fill="transparent"
        :stroke-width="strokeWidth"
      />

      <circle
        class="ec-timer__remaining"
        cx="50%"
        cy="50%"
        :r="radius"
        fill="transparent"
        :stroke-width="strokeWidth"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
      />

      <text
        x="50%"
        y="50%"
        class="ec-timer__text"
        dominant-baseline="central"
        text-anchor="middle"
      >
        {{ secondsLeft }}s
      </text>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'EcTimer',
  props: {
    seconds: {
      type: Number,
      required: true,
      validator(value) {
        return Number.isInteger(value) && value > 0;
      },
    },
    isTimerRunning: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      radius: 24,
      strokeWidth: 4,
      secondsLeft: this.seconds,
    };
  },
  computed: {
    diameter() {
      return (this.radius * 2) + this.strokeWidth;
    },
    viewbox() {
      return `0 0 ${this.diameter} ${this.diameter}`;
    },
    circumference() {
      return 2 * Math.PI * this.radius;
    },
    steps() {
      return this.circumference / this.seconds;
    },
    offset() {
      return this.circumference + this.steps * this.secondsLeft;
    },
  },
  watch: {
    isTimerRunning: {
      immediate: true,
      handler(value) {
        if (value) {
          this.countdown();
        } else {
          this.secondsLeft = this.seconds;
        }
      },
    },
  },
  methods: {
    countdown() {
      if (this.isTimerRunning && this.secondsLeft > 0) {
        setTimeout(this.reduceSecondsLeft, 1000);
      } else {
        this.$emit('time-expired');
      }
    },
    reduceSecondsLeft() {
      this.secondsLeft--;
      this.countdown();
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
    stroke: hsl(var(--ec-key-color-level-4));
    transform-origin: 50%;

    @apply tw--rotate-90;
  }

  &__text {
    @apply tw-body-strong;
    @apply tw-text-gray-3;
  }
}
</style>
