<template>
  <div
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-metroline-item` : 'ec-metroline-item'"
    class="ec-metroline-item"
    :class="{
      'ec-metroline-item--active': isActive || (isCompleted && isLast),
      'ec-metroline-item--is-last': isLast
    }"
  >
    <div
      data-test="ec-metroline-item__status"
      class="ec-metroline-item__status"
    >
      <div
        data-test="ec-metroline-item__badge"
        class="ec-metroline-item__badge"
      >
        <span
          v-if="!isCompleted"
          data-test="ec-metroline-item__index"
        >
          {{ index }}
        </span>

        <ec-icon
          v-else
          data-test="ec-metroline-item__completed-icon"
          name="simple-check"
          :size="14"
        />
      </div>

      <div
        v-if="!isLast"
        data-test="ec-metroline-item__status-bar"
        class="ec-metroline-item__status-bar"
      />
    </div>

    <div
      data-test="ec-metroline-item__content"
      class="ec-metroline-item__content"
    >
      <div
        data-test="ec-metroline-item__header"
        class="ec-metroline-item__header"
      >
        <div
          data-test="ec-metroline-item__header-heading"
          class="ec-metroline-item__header-heading"
        >
          <slot name="heading" />
        </div>

        <div
          v-if="isCompleted"
          data-test="ec-metroline-item__header-sub-heading"
          class="ec-metroline-item__header-sub-heading"
        >
          <slot name="sub-heading" />
        </div>

        <div
          v-if="isCompleted"
          data-test="ec-metroline-item__header-cta"
        >
          <slot name="header-cta" />
        </div>
      </div>

      <div
        v-if="!isNext"
        class="ec-metroline-item__main"
        data-test="ec-metroline-item__main"
      >
        <slot name="main" />
      </div>

      <div
        v-if="!isNext"
        class="ec-metroline-item__footer"
        data-test="ec-metroline-item__footer"
      >
        <div
          class="ec-metroline-item__footer-cta"
          data-test="ec-metroline-item__footer-cta"
        >
          <slot name="footer-cta" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EcIcon from '../ec-icon';
import * as MetrolineItemStatus from '../../enums/metroline-item-status';

export default {
  name: 'EcMetrolineItem',
  components: { EcIcon },
  props: {
    index: {
      type: String,
      required: true,
    },
    isLast: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      required: true,
      validator(value) {
        return [MetrolineItemStatus.NEXT, MetrolineItemStatus.ACTIVE, MetrolineItemStatus.COMPLETED].includes(value);
      },
    },
  },
  computed: {
    isNext() {
      return this.status === MetrolineItemStatus.NEXT;
    },
    isActive() {
      return this.status === MetrolineItemStatus.ACTIVE;
    },
    isCompleted() {
      return this.status === MetrolineItemStatus.COMPLETED;
    },
  },
};
</script>

<style>
.ec-metroline-item {
  @apply tw-w-full;
  @apply tw-flex;

  & + & {
    @apply tw-mt-8;
  }

  &__status {
    @apply tw-flex tw-flex-col tw-items-center;
    @apply tw-mr-16;
  }

  &__badge {
    @apply tw-flex tw-justify-center tw-items-center;
    @apply tw-bg-gray-6 tw-text-gray-3 tw-fill-current;
    @apply tw-rounded-1/2;
    @apply tw-min-w-24 tw-min-h-24;
    @apply tw-small-text;
    @apply tw-mb-8;

    .ec-metroline-item--active & {
      @apply tw-bg-key-4 tw-text-gray-8;
    }
  }

  &__status-bar {
    @apply tw-h-full tw-min-h-24;
    @apply tw-border tw-border-solid tw-border-key-6;
  }

  &__content {
    @apply tw-w-full;
  }

  &__header {
    @apply tw-flex tw-flex-wrap tw-justify-between tw-items-center;
    @apply tw-mb-12;
  }

  &__header-heading {
    @apply tw-text-gray-3 tw-h4;

    .ec-metroline-item--active & {
      @apply tw-text-gray-3 tw-h3;

      line-height: 24px; /* The disc is 24px. subsequently all header items must have a size of 24px or less. */
    }
  }

  &__header-sub-heading {
    @apply tw-text-gray-5;
    @apply tw-ml-0 tw-mr-auto;
  }

  &__main {
    @apply tw-mb-16;
  }

  &__footer {
    @apply tw-mt-24 tw-mb-16;
    @apply tw-flex;
  }

  &__footer-cta {
    @apply tw-ml-auto tw-mr-0;
  }
}
</style>
