<template>
  <div
    class="ec-textarea"
    :class="attrs.class"
    :style="style"
    data-test="ec-textarea"
  >
    <label
      v-if="label || note"
      class="ec-textarea__label"
      data-test="ec-textarea__label"
      :for="textareaId"
    >
      <span
        v-if="label"
        class="ec-textarea__label-text"
        data-test="ec-textarea__label-text"
      >{{ label }}<ec-icon
        v-if="labelTooltip"
        v-ec-tooltip="{ content: labelTooltip }"
        class="ec-textarea__tooltip"
        data-test="ec-textarea__tooltip"
        :type="IconType.INTERACTIVE"
        :name="IconName.SIMPLE_INFO"
        :size="14"
      />
      </span>

      <span
        v-if="note"
        class="ec-textarea__note"
        data-test="ec-textarea__note"
      >{{ note }}</span>
    </label>

    <textarea
      v-bind="{ ...attrs, class: undefined, style: undefined }"
      :id="textareaId"
      ref="textareaRef"
      v-model="textareaModel"
      :rows="rows"
      :class="{
        'ec-textarea__textarea': true,
        'ec-textarea__textarea--has-error': isInvalid,
        [config.sensitiveClass]: isSensitive,
      }"
      :aria-describedby="errorMessageId"
      :data-test="attrs['data-test'] ? `${attrs['data-test']} ec-textarea__textarea` : 'ec-textarea__textarea'"
      :autocomplete="autocomplete"
    />

    <div
      :id="errorMessageId"
      v-if="isInvalid"
      class="ec-textarea__error-text"
      data-test="ec-textarea__error-text"
    >{{ errorMessage }}</div>

    <div
      v-else-if="bottomNote"
      data-test="ec-textarea__bottom-note"
      class="ec-textarea__bottom-note"
      :class="{ 'ec-textarea__bottom-note--is-warning': isWarning }"
    >{{ bottomNote }}</div>
  </div>
</template>

<script setup lang="ts">
import {
  computed, ref, type StyleValue, useAttrs,
} from 'vue';

import type { Maybe } from '../../../global';
import useConfig from '../../composables/use-ec-config';
import vEcTooltip from '../../directives/ec-tooltip';
import { getUid } from '../../utils/uid';
import EcIcon from '../ec-icon';
import { IconName, IconType } from '../ec-icon/types';
import type { TextareaProps } from './types';

defineOptions({
  inheritAttrs: false,
});

const config = useConfig();

const emit = defineEmits<{
  'update:modelValue': [value: string],
}>();

const props = withDefaults(defineProps<TextareaProps>(), {
  modelValue: '',
  rows: 4,
  label: '',
  labelTooltip: '',
  note: '',
  bottomNote: '',
  errorMessage: '',
});

defineExpose({
  focus,
});

const attrs = useAttrs();
const style = attrs.style as unknown as StyleValue;

const isInvalid = computed(() => !!props.errorMessage);

const textareaRef = ref<Maybe<HTMLTextAreaElement>>();

const uid = getUid();
const textareaId = computed(() => props.id || `ec-textarea-${uid}`);
const errorMessageId = computed(() => (isInvalid.value ? (props.errorId || `ec-textarea-error-${uid}`) : undefined));

const textareaModel = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

function focus() {
  textareaRef.value?.focus();
}
</script>

<style>
.ec-textarea {
  @apply tw-w-full;

  &__textarea {
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

  &__label-text {
    @apply tw-flex tw-flex-grow;
    @apply tw-input-label;
    @apply tw-mr-8;
  }

  &__tooltip {
    @apply tw-flex-shrink-0 tw-self-center;
    @apply tw-ml-4;
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
}
</style>
