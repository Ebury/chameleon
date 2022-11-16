<template>
  <div
    class="ec-summary-info"
    data-test="ec-summary-info"
  >
    <div
      v-if="iconName"
    >
      <ec-icon
        class="ec-summary-info__icon"
        data-test="ec-summary-info__icon"
        :class="{'tw-mr-12': iconName}"
        :name="iconName"
        :size="12"
      />
    </div>

    <div class="ec-summary-info__content">
      <div
        v-if="title"
        class="ec-summary-info__title"
        data-test="ec-summary-info__title"
      >
        {{ title }}
      </div>

      <div
        v-if="lineItems.length > 0 || hasSlot('default')"
        data-test="ec-summary-info__content-lines"
        class="ec-summary-info__content-lines"
      >

        <div
          v-for="item in lineItems"
          :key="item.text"
          :class="[item.cssClasses]"
          class="ec-summary-info__content-line-item"
        >
          <span
            :class="[item.textCssClasses]"
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
              class="ec-summary-info__content-line-item-icon"
              :class="[item.iconCssClasses]"
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
  title: {
    type: String,
    default: null,
  },
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
:root {
  --ec-summary-info--width: 184px;
}

.ec-summary-info {
  max-width: var(--ec-summary-info--width);
  @apply tw-flex;

  &__icon {
    @apply tw-flex-grow-0;
    @apply tw-mr-12;
    @apply tw-fill-gray-4;
  }

  &__content {
    @apply tw-flex-grow;
  }

  &__content-lines {
    @apply tw-small-text;
    @apply tw-text-gray-5;
  }

  &__content-line-item-icon {
    @apply tw-fill-gray-4;
    @apply tw-align-middle;
  }

  &__title {
    @apply tw-text-gray-5;
    @apply tw-small-text;
  }
}

</style>
