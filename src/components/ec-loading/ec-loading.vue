<template>
  <div
    class="ec-loading"
    data-test="ec-loading"
  >
    <div
      v-if="show"
      class="ec-loading__backdrop"
      :class="{ 'ec-loading__backdrop--is-transparent': isTransparent }"
      data-test="ec-loading__backdrop"
    >
      <ec-icon
        :name="IconName.SIMPLE_LOADING"
        :size="size"
        class="ec-loading__icon"
        data-test="ec-loading__icon"
      />
    </div>
    <div
      class="ec-loading__content"
      :class="{ 'ec-loading__content--is-transparent': isTransparent }"
      data-test="ec-loading__content"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import EcIcon from '../ec-icon';
import { IconName } from '../ec-icon/types';

interface LoadingProps {
  show: boolean,
  size?: number,
  transparent?: boolean,
}

const props = withDefaults(defineProps<LoadingProps>(), {
  size: 48,
  transparent: true,
});

const isTransparent = computed(() => props.transparent || !props.show);
</script>

<style>
.ec-loading {
  @apply tw-relative;
  @apply tw-z-0; /* backdrop of the loading gets z-index of tw-z-loading. Do not allow that backdrop to cover anything from the outer world of ec-loading. e.g. if <ec-loading /> is a sibling of </ec-panel>, then the backdrop should not cover the content of the <ec-panel> too. */

  &__backdrop {
    @apply tw-absolute;
    @apply tw-h-full tw-w-full;
    @apply tw-flex tw-justify-center tw-items-center;
    @apply tw-z-loading;

    &--is-transparent {
      background: hsla(var(--ec-gray-color-level-8), 0.5);
    }
  }

  &__content {
    @apply tw-invisible;

    &--is-transparent {
      @apply tw-visible;
    }
  }

  &__icon {
    @apply tw-fill-key-4;

    animation: 1s linear infinite both ec-loading__animation;
  }
}

@keyframes ec-loading__animation {
  0% {
    transform: rotate(theme('rotate.0'));
  }

  100% {
    transform: rotate(theme('rotate.360'));
  }
}
</style>
