<template>
  <div
    :class="['ec-input-field', attrs.class]"
    :style="style"
    data-test="ec-input-field"
  >
    <label
      v-if="label || note"
      class="ec-input-field__label"
      data-test="ec-input-field__label"
      :for="inputId"
    >
      <span
        v-if="label"
        class="ec-input-field__label-text"
        data-test="ec-input-field__label-text"
      >{{ label }}<ec-icon
        v-if="labelTooltip"
        v-ec-tooltip="{ content: labelTooltip }"
        class="ec-input-field__tooltip"
        data-test="ec-input-field__tooltip"
        type="interactive"
        name="simple-info"
        :size="14"
      />
      </span>
      <span
        v-if="note"
        class="ec-input-field__note"
        data-test="ec-input-field__note"
      >{{ note }}</span>
    </label>
    <input
      v-bind="{
        ...$attrs,
        style: undefined,
        class: inputClasses,
        id: inputId,
        'aria-describedby': errorMessageId,
        'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-input-field__input` : 'ec-input-field__input',
        type,
      }"
      ref="inputRef"
      v-model="inputModel"
      :autocomplete="autocomplete"
    >
    <div
      v-if="isLoading || icon"
      class="ec-input-field__icon-wrapper"
      :class="{ 'ec-input-field__icon-wrapper--is-disabled': isDisabled }"
      data-test="ec-input-field__icon-wrapper"
    >
      <ec-loading-icon
        v-if="isLoading"
        class="ec-input-field__icon"
        :size="24"
      />
      <ec-icon
        v-else
        class="ec-input-field__icon"
        data-test="ec-input-field__icon"
        :name="icon"
        :size="iconSize"
        @click="emit('icon-click', modelValue);"
      />
    </div>
    <div
      :id="errorMessageId"
      v-if="isInvalid && !isInGroup"
      class="ec-input-field__error-text"
      data-test="ec-input-field__error-text"
    >{{ errorMessage }}</div>
    <div
      v-else-if="bottomNote"
      data-test="ec-input-field__bottom-note"
      class="ec-input-field__bottom-note"
      :class="{ 'ec-input-field__bottom-note--is-warning': isWarning }"
    >{{ bottomNote }}</div>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line simple-import-sort/imports
import type { StyleValue } from 'vue';

import {
  computed,
  ref,
  useAttrs,
  watchEffect,
} from 'vue';

import type { Maybe } from '../../../global';
import config from '../../config';
import vEcTooltip from '../../directives/ec-tooltip';
import { getUid } from '../../utils/uid';
import EcIcon from '../ec-icon';
import EcLoadingIcon from '../ec-loading-icon';
import { InputType } from './types';

const attrs = useAttrs();
const style = attrs.style as unknown as StyleValue;
const emit = defineEmits(['update:modelValue', 'icon-click']);

interface InputFieldProps {
  type?: InputType,
  modelValue?: number | string | Date,
  label?: string,
  labelTooltip?: string,
  note?: string,
  bottomNote?: string,
  errorMessage?: string,
  icon?: string,
  iconSize?: number,
  isInGroup?: string,
  id?: string,
  errorId?: string,
  isLoading?: boolean,
  isSensitive?: boolean,
  isWarning?: boolean,
  autocomplete?: string,
}

const props = withDefaults(defineProps<InputFieldProps>(), {
  type: InputType.TEXT,
  label: '',
  labelTooltip: '',
  note: '',
  bottomNote: '',
  errorMessage: '',
  icon: '',
  iconSize: 20,
  isLoading: false,
  isSensitive: false,
  isWarning: false,
});

const isInvalid = computed(() => !!props.errorMessage);
const isDisabled = computed(() => !!attrs.disabled);

const uid = getUid();
const inputId = computed(() => props.id || `ec-input-field-${uid}`);
const errorMessageId = computed(() => (isInvalid.value ? (props.errorId || `ec-input-field-error-${uid}`) : undefined));

const inputModel = computed<typeof props.modelValue>({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const inputClasses = computed(() => {
  const classes = ['ec-input-field__input'];

  if (props.isInGroup) {
    classes.push(`ec-input-field__input--is-in-group-${props.isInGroup}`);
  }
  if (props.isLoading) {
    classes.push('ec-input-field__input--is-loading');
  }
  if (isInvalid.value) {
    classes.push('ec-input-field__input--has-error');
  }
  if (props.icon) {
    classes.push('ec-input-field__input--has-icon');
  }
  if (props.isSensitive) {
    classes.push(config.sensitiveClass);
  }

  return classes;
});

const inputRef = ref<Maybe<HTMLInputElement>>(null);

function focus() {
  if (inputRef.value) {
    inputRef.value.focus();
  }
}

watchEffect(() => {
  const inputElement = inputRef.value;
  if (inputElement && inputElement.value !== inputModel.value) {
    inputElement.value = `${inputModel.value}` ?? '';
  }
});

defineExpose({ focus, inputRef });
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<style>
:root {
  --ec-input-field-height: 42px;
  --ec-input-field-icon-area-size: var(--ec-input-field-height);
}

.ec-input-field {
  @apply tw-w-full;
  @apply tw-relative;

  &__input {
    @apply tw-body-text tw-text-gray-3;
    @apply tw-rounded;
    @apply tw-py-8 tw-px-12;
    @apply tw-border tw-border-solid tw-border-gray-6;
    @apply tw-max-w-full;

    width: inherit;

    &--has-error {
      @apply tw-border tw-border-solid tw-border-error;

      &:hover,
      &:focus {
        @apply tw-border tw-border-solid tw-border-error;
      }
    }

    &--is-in-group-left {
      @apply tw-rounded-l-none;
    }

    &--is-in-group-right {
      @apply tw-rounded-r-none;
    }

    &--is-loading {
      @apply tw-text-gray-5;
    }

    &--has-icon {
      padding-right: var(--ec-input-field-icon-area-size);
    }

    &:focus {
      @apply tw-border tw-border-solid tw-border-key-4;
      @apply tw-outline-none;
    }

    &:disabled {
      @apply tw-bg-gray-7;
    }

    &:read-only,
    &[readonly] {
      /* :read-only is not supported by IE https://developer.mozilla.org/en-US/docs/Web/CSS/:read-only */
      @apply tw-truncate;
    }
  }

  &__label {
    @apply tw-flex tw-flex-wrap;
  }

  &__tooltip {
    @apply tw-flex-shrink-0 tw-self-center;
    @apply tw-ml-4;
  }

  &__label-text {
    @apply tw-flex tw-flex-grow;
    @apply tw-input-label;
    @apply tw-mr-8;
  }

  &__note {
    @apply tw-caption-text;
  }

  &__bottom-note {
    @apply tw-help-text;
    @apply tw-mt-4;

    &--is-warning {
      @apply tw-text-warning-dark;
    }
  }

  &__error-text {
    @apply tw-help-text tw-text-error;
    @apply tw-mt-4;
  }

  &__icon-wrapper {
    @apply tw-absolute tw-right-0;
    @apply tw-inline-block;
    @apply tw-text-gray-3 tw-fill-current tw-text-center;

    height: var(--ec-input-field-icon-area-size);
    width: var(--ec-input-field-icon-area-size);
    line-height: var(--ec-input-field-icon-area-size);

    &--is-disabled {
      @apply tw-text-gray-6;
    }
  }

  &__icon {
    @apply tw-inline-block tw-align-middle;
  }
}
</style>
