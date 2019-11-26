<template>
  <div class="ec-donut">
    <div class="ec-donut__container">
      <svg
        width="108"
        height="108"
        viewBox="0 0 108 108"
        class="ec-donut__svg"
      >
        <circle
          class="ec-donut__background"
          cx="54"
          cy="54"
          :r="radius"
          fill="transparent"
          stroke-width="11"
        />
        <circle
          class="ec-donut__remaining"
          cx="54"
          cy="54"
          :r="radius"
          fill="transparent"
          stroke-width="11"
          :stroke-dasharray="dashArray"
          :stroke-dashoffset="0"
        />
        <circle
          class="ec-donut__used"
          cx="54"
          cy="54"
          :r="radius"
          fill="transparent"
          stroke-width="11"
          :stroke-dasharray="dashArray"
          :stroke-dashoffset="offset"
        />
      </svg>
    </div>
    <div class="ec-donut__legend">
      <div class="ec-donut__legend-used">
        <ec-icon
          name="rounded-notification"
          :size="14"
          class="ec-donut__legend-icon ec-donut__legend-icon--used"
        />
        <slot name="used-legend" />
      </div>
      <div class="ec-donut__legend-reminder">
        <ec-icon
          name="rounded-notification"
          :size="14"
          class="ec-donut__legend-icon ec-donut__legend-icon--reminder"
        />
        <slot name="reminder-legend" />
      </div>
    </div>
  </div>
</template>

<script>
import EcIcon from '../ec-icon';

export default {
  name: 'EcDonut',
  components: { EcIcon },
  props: {
    amount: {
      type: Number,
      required: true,
    },
    used: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      radius: 48,
    };
  },
  computed: {
    percentageUsed() {
      return (this.used / this.amount) * 100;
    },
    // Calculate the circumference
    dashArray() {
      return 2 * Math.PI * this.radius;
    },
    // Calculate the how much needs to be offset of the used circle
    offset() {
      return this.dashArray * (1 - this.percentageUsed / 100);
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/settings/colors/index';
@import '../../scss/tools/typography';

.ec-donut {
  display: flex;

  &__container {
    margin-right: 24px;
    height: 108px;
  }

  &__legend {
    @include h4;

    line-height: 24px;
    flex-wrap: wrap;
    padding: 16px 0;
    color: $level-3-body-and-headings;
  }

  &__legend-used {
    margin-bottom: 24px;
  }

  &__legend-used,
  &__legend-reminder {
    display: flex;
    align-items: center;
  }

  &__legend-icon {
    flex-shrink: 0;
    margin-right: 8px;

    &--used {
      fill: rgba($color-info, 0.5);
    }

    &--reminder {
      fill: $color-info;
    }
  }

  &__svg {
    transform: rotate(-90deg);
  }

  &__background {
    // This color need to be discussed with UX team
    stroke: $level-7-backgrounds;
  }

  &__remaining {
    stroke: $color-info;
  }

  &__used {
    // This color needs to be discussed with UX team,
    // The color is this one:rgba($color-info, 0.5) but we cannot do opacity in this scenario
    stroke: #85d0ff;
    animation: progress 1s ease-out;
  }
}

@keyframes progress {
  0% {
    // This number is the (2 * Math.PI * radius)
    stroke-dashoffset: 301.59289474462014;
  }
}
</style>
