<template>
  <div
    class="ec-radio-btn-group"
    :class="[$attrs.class]"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-radio-btn-group` : `ec-radio-btn-group`"
  >
    <div
      v-if="label"
      data-test="ec-radio-btn-group__label"
      class="ec-radio-btn-group__label"
    >
      {{ label }}
    </div>
    <div
      class="ec-radio-btn-group__radio-btn-wrapper"
      :class="{'ec-radio-btn-group__radio-btn-wrapper--is-single-line': isGroupInline}"
    >
      <ec-radio-btn
        v-for="(option, optionIndex) in options"
        :key="optionIndex"
        :is-text-inline="isTextInline"
        :is-disabled="isDisabled"
        :has-error="isInvalid"
        :model-value="modelValue"
        :name="name"
        :value="option.value"
        :label="option.label"
        :description="option.description"
        :class="[
          {
            'tw-mt-16': optionIndex !== 0 && !isGroupInline,
            'tw-ml-40': optionIndex !== 0 && isGroupInline,
          }
        ]"
      />
    </div>
    <div
      :id="errorId"
      v-if="errorId"
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
  withDefaults,
} from 'vue';

import { getUid } from '../../utils/uid';
import EcRadioBtn from '../ec-radio-btn';
import type { RadioButtonOption } from './types';

interface RadioButtonGroupProps {
  options: RadioButtonOption[],
  name: string,
  modelValue?: string,
  label?: string,
  errorMessage?: string,
  isDisabled?: boolean,
  isTextInline?: boolean,
  isGroupInline?: boolean,
}

const props = withDefaults(defineProps<RadioButtonGroupProps>(), {
  options: () => [],
  name: '',
  modelValue: '',
  label: '',
  errorMessage: '',
  isDisabled: false,
  isTextInline: false,
  isGroupInline: false,
});

const uid = getUid();
const isInvalid = computed(() => !!props.errorMessage);
const errorId = computed(() => (isInvalid.value ? `ec-radio-btn-group-error-${uid}` : ''));
</script>

<style>
.ec-radio-btn__group {
  &__label {
    @apply tw-mb-16;
    @apply tw-small-strong;
    @apply tw-text-gray-3;
  }

  &__radio-btn-wrapper {
    @apply tw-flex tw-flex-nowrap;
    @apply tw-content-center;

    &--is-single-line {
      @apply tw-items-center;
    }
  }

  &__error-text {
    @apply tw-ml-32;
    @apply tw-help-text tw-text-error;
    @apply tw-mt-4;
  }

  &--is-single-line {
    @apply tw-mt-0;
    @apply tw-flex tw-flex-nowrap;
  }
}
</style>
