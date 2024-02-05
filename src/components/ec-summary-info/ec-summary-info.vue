<template>
  <div
    class="ec-summary-info"
    v-bind="{
      ...$attrs,
      'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-summary-info` : 'ec-summary-info',
    }"
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
          :data-test="`ec-summary-info__content-line-item-${index}`"
          class="ec-summary-info__content-line-item"
        >
          <span
            :title="item.text"
            :data-test="getItemClasses('ec-summary-info__content-line-item-content', index, item.stylePreset).join(' ')"
            :class="getItemClasses('ec-summary-info__content-line-item-content', index, item.stylePreset, item.isSensitive)"
          >
            {{ item.text }}
          </span>
          <ec-icon
            v-if="item.tooltipText"
            v-ec-tooltip="{
              content: item.tooltipText,
            }"
            :class="getItemClasses('ec-summary-info__content-line-item-icon', index, item.stylePreset)"
            :data-test="getItemClasses('ec-summary-info__content-line-item-icon', index, item.stylePreset).join(' ')"
            :name="IconName.SIMPLE_INFO"
            :size="14"
          />
        </div>

      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import useConfig from '../../composables/use-ec-config';
import vEcTooltip from '../../directives/ec-tooltip';
import EcIcon from '../ec-icon';
import { IconName } from '../ec-icon/types';
import type { Item } from './types';
import { StylePreset } from './types';

defineOptions({
  inheritAttrs: false,
});

const config = useConfig();

interface SummaryProps {
  iconName?: IconName,
  lineItems: Item[]
}

withDefaults(defineProps<SummaryProps>(), {
  lineItems: () => [],
});

function getStylePresetByIndex(index: number) {
  if (index === 1 || index > 2) {
    return StylePreset.TEXT;
  }
  if (index === 2) {
    return StylePreset.DESCRIPTION;
  }
  return StylePreset.LABEL;
}

function getStylePreset(index: number, stylePreset?: StylePreset) {
  if (stylePreset) {
    return stylePreset;
  }
  return getStylePresetByIndex(index);
}

function getItemClasses(mainClass: string, index: number, stylePreset?: StylePreset, isSensitive = false) {
  const classes = [mainClass, `${mainClass}-${getStylePreset(index, stylePreset)}`];
  if (isSensitive) {
    classes.push(config.sensitiveClass);
  }
  return classes;
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
