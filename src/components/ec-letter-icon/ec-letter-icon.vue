<template>
  <component
    :is="isClickable ? 'button' : 'div'"
    data-test="ec-letter-icon"
    class="ec-letter-icon"
    :class="{
      'ec-letter-icon--clickable': isClickable,
      [`ec-letter-icon--${size}`]: true,
    }"
  >
    <span
      data-test="ec-letter-icon__text"
      class="ec-letter-icon__text"
    >
      {{ firstLetter }}
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { type LetterIconProps, LetterIconSize } from './types';

const props = withDefaults(defineProps<LetterIconProps>(), {
  size: LetterIconSize.SMALL,
  isClickable: false,
});

const firstLetter = computed(() => (props.text[0]?.toUpperCase() || ''));
</script>

<style>
.ec-letter-icon {
  @apply tw-flex tw-justify-center tw-items-center tw-rounded-1/2 tw-bg-gray-6;

  &__text {
    @apply tw-select-none tw-text-gray-2;
  }

  &--sm {
    @apply tw-size-24;

    font-size: 14px;
  }

  &--md {
    @apply tw-size-32;

    font-size: 18px;
  }

  &--clickable {
    @apply tw-cursor-pointer tw-border-0 tw-p-0;

    &:hover {
      @apply tw-bg-gray-2;

      .ec-letter-icon__text {
        @apply tw-text-gray-7;
      }
    }
  }
}
</style>
