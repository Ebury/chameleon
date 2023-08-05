<template>
  <div
    v-ec-tooltip="{ content: text }"
    class="ec-tag"
    data-test="ec-tag"
  >
    <ec-icon
      v-if="iconName"
      class="ec-tag__icon"
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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import vEcTooltip from '../../directives/ec-tooltip';
import EcIcon from '../ec-icon';
import type { IconName, IconType } from '../ec-icon/types';

interface TagProps {
  text: string,
  iconName?: IconName,
  iconType?: IconType,
}

const props = defineProps<TagProps>();

const { iconName, iconType, text } = toRefs(props);
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
  }
}
</style>
