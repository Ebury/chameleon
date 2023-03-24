<template>
  <component
    :is="componentTag"
    v-bind="{
      ...attrs,
      ...componentProps,
      'data-test': attrs['data-test'] ? `${attrs['data-test']} ec-option-card` : 'ec-option-card',
    }"
    class="ec-option-card"
    :class="getOptionCardClasses"
    @click="handleClick()"
  >
    <ec-option-card-item
      :is-disabled="isDisabled"
      :title="title"
      :caption="caption"
      :icon-name="iconName"
      :type="type"
    />
  </component>
</template>

<script setup lang="ts">
import { computed, toRefs, useAttrs } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

import type { IconName } from '../ec-icon/types';
import EcOptionCardItem from './ec-option-card-item.vue';
import { OptionCardEvent, OptionCardType } from './types';

const attrs = useAttrs();

interface OptionCardProps {
  isDisabled?: boolean,
  title: string,
  caption?: string,
  iconName?: IconName,
  type?: OptionCardType,
  to?: RouteLocationRaw,
  href?: string,
}

const props = defineProps<OptionCardProps>();
const emit = defineEmits<{(e: 'click'): void}>();

const {
  title,
  caption,
  iconName,
} = toRefs(props);

const componentTag = computed(() => {
  if (props.to) {
    return 'router-link';
  }

  if (props.href) {
    return 'a';
  }

  return 'button';
});

const componentProps = computed(() => ({
  ...(componentTag.value === 'button' && { type: componentTag.value, disabled: Boolean(props.isDisabled) }),
  ...(props.to ? { to: props.to } : { href: props.href }),
}));

const getOptionCardClasses = computed(() => ({
  'ec-option-card--disabled': Boolean(props.isDisabled),
  'ec-option-card--accent': props.type === OptionCardType.ACCENT,
  'ec-option-card--danger': props.type === OptionCardType.DANGER,
}));

function handleClick() {
  if (componentTag.value === 'button' && !props.isDisabled) {
    emit(OptionCardEvent.CLICK);
  }
}
</script>

<style>
.ec-option-card {
  @apply tw-flex tw-flex-col;
  @apply tw-p-16;
  @apply tw-border tw-border-solid tw-rounded tw-border-gray-6;
  @apply tw-text-left tw-body-text tw-text-gray-3;
  @apply tw-bg-transparent;

  &--accent {
    @apply tw-text-key-4;
  }

  &--danger {
    @apply tw-text-error;
  }

  &--disabled {
    @apply tw-pointer-events-none tw-cursor-default tw-bg-gray-7 tw-text-gray-5;
  }

  &:hover,
  &:active {
    @apply tw-no-underline;
    @apply tw-cursor-pointer;
    @apply tw-bg-gray-7;
  }

  &__title {
    @apply tw-inline;
    @apply tw-align-middle;
  }

  &__icon {
    @apply tw-mr-8 tw-fill-gray-3;
    @apply tw-align-middle;

    &--accent {
      @apply tw-fill-key-4;
    }

    &--danger {
      @apply tw-fill-error;
    }

    &--disabled {
      @apply tw-fill-gray-4;
    }
  }

  &__caption {
    @apply tw-small-text tw-text-gray-5 tw-m-0 tw-mt-8;

    &--accent {
      @apply tw-text-gray-3;
    }

    &--danger {
      @apply tw-text-gray-3;
    }

    &--disabled {
      @apply tw-text-gray-5;
    }
  }
}
</style>
