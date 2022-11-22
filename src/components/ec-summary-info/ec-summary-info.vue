<template>
  <div
    class="ec-summary-info"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-summary-info` : `ec-summary-info`"
  >
    <ec-icon
      v-if="iconName"
      class="ec-summary-info__main-icon"
      data-test="ec-summary-info__main-icon"
      :name="iconName"
      :size="16"
    />

    <slot>
      <div
        data-test="ec-summary-info__content"
        class="ec-summary-info__content"
      >
        <div
          v-for="(item, index) in lineItems"
          :key="item.text"
          class="ec-summary-info__content-line-item"
        >
          <span
            :title="item.text"
            class="ec-summary-info__content-line-item-content"
            :data-test="`ec-summary-info__content-line-item-content ec-summary-info__content-line-item-content-${getStylePreset(item.stylePreset, index)}`"
            :class="`ec-summary-info__content-line-item-content-${getStylePreset(item.stylePreset, index)}`"
          >
            {{ item.text }}
          </span>
          <ec-icon
            v-if="item.tooltipText"
            v-ec-tooltip="{
              content: item.tooltipText
            }"
            :class="`ec-summary-info__content-line-item-icon-${getStylePreset(item.stylePreset, index)}`"
            :data-test="`ec-summary-info__content-line-item-icon ec-summary-info__content-line-item-icon-${getStylePreset(item.stylePreset, index)}`"
            class="ec-summary-info__content-line-item-icon"
            name="simple-info"
            :size="14"
          />
        </div>

      </div>
    </slot>
  </div>
</template>

<script setup>
import VEcTooltip from '../../directives/ec-tooltip';
import EcIcon from '../ec-icon';

defineProps({
  iconName: {
    type: String,
  },
  lineItems: {
    type: Array,
    default: () => [],
  },
});

function getStylePresetByIndex(index) {
  if (index === 1 || index > 2) { return 'text'; }
  if (index === 2) { return 'description'; }
  return 'label';
}

function getStylePreset(stylePreset, index) {
  if (stylePreset) {
    return stylePreset;
  }
  return getStylePresetByIndex(index);
}
</script>

<style>
.ec-summary-info {
  @apply tw-flex;

  &__main-icon {
    @apply tw-align-top;
    @apply tw-flex-grow-0;
    @apply tw-fill-gray-4;
    @apply tw-mr-8;
    @apply tw-flex-shrink-0;
  }

  &__content {
    @apply tw-overflow-hidden;
  }

  &__content-line-item {
    @apply tw-flex tw-items-center;
  }

  &__content-line-item-content {
    @apply tw-truncate;
  }

  &__content-line-item-content-label {
    @apply tw-caption-text;
  }

  &__content-line-item-content-text {
    @apply tw-text-gray-3;
    @apply tw-small-text;
  }

  &__content-line-item-content-description {
    @apply tw-help-text;
    @apply tw-text-gray-5;
  }

  &__content-line-item-icon {
    @apply tw-flex-shrink-0;
    @apply tw-ml-4;
  }

  &__content-line-item-icon-text {
    @apply tw-fill-gray-3;
  }

  &__content-line-item-icon-description {
    @apply tw-fill-gray-5;
  }
}

</style>
