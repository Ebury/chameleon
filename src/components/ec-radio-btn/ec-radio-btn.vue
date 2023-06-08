<template>
  <div
    class="ec-radio-btn"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-radio-btn ec-radio-btn` : `ec-radio-btn ec-radio-btn`"
    @click="onClick();"
  >
    <input
      v-bind="{
        'aria-describedby': `${errorId} ${labelId} ${descriptionId}`,
        value: value,
        id: id,
        disabled: isDisabled,
        type: 'radio',
      }"
      ref="inputRadioRef"
      class="ec-radio-btn__input"
      data-test="ec-radio-btn__input"
      :value="modelValue"
      :name="name"
      @focus="setFocusState(true)"
      @blur="setFocusState(false)"
    >

    <div
      class="ec-radio-btn__wrapper"
      :class="{
        'ec-radio-btn__wrapper--is-single-line': isTextInline,
      }"
    >
      <div
        data-test="ec-radio-btn__icon-wrapper"
        class="ec-radio-btn__icon-wrapper"
        :class="{
          'ec-radio-btn__icon-wrapper--focused': isFocused && !isChecked,
          'ec-radio-btn__icon-wrapper--checked': isChecked && !isDisabled && !isFocused,
          'ec-radio-btn__icon-wrapper--checked-and-focused': isChecked && isFocused,
          'ec-radio-btn__icon-wrapper--error': hasError && !isChecked,
          'ec-radio-btn__icon-wrapper--disabled': isDisabled && !isChecked,
          'ec-radio-btn__icon-wrapper--checked-and-disabled': isDisabled && isChecked,
        }"
      >
        <div
          class="ec-radio-btn__icon-wrapper-inner"
        >

          <ec-icon
            class="ec-radio-btn__icon"
            :class="{
              'ec-radio-btn__icon--checked': isChecked && !isDisabled,
              'ec-radio-btn__icon--checked-and-disabled': isDisabled && isChecked,
            }"
            :name="IconName.RoundedNotification"
            :size="20"
          />
        </div>
      </div>

      <div
        v-if="hasLabel"
        data-test="ec-radio-btn__text-wrapper"
        class="ec-radio-btn__text-wrapper"
        :class="{
          'ec-radio-btn__text-wrapper--is-single-line': isTextInline,
        }"
      >
        <label
          :id="labelId"
          :for="id"
          class="ec-radio-btn__label"
          :class="{
            'ec-radio-btn__label--disabled': isDisabled,
          }"
          :title="isTextInline ? label : undefined"
          data-test="ec-radio-btn__label"
        >
          <slot name="label">{{ label }}</slot>
        </label>

        <p
          :id="descriptionId"
          v-if="hasDescription"
          class="ec-radio-btn__description"
          :class="{
            'ec-radio-btn__description--is-single-line': isTextInline,
            'ec-radio-btn__description--disabled': isDisabled,
          }"
          :title="isTextInline ? description : undefined"
          data-test="ec-radio-btn__description"
        >
          <slot name="description">{{ description }}</slot>
        </p>
      </div>
    </div>

    <div
      :id="errorId"
      v-if="hasErrorMessage"
      class="ec-radio-btn__error-text"
      data-test="ec-radio-btn__error-text"
    >
      <slot name="error-message">{{ errorMessage }}</slot>
    </div>
  </div>

</template>

<script setup lang="ts">
import {
  computed, ref, useSlots,
} from 'vue';

import { getUid } from '../../utils/uid';
import EcIcon from '../ec-icon';
import { IconName } from '../ec-icon/types';
import type { RadioButtonEvents } from './types';
import { RadioButtonEvent } from './types';

interface RadioButtonProps {
  value: string,
  modelValue?: string,
  label?: string,
  description?: string,
  isDisabled?: boolean,
  isTextInline?: boolean,
  name?: string,
  errorMessage?: string,
  hasError?: boolean
}

const props = defineProps<RadioButtonProps>();

const uid = getUid();
const slots = useSlots();

const id = `ec-radio-btn-${uid}`;
const errorId = `${id}-error`;
const labelId = `${id}-label`;
const descriptionId = `${id}-description`;
const inputRadioRef = ref();

const emit = defineEmits<{ (e: 'update:modelValue', value: RadioButtonEvents[RadioButtonEvent.UPDATE_MODEL_VALUE]): void,
}>();

const isChecked = computed(() => props.modelValue === props.value);
const isFocused = ref(false);

const hasLabel = computed(() => (!!props.label || !!slots.label));
const hasDescription = computed(() => (!!props.description || !!slots.description));
const hasErrorMessage = computed(() => (!!props.errorMessage || !!slots['error-message']));

function setFocusState(state: boolean) {
  isFocused.value = state;
}

function onClick() {
  if (!props.isDisabled) {
    inputRadioRef.value.focus();
    emit(RadioButtonEvent.UPDATE_MODEL_VALUE, props.value);
  }
}
</script>

<style>
.ec-radio-btn {
  &__input {
    @apply tw-sr-only;
  }

  &__wrapper {
    @apply tw-flex tw-flex-nowrap;
    @apply tw-content-center;

    &--is-single-line {
      @apply tw-items-center;
    }
  }

  &__label {
    @apply tw-cursor-pointer;
    @apply tw-input-label;
    @apply tw-flex-grow;
    @apply tw-min-w-0;

    &--disabled {
      @apply tw-cursor-default;
    }
  }

  &__description {
    @apply tw-cursor-pointer;
    @apply tw-small-text;
    @apply tw-mb-0;
    @apply tw-mt-8;

    &--is-single-line {
      @apply tw-mt-0;
      @apply tw-ml-8;
    }

    &--disabled {
      @apply tw-cursor-default;
    }
  }

  &__text-wrapper {
    &--is-single-line {
      @apply tw-flex;
      @apply tw-flex-nowrap;
    }
  }

  &__icon-wrapper {
    @apply tw-cursor-pointer;
    @apply tw-bg-gray-8;
    @apply tw-w-24 tw-h-24;
    @apply tw-flex-shrink-0;
    @apply tw-border-2 tw-border-solid tw-border-gray-4;
    @apply tw-flex tw-items-center tw-justify-center;
    @apply tw-relative;
    @apply tw-mr-8;
    @apply tw-rounded-1/2;

    &--focused,
    &:hover {
      @apply tw-border-key-4;
    }

    &--checked {
      @apply tw-border-key-4;
      @apply tw-bg-key-4;

      &:hover {
        @apply tw-bg-key-3;
      }
    }

    &--checked-and-focused {
      @apply tw-border-key-3;
      @apply tw-bg-key-3;
    }

    &--disabled {
      @apply tw-border-gray-6;
      @apply tw-cursor-default;

      &:hover,
      &:focus {
        @apply tw-border-gray-6;
      }
    }

    &--checked-and-disabled {
      @apply tw-bg-gray-6;
      @apply tw-border-gray-6;

      &:hover,
      &:focus {
        @apply tw-bg-gray-6;
        @apply tw-border-gray-6;
        @apply tw-cursor-default;
      }
    }

    &--error {
      @apply tw-border-error;
    }
  }

  &__icon-wrapper-inner {
    @apply tw-rounded-1/2;
    @apply tw-bg-gray-8;
    @apply tw-absolute;
    @apply tw-w-20 tw-h-20;
  }

  &__icon {
    padding: 2px;
    @apply tw-translate-x-1/2 tw--translate-y-1/2;
    @apply tw-p-1;
    @apply tw-fill-gray-8;
    @apply tw-absolute;
    @apply tw-left-0 tw-top-0;

    &--checked {
      @apply tw-fill-key-4;
    }

    &--checked-and-disabled {
      @apply tw-fill-gray-6;
    }
  }

  &__error-text {
    @apply tw-ml-32;
    @apply tw-help-text tw-text-error;
    @apply tw-mt-4;
  }
}
</style>
