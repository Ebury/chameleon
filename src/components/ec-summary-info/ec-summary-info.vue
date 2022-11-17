<template>
  <div
    class="ec-summary-info"
    data-test="ec-summary-info"
  >
    <div
      v-if="iconName"
      class="tw-mr-12"
    >
      <ec-icon
        class="ec-summary-info__main-icon"
        :data-test="`ec-summary-info__main-icon ec-summary-info__main-icon__${iconName}`"
        :name="iconName"
        :size="12"
      />
    </div>

    <div class="ec-summary-info__content">
      <div
        v-if="lineItems.length > 0 || hasSlot('default')"
        data-test="ec-summary-info__content-lines"
      >
        <div
          v-for="item in lineItems"
          :key="item.text"
          class="ec-summary-info__content-line-item"
        >
          <span
            class="ec-summary-info__content-line-item-text"
            :data-test="`ec-summary-info__content-line-item-text ec-summary-info__content-line-item-text-${item.stylePreset}`"
            :class="`ec-summary-info__content-line-item-text-${item.stylePreset}`"
          >
            {{ item.text }}
          </span>

          <span
            v-if="item.iconName"
            v-ec-tooltip="{
              content: item.tooltipText
            }"
            :class="{'tw-ml-4': item.iconName}"
          >
            <ec-icon
              :data-test="`ec-summary-info__content-line-item-icon ec-summary-info__content-line-item-icon-${item.stylePreset}`"
              class="ec-summary-info__content-line-item-icon"
              :class="`ec-summary-info__content-line-item-icon-${item.stylePreset}`"
              :name="item.iconName"
              :size="14"
            />
          </span>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>

import { useSlots } from 'vue';

import VEcTooltip from '../../directives/ec-tooltip';
import EcIcon from '../ec-icon';

defineProps({
  iconName: {
    type: String,
    default: null,
  },
  lineItems: {
    type: Array,
    default: () => [],
  },
});

const slots = useSlots();

function hasSlot(name) {
  return name in slots;
}
</script>

<style>
.ec-summary-info {
  @apply tw-flex;

  &__main-icon {
    @apply tw-flex-grow-0;
    @apply tw-fill-gray-4;
  }

  &__content {
    @apply tw-flex-grow;
  }

  &__content-line-item {
    line-height: 20px;
  }

  &__content-line-item-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &__content-line-item-text-title {
    @apply tw-text-gray-5;
    @apply tw-small-text;
  }

  &__content-line-item-text-description {
    @apply tw-text-gray-3;
    @apply tw-small-text;
  }

  &__content-line-item-text-help {
    @apply tw-help-text;
    @apply tw-text-gray-5;
  }

  &__content-line-item-icon {
    @apply tw-align-middle;
  }

  &__content-line-item-icon-description {
    @apply tw-fill-gray-3;
  }

  &__content-line-item-icon-help {
    @apply tw-fill-gray-5;
  }
}

</style>
