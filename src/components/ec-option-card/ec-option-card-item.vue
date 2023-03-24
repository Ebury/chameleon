<template>
  <div class="ec-option-card-item">
    <span data-test="ec-option-card-item__title-img">
      <ec-icon
        v-if="iconName && title"
        data-test="ec-option-card-item__icon"
        class="ec-option-card-item__icon"
        :class="getOptionIconClass"
        :name="iconName"
        :alt="title"
        :size="24"
      />
      <p class="ec-option-card-item__title">{{ title }}</p>
    </span>
    <p
      v-if="caption"
      class="ec-option-card-item__caption"
      :class="getcaptionClass"
      data-test="ec-option-card-item__caption"
    >{{ caption }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';

import EcIcon from '../ec-icon';
import type { IconName } from '../ec-icon/iconNames';
import { OptionCardType } from './types';

interface OptionCardItemProps {
  isDisabled?: boolean,
  title: string,
  caption?: string,
  iconName?: IconName,
  type?: OptionCardType,
}

const props = defineProps<OptionCardItemProps>();

const {
  title,
  caption,
  iconName,
} = toRefs(props);

const getOptionIconClass = computed(() => ({
  'ec-option-card-item__icon--disabled': Boolean(props.isDisabled),
  'ec-option-card-item__icon--accent': props.type === OptionCardType.ACCENT,
  'ec-option-card-item__icon--danger': !props.isDisabled && (props.type === OptionCardType.DANGER),
}));

const getcaptionClass = computed(() => ({
  'ec-option-card-item__caption--disabled': Boolean(props.isDisabled),
  'ec-option-card-item__caption--accent': props.type === OptionCardType.ACCENT,
  'ec-option-card-item__caption--danger': !props.isDisabled && (props.type === OptionCardType.DANGER),
}));

</script>

<style scoped>
.ec-option-card-item {
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
