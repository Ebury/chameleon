<template>
  <div
    class="ec-checkbox"
    :class="$attrs.class"
    :style="($attrs.style as StyleValue)"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-checkbox` : 'ec-checkbox'"
  >
    <input
      v-bind="({
        ...$attrs,
        style: undefined,
        class: 'ec-checkbox__input',
        id: id,
        'aria-describedby': errorId,
        disabled: disabled,
        'data-test': 'ec-checkbox__input',
        type: 'checkbox',
      } as InputHTMLAttributes)"
      ref="checkboxInput"
      v-model="inputModel"
      @focus="inputIsFocused = true"
      @blur="inputIsFocused = false"
    >

    <div
      :class="{
        'ec-checkbox__label-checkbox-wrapper': true,
        'ec-checkbox__label-checkbox-wrapper--is-single-line': isSingleLine,
      }"
    >
      <span
        class="ec-checkbox__check-icon-wrapper"
        :class="{
          'ec-checkbox__check-icon-wrapper--focused': inputIsFocused,
          'ec-checkbox__check-icon-wrapper--checked': inputModel,
          'ec-checkbox__check-icon-wrapper--checked-and-focused': inputModel && inputIsFocused,
          'ec-checkbox__check-icon-wrapper--indeterminate': indeterminate,
          'ec-checkbox__check-icon-wrapper--indeterminate-and-focused': indeterminate && inputIsFocused,
          'ec-checkbox__check-icon-wrapper--error': isInvalid && !inputModel,
          'ec-checkbox__check-icon-wrapper--disabled': disabled,
          'ec-checkbox__check-icon-wrapper--checked-and-disabled': disabled && inputModel,
          'ec-checkbox__check-icon-wrapper--indeterminate-and-disabled': disabled && indeterminate,
        }"
        data-test="ec-checkbox__check-icon-wrapper"
        @click="checkboxInput?.click()"
      >
        <span
          v-if="indeterminate"
          class="ec-checkbox__indeterminate-icon"
          data-test="ec-checkbox__indeterminate-icon"
        />
        <ec-icon
          v-else-if="inputModel"
          class="ec-checkbox__check-icon"
          data-test="ec-checkbox__check-icon"
          :name="IconName.SimpleCheck"
          :size="16"
        />
      </span>

      <label
        :for="id"
        :class="{
          'ec-checkbox__label': true,
          'ec-checkbox__label--is-single-line': isSingleLine,
        }"
        :title="isSingleLine ? label : undefined"
        data-test="ec-checkbox__label"
      >
        <slot name="label">{{ label }}</slot>
      </label>
    </div>

    <div
      :id="errorId"
      v-if="isInvalid"
      class="ec-checkbox__error-text"
      data-test="ec-checkbox__error-text"
    >
      <slot name="error-message">{{ errorMessage }}</slot>
    </div>

  </div>
</template>

<script setup lang="ts">
import {
  computed,
  type InputHTMLAttributes,
  onMounted,
  ref,
  type StyleValue,
  useSlots,
  watch,
} from 'vue';

import { getUid } from '../../utils/uid';
import EcIcon from '../ec-icon';
import { IconName } from '../ec-icon/types';
import { CheckboxEvent, type CheckboxEvents } from './types';

interface CheckboxProps {
  modelValue?: boolean,
  indeterminate?: boolean,
  label?: string,
  errorMessage?: string,
  disabled?: boolean,
  isSingleLine?: boolean,
}

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<CheckboxProps>(), {
  indeterminate: false,
  label: '',
  errorMessage: '',
  disabled: false,
  isSingleLine: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: CheckboxEvents[CheckboxEvent.UPDATE_MODEL_VALUE]],
}>();

const uid = getUid();
const slots = useSlots();

const id = `ec-checkbox-${uid}`;
const isInvalid = computed(() => (!!props.errorMessage || !!slots['error-message']));
const errorId = computed(() => (isInvalid.value ? `ec-checkbox-error-${uid}` : undefined));

const inputIsFocused = ref(false);
const checkboxInput = ref<HTMLInputElement>();

const inputModel = computed({
  get() {
    return props.modelValue;
  },
  set(checked) {
    emit(CheckboxEvent.UPDATE_MODEL_VALUE, checked);
  },
});

watch(() => props.indeterminate, (newValue) => {
  updateIndeterminate(newValue);
});

function updateIndeterminate(newValue: CheckboxProps['modelValue']) {
  if (checkboxInput.value) {
    checkboxInput.value.indeterminate = !!newValue;
  }
}

onMounted(() => {
  updateIndeterminate(props.indeterminate);
});
</script>

<style>
.ec-checkbox {
  &__input {
    @apply tw-sr-only;
  }

  &__label-checkbox-wrapper {
    @apply tw-flex tw-flex-nowrap;

    &--is-single-line {
      @apply tw-items-center;
    }
  }

  &__label {
    @apply tw-input-label;
    @apply tw-flex-grow;
    @apply tw-min-w-0;

    &--is-single-line {
      @apply tw-small-text;
    }
  }

  &__check-icon-wrapper {
    @apply tw-cursor-pointer;
    @apply tw-bg-gray-8;
    @apply tw-w-20 tw-h-20;
    @apply tw-flex-shrink-0;
    @apply tw-border-2 tw-border-solid tw-border-gray-4;
    @apply tw-flex tw-items-center tw-justify-center;
    @apply tw-relative;
    @apply tw-mr-8;
    @apply tw-rounded-sm;

    &--focused,
    &:hover {
      @apply tw-border-key-3;
    }

    &--checked,
    &--indeterminate {
      @apply tw-border-key-4;
      @apply tw-bg-key-4;

      &:hover {
        @apply tw-bg-key-3;
      }
    }

    &--checked-and-focused,
    &--indeterminate-and-focused {
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

    &--checked-and-disabled,
    &--indeterminate-and-disabled {
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

  &__check-icon {
    transform: translate(-50%, -50%);

    @apply tw-fill-gray-8;
    @apply tw-absolute;
    @apply tw-left-1/2 tw-top-1/2;
  }

  &__indeterminate-icon {
    /* to match the dimensions in design, we cannot use TW */
    height: 2px;
    width: 10px;

    @apply tw-inline-block;
    @apply tw-bg-gray-8;
  }

  &__error-text {
    @apply tw-help-text tw-text-error;
    @apply tw-mt-4;
  }
}
</style>
