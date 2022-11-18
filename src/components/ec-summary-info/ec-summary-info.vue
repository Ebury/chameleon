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
        :size="16"
      />
    </div>

    <slot>
      <div
        v-if="lineItems.length > 0"
        class="ec-summary-info__content"
      >
        <div
          data-test="ec-summary-info__content-lines"
        >
          <div
            v-for="(item, index) in lineItems"
            :key="item.text"
            class="ec-summary-info__content-line-item"
          >
            <span
              :title="item.text"
              class="ec-summary-info__content-line-item-text"
              :data-test="`ec-summary-info__content-line-item-text ec-summary-info__content-line-item-text-${getStylePreset(item.stylePreset, index)}`"
              :class="`ec-summary-info__content-line-item-text-${getStylePreset(item.stylePreset, index)}`"
            >
              {{ item.text }}
            </span>

            <span
              v-if="item.tooltipText"
              v-ec-tooltip="{
                content: item.tooltipText
              }"
              class="tw-ml-4"
            >
              <ec-icon
                v-ec-tooltip="{
                  content: item.tooltipText
                }"
                :class="`ec-summary-info__content-line-item-icon-${getStylePreset(item.stylePreset, index)}`"
                :data-test="`ec-summary-info__content-line-item-icon ec-summary-info__content-line-item-icon-${getStylePreset(item.stylePreset, index)}`"
                class="ec-summary-info__content-line-item-icon"
                name="simple-info"
                :size="14"
              />
            </span>
          </div>
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

function assignStylePresetAccordingToIndex(index) {
  let stylePreset = 'title'; // index === 0
  if (index === 1 || index > 2) {
    stylePreset = 'description';
  }
  if (index === 2) {
    stylePreset = 'help';
  }
  return stylePreset;
}

function getStylePreset(stylePreset, index) {
  if (stylePreset) {
    return stylePreset;
  }
  return assignStylePresetAccordingToIndex(index);
}
</script>

<style>
.ec-summary-info {
  @apply tw-flex;

  &__main-icon {
    @apply tw-align-top;
    @apply tw-flex-grow-0;
    @apply tw-fill-gray-4;
  }

  &__content {
    @apply tw-flex-grow;
    @apply tw-w-full;
  }

  &__content-line-item {
    line-height: 20px;
    @apply tw-min-w-0;
    @apply tw-flex;
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