<template>
  <div
    class="ec-btn-group"
    v-bind="{
      // eslint-disable-next-line vue/no-duplicate-attr-inheritance
      'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-btn-group` : 'ec-btn-group',
    }"
  >
    <ec-btn
      v-for="(item, index) in items"
      :key="item.id || index"
      :data-test="`ec-button-group__btn ec-button-group__btn-${index}`"
      :category="ButtonCategory.PRIMARY"
      class="ec-btn-group__btn"
      :is-submit="false"
      :is-outline="modelValue !== item.value"
      :is-disabled="item.disabled"
      @click="onSelected(item.value)"
    >{{ item.text }}</ec-btn>
  </div>
</template>

<script setup lang="ts" generic="TValue">
import EcBtn from '../ec-btn';
import { ButtonCategory } from '../ec-btn/types';
import type { ButtonGroupProps } from './types';

const emit = defineEmits<{
  'update:modelValue': [value: TValue],
  'change': [value: TValue],
}>();

defineProps<ButtonGroupProps<TValue>>();

function onSelected(value: TValue) {
  emit('update:modelValue', value);
  emit('change', value);
}
</script>

<style>
.ec-btn-group {
  &__btn:first-child {
    @apply tw-rounded-l-button;
  }

  &__btn:not(:last-child) {
    @apply tw-border-r-0;
  }

  &__btn:not(:disabled) + &__btn:disabled:not(:first-child) {
    @apply tw-border-l tw-border-solid tw-border-l-key-4;
  }

  &__btn:last-child {
    @apply tw-rounded-r-button;
  }
}
</style>
