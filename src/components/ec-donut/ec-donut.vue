<template>
  <div
    class="ec-donut"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-donut` : 'ec-donut'"
  >
    <div
      class="ec-donut__container"
      data-test="ec-donut-container"
    >
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
          :stroke-dashoffset="dashOffset"
        />
      </svg>
    </div>
    <div
      class="ec-donut__legend"
      data-test="ec-donut__legend"
    >
      <div
        class="ec-donut__legend-used"
        data-test="ec-donut__legend-used"
      >
        <ec-icon
          name="rounded-notification"
          :size="14"
          class="ec-donut__legend-icon ec-donut__legend-icon--used"
        />
        <slot name="used-legend" />
      </div>
      <div
        class="ec-donut__legend-remaining"
        data-test="ec-donut__legend-remaining"
      >
        <ec-icon
          name="rounded-notification"
          :size="14"
          class="ec-donut__legend-icon ec-donut__legend-icon--remaining"
        />
        <slot name="remaining-legend" />
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
      if (this.used > this.amount) {
        return 100;
      }
      if (this.used <= 0) {
        return 0;
      }
      return (this.used / this.amount) * 100;
    },
    // Calculate the circumference
    dashArray() {
      return 2 * Math.PI * this.radius;
    },
    // Calculate the how much needs to be offset of the used circle
    dashOffset() {
      return this.dashArray * (1 - this.percentageUsed / 100);
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/settings/colors/index';
@import '../../scss/tools/';

.ec-donut {
  display: flex;
  flex-wrap: wrap;

  &__container {
    margin-right: 24px;
    height: 108px;

    @include media__up-to-sm {
      width: 100%;
      margin-right: 0;
      display: flex;
      justify-content: center;
    }
  }

  &__legend {
    @include h4;

    line-height: 24px;
    flex-wrap: wrap;
    padding: 16px 0;
    color: $level-3-body-and-headings;

    @include media__up-to-sm {
      padding: 16px 0 0;
      display: inline-flex;
      flex-direction: column;
      margin: 0 auto;
    }
  }

  &__legend-used {
    margin-bottom: 24px;

    @include media__up-to-sm {
      margin-bottom: 12px;
    }
  }

  &__legend-used,
  &__legend-remaining {
    display: flex;
  }

  &__legend-icon {
    flex-shrink: 0;
    margin-right: 8px;
    margin-top: 5px;

    &--used {
      fill: rgba($color-info, 0.5);
    }

    &--remaining {
      fill: $color-info;
    }
  }

  &__svg {
    transform: rotate(-90deg);
  }

  &__background {
    stroke: $level-7-backgrounds;
  }

  &__remaining {
    stroke: $color-info;
  }

  &__used {
    stroke: $white;
    stroke-opacity: 0.5;
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
