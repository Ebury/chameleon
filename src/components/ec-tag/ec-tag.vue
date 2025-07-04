<template>
  <div
    v-ec-tooltip="tagTooltipOptions"
    class="ec-tag"
    data-test="ec-tag"
  >
    <ec-icon
      v-if="iconName"
      class="ec-tag__icon"
      :class="{ 'tw-rounded-1/2': isIconRounded }"
      data-test="ec-tag__icon"
      :name="iconName"
      :type="iconType"
      :size="16"
    />

    <div
      class="ec-tag__text"
      data-test="ec-tag__text"
    >{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';

import vEcTooltip from '../../directives/ec-tooltip';
import { type TooltipOptions } from '../../directives/ec-tooltip/types';
import EcIcon from '../ec-icon';
import type { TagProps } from './types';

const props = withDefaults(defineProps<TagProps>(), {
  isIconRounded: false,
});

const {
  iconName, iconType, isIconRounded, text,
} = toRefs(props);

const tagTooltipOptions = ref<TooltipOptions>({ content: props.text, ...props.tooltipOptions });
</script>

<style>
.ec-tag {
  @apply tw-inline-flex tw-items-center;
  @apply tw-bg-gray-7;
  @apply tw-py-4 tw-px-8;

  @apply tw-rounded-button;

  &__icon {
    @apply tw-mr-4;
    @apply tw-flex-shrink-0;
  }

  &__text {
    @apply tw-text-gray-3;
    @apply tw-truncate;
    @apply tw-help-text;
  }
}
</style>
