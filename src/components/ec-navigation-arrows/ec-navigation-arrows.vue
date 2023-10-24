<template>
  <div
    class="ec-navigation-arrows"
    data-test="ec-navigation-arrows"
  >
    <button
      type="button"
      :class="previousButtonClasses"
      :disabled="isPreviousDisabled"
      data-test="ec-navigation-arrows__previous"
      @click="emit(NavigationArrowsEvent.PREVIOUS_CLICK)"
    >
      <ec-icon :size="24" :name="IconName.SimpleChevronLeft" /></button>
    <button
      type="button"
      :class="nextButtonClasses"
      :disabled="isNextDisabled"
      data-test="ec-navigation-arrows__next"
      @click="emit(NavigationArrowsEvent.NEXT_CLICK)"
    >
      <ec-icon :size="24" :name="IconName.SimpleChevronRight" /></button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import EcIcon from '../ec-icon/ec-icon.vue';
import { IconName } from '../ec-icon/types';
import { NavigationArrowsEvent } from './types';

const emit = defineEmits<{
  'next-click': []
  'previous-click': [],
}>();

interface NavigationArrowsProps {
  isNextDisabled?: boolean
  isPreviousDisabled?: boolean
}

const props = defineProps<NavigationArrowsProps>();

const previousButtonClasses = computed(() => getButtonClasses(props.isPreviousDisabled));

const nextButtonClasses = computed(() => getButtonClasses(props.isNextDisabled));

function getButtonClasses(isDisabled: boolean) {
  return {
    'ec-navigation-arrows__button': true,
    'ec-navigation-arrows__button--disabled': isDisabled,
  };
}
</script>

<style>
.ec-navigation-arrows {
  @apply tw-h-24;

  &__button {
    @apply tw-h-24 tw-cursor-pointer;
    @apply tw-border-0 tw-p-0 tw-bg-transparent tw-fill-current;
    @apply tw-text-gray-4;

    & + & {
      @apply tw-ml-12;
    }

    &:hover {
      @apply tw-text-key-4;
    }

    &:focus {
      @apply tw-text-key-4;
      @apply tw-outline-none;
    }

    &--disabled {
      @apply tw-text-gray-6;

      &:hover {
        @apply tw-text-gray-6;
      }

      &:focus {
        @apply tw-text-gray-6;
      }
    }
  }
}
</style>
