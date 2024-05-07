<template>
  <component
    :is="isClickable ? 'button' : 'div'"
    data-test="ec-letter-icon"
    class="ec-letter-icon"
    :class="{ 'ec-letter-icon--clickable': isClickable }"
    :style="containerSize"
  >
    <span
      data-test="ec-letter-icon__text"
      class="ec-letter-icon__text"
      :style="letterSize"
    >
      {{ firstLetter }}
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, type StyleValue } from 'vue';

import type { LetterIconProps } from './types';

const props = withDefaults(defineProps<LetterIconProps>(), {
  size: 24,
  isClickable: false,
});

const firstLetter = computed(() => (props.text[0] ? props.text[0].toUpperCase() : ''));

// Design request: font-size has to be always half of circle size plus 2 px
const fontSize = computed(() => props.size / 2 + 2);

const containerSize = computed<StyleValue>(() => ({
  height: `${props.size}px`,
  width: `${props.size}px`,
}));

const letterSize = computed<StyleValue>(() => ({
  fontSize: `${fontSize.value}px`,
}));
</script>

<style>
.ec-letter-icon {
  @apply tw-flex tw-justify-center tw-items-center tw-w-fit tw-rounded-1/2 tw-bg-gray-6;

  &__text {
    @apply tw-select-none tw-align-middle tw-text-gray-2;
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
