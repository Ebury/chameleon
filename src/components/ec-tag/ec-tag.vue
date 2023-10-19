<template>
  <div
    v-ec-tooltip="{ content: text }"
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
import { toRefs } from 'vue';

import vEcTooltip from '../../directives/ec-tooltip';
import EcIcon from '../ec-icon';
import type { IconName, IconType } from '../ec-icon/types';

interface TagProps {
  text: string,
  isIconRounded?: boolean,
  iconName?: IconName,
  iconType?: IconType,
}

const props = withDefaults(defineProps<TagProps>(), {
  isIconRounded: false,
});

const {
  iconName, iconType, isIconRounded, text,
} = toRefs(props);
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
