<template>
  <div
    v-if="label"
    data-test="ec-radio-btn__label"
    class="ec-radio-btn__label"
  >
    {{ label }}
  </div>
  <div
    data-test="ec-radio-btn__group"
    class="ec-radio-btn__group"
    :class="{'ec-radio-btn__group--is-single-line': isGroupInline}"
  >
    <div
      v-for="(radio, radioIndex) in radioButtons"
      :key="radioIndex"
      class="ec-radio-btn"
      :class="[
        $attrs.class,
        {
          'tw-mt-16': radioIndex !== 0 && !isGroupInline,
          'tw-ml-40': radioIndex !== 0 && isGroupInline,
        }
      ]"
      :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-radio-btn ec-radio-btn-${radioIndex}` : `ec-radio-btn ec-radio-btn-${radioIndex}`"
      @click="onRadioBtnClick(radio.value)"
    >
      <input
        v-bind="{
          'aria-describedby': errorId,
          'data-test': `ec-radio-btn__input ec-radio-btn__input-${radioIndex}`,
          value: radio.value,
          class: 'ec-radio-btn__input',
          id: id,
          disabled: isDisabled,
          type: 'radio'
        }"
        :value="modelValue"
        @focus="setFocusState(radioIndex, true)"
        @blur="setFocusState(radioIndex, false)"
      >

      <div
        class="ec-radio-btn__wrapper"
        :class="{
          'ec-radio-btn__wrapper--is-single-line': isTextInline,
        }"
      >
        <div
          :data-test="`ec-radio-btn__radio-icon-wrapper ec-radio-btn__radio-icon-wrapper-${radioIndex}`"
          class="ec-radio-btn__radio-icon-wrapper"
          :class="{
            'ec-radio-btn__radio-icon-wrapper--focused': isOptionFocused(radioIndex) && !isOptionChecked(radio.value),
            'ec-radio-btn__radio-icon-wrapper--checked': isOptionChecked(radio.value) && !isDisabled && !isOptionFocused(radioIndex),
            'ec-radio-btn__radio-icon-wrapper--checked-and-focused': isOptionChecked(radio.value) && isOptionFocused(radioIndex),
            'ec-radio-btn__radio-icon-wrapper--error': isInvalid && !isOptionChecked(radio.value),
            'ec-radio-btn__radio-icon-wrapper--disabled': isDisabled,
            'ec-radio-btn__radio-icon-wrapper--checked-and-disabled': isDisabled && isOptionChecked(radio.value),
          }"
        >
          <div
            class="ec-radio-btn__radio-icon-wrapper-inner"
          >

            <ec-icon
              class="ec-radio-btn__radio-icon"
              :class="{
                'ec-radio-btn__radio-icon--checked': isOptionChecked(radio.value) && !isDisabled,
                'ec-radio-btn__radio-icon--checked-and-disabled': isDisabled && isOptionChecked(radio.value)
              }"
              name="rounded-notification"
              :size="20"
            />
          </div>
        </div>

        <div
          data-test="ec-radio-btn__radio-text-wrapper"
          class="ec-radio-btn__radio-text-wrapper"
          :class="{
            'ec-radio-btn__radio-text-wrapper--is-single-line': isTextInline,
          }"
        >
          <label
            v-if="radio.label"
            :for="id"
            class="ec-radio-btn__radio-label"
            :class="{
              'ec-radio-btn__radio-label--disabled': isDisabled,
            }"
            :title="isTextInline ? radio.label : undefined"
            :data-test="`ec-radio-btn__radio-label ec-radio-btn__radio-label-${radioIndex}`"
          >
            {{ radio.label }}
          </label>

          <p
            v-if="radio.description"
            :for="id"
            class="ec-radio-btn__radio-description"
            :class="{
              'ec-radio-btn__radio-description--is-single-line': isTextInline,
              'ec-radio-btn__radio-description--disabled': isDisabled,
            }"
            :title="isTextInline ? radio.description : undefined"
            :data-test="`ec-radio-btn__radio-description ec-radio-btn__radio-description-${radioIndex}`"
          >
            {{ radio.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div
    :id="id"
    v-if="isInvalid"
    class="ec-radio-btn__error-text"
    data-test="ec-radio-btn__error-text"
  />
</template>

<script setup lang="ts">
import {
  computed, ref, withDefaults,
} from 'vue';

import { getUid } from '../../utils/uid';
import EcIcon from '../ec-icon';
import type { RadioButtonEvents, RadioButtonOption } from './types';
import { RadioButtonEvent } from './types';

interface RadioButton extends RadioButtonOption {
    isFocused: boolean
}

interface RadioButtonProps {
  options: RadioButtonOption[],
  modelValue?: string,
  label?: string,
  errorMessage?: string,
  isDisabled?: boolean,
  isGroupInline?: boolean,
  isTextInline?: boolean
}

const props = withDefaults(defineProps<RadioButtonProps>(), {
  modelValue: '',
  label: '',
  errorMessage: '',
  isDisabled: false,
  isGroupInline: false,
  isTextInline: false,
});

const uid = getUid();

const id = `ec-radio-btn-${uid}`;
const isInvalid = computed(() => props.errorMessage);
const errorId = computed(() => (isInvalid.value ? `ec-radio-btn-error-${uid}` : ''));

const emit = defineEmits<{(e: 'update:modelValue', value: RadioButtonEvents[RadioButtonEvent.UPDATE_MODEL_VALUE]): void,
}>();

const radioButtons = ref<RadioButton[]>([]);

function addFocusPropertyToRadios(options: RadioButtonOption[]) {
  radioButtons.value = options.map(radio => ({
    ...radio,
    isFocused: false,
  }));
}

function isOptionChecked(radioValue: string) {
  return props.modelValue === radioValue;
}

function isOptionFocused(radioIndex: number) {
  return radioButtons.value[radioIndex].isFocused;
}

function setFocusState(radioIndex: number, state: boolean) {
  radioButtons.value[radioIndex].isFocused = state;
  console.log(document.activeElement);
}

function onRadioBtnClick(value: string) {
  if (!props.isDisabled) {
    emit(RadioButtonEvent.UPDATE_MODEL_VALUE, value);
  }
}

function init() {
  addFocusPropertyToRadios(props.options);
}

init();
</script>

<style>
.ec-radio-btn {
  &__label {
    @apply tw-mb-16;
    @apply tw-small-strong;
    @apply tw-text-gray-3;
  }

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

  &__radio-label {
    @apply tw-cursor-pointer;
    @apply tw-input-label;
    @apply tw-flex-grow;
    @apply tw-min-w-0;

    &--disabled {
      @apply tw-cursor-default;
    }
  }

  &__radio-description {
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

  &__radio-text-wrapper {
    @apply tw-cursor-pointer;

    &--is-single-line {
      @apply tw-flex;
      @apply tw-flex-nowrap;
    }
  }

  &__radio-icon-wrapper {
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

      &:hover,
      &:focus {
        @apply tw-bg-gray-6;
      }
    }

    &--error {
      @apply tw-border-error;
    }
  }

  &__radio-icon-wrapper-inner {
    @apply tw-rounded-1/2;
    @apply tw-bg-gray-8;
    @apply tw-absolute;
    @apply tw-w-20 tw-h-20;
  }

  &__radio-icon {
    transform: translate(-50%, -50%);
    padding: 2px;
    @apply tw-fill-gray-8;
    @apply tw-absolute;
    @apply tw-left-1/2 tw-top-1/2;

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

.ec-radio-btn__group {
  &--is-single-line {
    @apply tw-mt-0;
    @apply tw-flex tw-flex-nowrap;
  }
}
</style>
