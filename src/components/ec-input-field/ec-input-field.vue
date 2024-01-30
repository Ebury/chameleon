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
        :type="IconType.INTERACTIVE"
        :name="IconName.SIMPLE_INFO"
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
      v-if="leftIcon"
      class="ec-input-field__icon-wrapper ec-input-field__icon-wrapper--left"
      :class="{ 'ec-input-field__icon-wrapper--is-disabled': isDisabled }"
      data-test="ec-input-field__left-icon-wrapper"
    >
      <ec-icon
        class="ec-input-field__icon"
        data-test="ec-input-field__left-icon"
        :name="leftIcon"
        :size="leftIconSize"
        :type="leftIconType"
      />
    </div>
    <div
      v-if="isLoading || icon"
      class="ec-input-field__icon-wrapper ec-input-field__icon-wrapper--right"
      :class="{ 'ec-input-field__icon-wrapper--is-disabled': isDisabled }"
      data-test="ec-input-field__icon-wrapper"
    >
      <ec-loading-icon
        v-if="isLoading"
        class="ec-input-field__icon"
        :size="24"
      />
      <ec-icon
        v-if="icon"
        class="ec-input-field__icon"
        data-test="ec-input-field__icon"
        :name="icon"
        :size="iconSize"
        :type="iconType"
        @click="emit(InputFieldEvent.ICON_CLICK, modelValue)"
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
defineOptions({
  inheritAttrs: false,
});

import type { StyleValue } from 'vue';
import {
  computed, ref, useAttrs, watchEffect,
} from 'vue';

import type { Maybe } from '../../../global';
import useConfig from '../../composables/use-ec-config';
import vEcTooltip from '../../directives/ec-tooltip';
import { getUid } from '../../utils/uid';
import EcIcon from '../ec-icon';
import { IconName, IconType } from '../ec-icon/types';
import EcLoadingIcon from '../ec-loading-icon';
import type { InputFieldEvents, InputFieldExpose } from './types';
import { InputFieldEvent, InputFieldType } from './types';

const config = useConfig();
const attrs = useAttrs();
const style = attrs.style as unknown as StyleValue;

const emit = defineEmits<{
  'update:modelValue': [value: InputFieldEvents[InputFieldEvent.UPDATE_MODEL_VALUE]],
  'icon-click': [value: InputFieldEvents[InputFieldEvent.ICON_CLICK]],
}>();

interface InputFieldProps {
  type?: InputFieldType,
  modelValue?: number | string | Date,
  label?: string,
  labelTooltip?: string,
  note?: string,
  bottomNote?: string,
  errorMessage?: string,
  icon?: IconName,
  iconSize?: number,
  iconType?: IconType,
  leftIcon?: IconName,
  leftIconSize?: number,
  leftIconType?: IconType,
  isInGroup?: string,
  id?: string,
  errorId?: string,
  isLoading?: boolean,
  isSensitive?: boolean,
  isWarning?: boolean,
  autocomplete?: string,
}

const props = withDefaults(defineProps<InputFieldProps>(), {
  type: InputFieldType.TEXT,
  label: '',
  labelTooltip: '',
  note: '',
  bottomNote: '',
  errorMessage: '',
  iconSize: 20,
  leftIconSize: 20,
  isLoading: false,
  isSensitive: false,
  isWarning: false,
});

const isInvalid = computed(() => !!props.errorMessage);
const isDisabled = computed(() => !!attrs.disabled);

const uid = getUid();
const inputId = computed(() => props.id || `ec-input-field-${uid}`);
const errorMessageId = computed(() => (isInvalid.value ? (props.errorId || `ec-input-field-error-${uid}`) : undefined));

const inputModel = computed<InputFieldProps['modelValue']>({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit(InputFieldEvent.UPDATE_MODEL_VALUE, value as unknown as InputFieldEvents[InputFieldEvent.UPDATE_MODEL_VALUE]);
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
  if (props.leftIcon) {
    classes.push('ec-input-field__input--has-left-icon');
  }
  if (props.isSensitive) {
    classes.push(config.sensitiveClass);
  }

  return classes;
});

const inputRef = ref<Maybe<HTMLInputElement>>(null);

function focus() {
  /* c8 ignore next */
  inputRef.value?.focus();
}

watchEffect(() => {
  // Hack: since Vue 3 we occasionally run into issues that the inputModel and value of the input are getting out of sync.
  // in order to fix it we should sync it automatically every time inputModel changes.
  const inputElement = inputRef.value;
  if (inputElement && inputElement.value !== inputModel.value) {
    /* c8 ignore next */
    inputElement.value = inputModel.value as string ?? '';
  }
});

defineExpose<InputFieldExpose>({ focus, inputRef });
</script>

<style>
:root,
:host {
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

    &--has-left-icon {
      padding-left: var(--ec-input-field-icon-area-size);
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
    @apply tw-absolute;
    @apply tw-inline-block;
    @apply tw-text-gray-3 tw-fill-current tw-text-center;

    height: var(--ec-input-field-icon-area-size);
    width: var(--ec-input-field-icon-area-size);
    line-height: var(--ec-input-field-icon-area-size);

    &--is-disabled {
      @apply tw-text-gray-6;
    }

    &--left {
      @apply tw-left-0 tw-fill-gray-5;
    }

    &--right {
      @apply tw-right-0;
    }
  }

  &__icon {
    @apply tw-inline-block tw-align-middle;
  }
}
</style>
