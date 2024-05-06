<template>
  <div
    data-test="ec-letter-icon"
    class="ec-letter-icon"
    :class="{ 'ec-letter-icon--clickable': isClickable }"
  >
    <svg
      data-test="ec-letter-icon__svg"
      class="ec-letter-icon__svg"
      :width="size"
      :height="size"
    >
      <text
        x="50%"
        y="50%"
        dominant-baseline="central"
        text-anchor="middle"
        fill="currentColor"
        data-test="ec-letter-icon__svg__text"
        class="ec-letter-icon__svg__text"
        :font-size="fontSize"
      >
        {{ firstLetter }}
      </text>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { LetterIconProps } from './types';

const props = withDefaults(defineProps<LetterIconProps>(), {
  size: 24,
  isClickable: false,
});

const firstLetter = computed(() => props.text[0]);
const fontSize = computed(() => props.size / 2);
</script>

<style>
.ec-letter-icon {
  @apply tw-flex tw-w-fit tw-rounded-1/2;

  &__svg {
    @apply tw-rounded-1/2 tw-bg-gray-6;

    &__text {
      @apply tw-select-none tw-text-gray-2;
    }
  }

  &--clickable {
    @apply tw-cursor-pointer;

    &:hover {
      .ec-letter-icon__svg {
        @apply tw-bg-gray-2;

        &__text {
          @apply tw-text-gray-7;
        }
      }
    }
  }
}
</style>
