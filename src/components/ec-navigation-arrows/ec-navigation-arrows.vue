<template>
  <div
    class="ec-navigation-arrows"
    data-test="ec-navigation-arrows"
  >
    <button type="button" :class="leftButtonClasses" class="tw-mr-12" @click="handleLeftArrowEmit">
      <ec-icon size="24" :name="IconName.SimpleChevronLeft" /></button>
    <button type="button" :class="rightButtonClasses" @click="handleRightArrowEmit">
      <ec-icon size="24" :name="IconName.SimpleChevronRight" /></button>
  </div>
</template>

<script setup lang="ts">

import { computed } from 'vue';

import EcIcon from '@/components/ec-icon/ec-icon.vue';
import { IconName } from '../ec-icon/types';
import { NavigationArrowsEvent } from './types';

const emit = defineEmits<{
  'right-arrow-click': []
  'left-arrow-click': [],
}>();

interface NavigationArrowsProps {
  isRightArrowDisabled?: boolean
  isLeftArrowDisabled?: boolean
}

const props = defineProps<NavigationArrowsProps>();

const leftButtonClasses = computed(() => getButtonClasses(props.isLeftArrowDisabled));

const rightButtonClasses = computed(() => getButtonClasses(props.isRightArrowDisabled));

function getButtonClasses(isDisabled: boolean) {
  return {
    'ec-navigation-arrows__button': true,
    'ec-navigation-arrows__button--disabled': isDisabled,
  };
}

function handleRightArrowEmit() {
  if (!props.isRightArrowDisabled) {
    emit(NavigationArrowsEvent.RIGHT_ARROW_CLICK);
  }
}

function handleLeftArrowEmit() {
  if (!props.isLeftArrowDisabled) {
    emit(NavigationArrowsEvent.LEFT_ARROW_CLICK);
  }
}
</script>

<style>
.ec-navigation-arrows {
  @apply tw-text-gray-4 tw-h-24;

  &__button {
    @apply tw-h-24 tw-cursor-pointer;
    @apply tw-border-0 tw-p-0 tw-bg-transparent tw-fill-current;

    &:hover {
      @apply tw-text-key-4;
    }

    &--disabled {
      @apply tw-text-gray-6;

      &:hover {
        @apply tw-text-gray-6;
      }
    }
  }
}
</style>
