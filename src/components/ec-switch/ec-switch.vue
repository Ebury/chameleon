<template>
  <div
    class="ec-switch"
    :class="$attrs.class"
    :style="($attrs.style as StyleValue)"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-switch` : 'ec-switch'"
  >
    <input
      v-bind="{
        ...$attrs,
        style: undefined,
        class: 'ec-switch__input',
        id,
        'aria-describedby': errorId,
        disabled,
        'data-test': 'ec-switch__input',
        type: 'checkbox',
      }"
      ref="switchInput"
      v-model="inputModel"
    >

    <div
      :class="{
        'ec-switch__label-switch-wrapper': true,
      }"
    >
      <span
        class="ec-switch__wrapper"
        :class="{
          'ec-switch__wrapper--checked': inputModel,
          'ec-switch__wrapper--error': isInvalid && !inputModel,
          'ec-switch__wrapper--disabled': disabled,
          'ec-switch__wrapper--checked-and-disabled': disabled && inputModel,
        }"
        data-test="ec-switch__wrapper"
        @click="switchInput?.click()"
      />

      <label
        :for="id"
        :class="{
          'ec-switch__label': true,
        }"
        :title="label"
        data-test="ec-switch__label"
      >
        <slot name="label">{{ label }}</slot>
      </label>
    </div>

    <div
      :id="errorId"
      v-if="isInvalid"
      class="ec-switch__error-text"
      data-test="ec-switch__error-text"
    >
      <slot name="error-message">{{ errorMessage }}</slot>
    </div>

  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  type StyleValue,
  useSlots,
} from 'vue';

import { getUid } from '../../utils/uid';
import { SwitchEvent, type SwitchEvents, type SwitchProps } from './types';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<SwitchProps>(), {
  label: '',
  errorMessage: '',
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: SwitchEvents[SwitchEvent.UPDATE_MODEL_VALUE]],
}>();

const uid = getUid();
const slots = useSlots();

const id = `ec-switch-${uid}`;
const isInvalid = computed(() => (!!props.errorMessage || !!slots['error-message']));
const errorId = computed(() => (isInvalid.value ? `ec-switch-error-${uid}` : undefined));

const switchInput = ref<HTMLInputElement>();

const inputModel = computed({
  get() {
    return props.modelValue;
  },
  set(checked) {
    emit(SwitchEvent.UPDATE_MODEL_VALUE, checked);
  },
});
</script>

<style>
.ec-switch {
  &__input {
    @apply tw-opacity-0;
    @apply tw-h-0;
    @apply tw-w-0;
  }

  &__label-switch-wrapper {
    @apply tw-flex tw-flex-nowrap;
  }

  &__label {
    @apply tw-input-label;
    @apply tw-flex-grow;
    @apply tw-min-w-0;
  }

  &__wrapper {
    @apply tw-cursor-pointer;
    @apply tw-bg-gray-7;
    @apply tw-w-32 tw-h-16;
    @apply tw-flex-shrink-0;
    @apply tw-flex tw-items-center tw-justify-center;
    @apply tw-relative;
    @apply tw-mr-8;
    @apply tw-duration-400;

    border-radius: 20px;

    &:before {
      @apply tw-absolute;
      @apply tw-h-12;
      @apply tw-w-12;
      @apply tw-bg-gray-8;
      @apply tw-duration-400;

      content: '';
      left: 2px;
      bottom: 2px;
      border-radius: 50%;
    }

    &:hover {
      @apply tw-border-key-3;
    }

    &--checked {
      @apply tw-border-key-4;
      @apply tw-bg-key-4;

      &:hover {
        @apply tw-bg-key-3;
      }

      &:before {
        transform: translateX(14px);
      }
    }

    &--disabled {
      @apply tw-border-gray-6;
      @apply tw-cursor-default;

      &:hover {
        @apply tw-border-gray-6;
      }
    }

    &--checked-and-disabled {
      @apply tw-bg-gray-6;

      &:hover {
        @apply tw-bg-gray-6;
      }
    }

    &--error {
      @apply tw-border tw-border-solid tw-border-error;
    }
  }

  &__error-text {
    @apply tw-help-text tw-text-error;
    @apply tw-mt-4;
  }
}
</style>
