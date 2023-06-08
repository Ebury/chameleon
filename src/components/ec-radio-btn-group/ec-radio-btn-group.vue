<template>
  <div
    class="ec-radio-btn-group"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-radio-btn-group` : `ec-radio-btn-group`"
  >
    <div
      v-if="hasLabel"
      data-test="ec-radio-btn-group__label"
      class="ec-radio-btn-group__label"
    >
      <slot name="label">{{ label }}</slot>
    </div>
    <div
      data-test="ec-radio-btn-group__radio-btn-wrapper"
      class="ec-radio-btn-group__radio-btn-wrapper"
      :class="{ 'ec-radio-btn-group__radio-btn-wrapper--is-single-line': isGroupInline }"
    >
      <ec-radio-btn
        v-for="(option, optionIndex) in options"
        :key="optionIndex"
        :is-text-inline="isTextInline"
        :is-disabled="isDisabled"
        :has-error="isInvalid"
        :model-value="modelValue"
        :name="nameId"
        :value="option.value"
        :label="option.label"
        :description="option.description"
        :class="[{
          'tw-mt-16': optionIndex !== 0 && !isGroupInline,
          'tw-ml-40': optionIndex !== 0 && isGroupInline,
        }]"
        @update:model-value="emit('update:modelValue', $event);"
      />
    </div>
    <div
      :id="errorId"
      v-if="hasErrorMessage"
      class="ec-radio-btn-group__error-text"
      data-test="ec-radio-btn-group__error-text"
    >
      <slot name="error-message">{{ errorMessage }}</slot>
    </div>
  </div>

</template>

<script setup lang="ts">
import {
  computed,
  useSlots,
} from 'vue';

import { getUid } from '../../utils/uid';
import EcRadioBtn from '../ec-radio-btn';
import type { RadioButtonGroupEvent, RadioButtonGroupEvents, RadioButtonOption } from './types';

interface RadioButtonGroupProps {
  options: RadioButtonOption[],
  modelValue?: string,
  label?: string,
  errorMessage?: string,
  isDisabled?: boolean,
  isTextInline?: boolean,
  isGroupInline?: boolean,
}

const props = defineProps<RadioButtonGroupProps>();

const uid = getUid();
const id = `ec-radio-btn-group-${uid}`;
const errorId = computed(() => (isInvalid.value ? `${id}-error` : ''));
const nameId = `${id}-name`;
const slots = useSlots();
const isInvalid = computed(() => !!props.errorMessage);
const hasErrorMessage = computed(() => (!!props.errorMessage || !!slots['error-message']));
const hasLabel = computed(() => (!!props.label || !!slots.label));

const emit = defineEmits<{ (e: 'update:modelValue', value: RadioButtonGroupEvents[RadioButtonGroupEvent.UPDATE_MODEL_VALUE]): void,
}>();
</script>

<style>
.ec-radio-btn-group {
  &__label {
    @apply tw-mb-16;
    @apply tw-small-strong;
    @apply tw-text-gray-3;
  }

  &__radio-btn-wrapper {
    &--is-single-line {
      @apply tw-items-center;
      @apply tw-mt-0;
      @apply tw-flex tw-flex-nowrap;
    }
  }

  &__error-text {
    @apply tw-ml-32;
    @apply tw-help-text tw-text-error;
    @apply tw-mt-4;
  }
}
</style>
