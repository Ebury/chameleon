<template>
  <div
    class="ec-textarea"
    :class="$attrs.class"
    :style="$attrs.style"
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
        type="interactive"
        name="simple-info"
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
      v-bind="{ ...$attrs, class: null, style: null }"
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
      :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-textarea__textarea` : 'ec-textarea__textarea'"
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

<script setup>
import { computed, ref } from 'vue';

import useConfig from '../../composables/use-ec-config';
import VEcTooltip from '../../directives/ec-tooltip';
import { getUid } from '../../utils/uid';
import EcIcon from '../ec-icon';

const config = useConfig();

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: String,
  },
  rows: {
    type: Number,
    default: 4,
  },
  label: {
    default: '',
    type: String,
  },
  labelTooltip: {
    default: '',
    type: String,
  },
  note: {
    default: '',
    type: String,
  },
  bottomNote: {
    default: '',
    type: String,
  },
  errorMessage: {
    default: '',
    type: String,
  },
  id: {
    type: String,
  },
  errorId: {
    type: String,
  },
  isSensitive: {
    type: Boolean,
    default: false,
  },
  isWarning: {
    type: Boolean,
    default: false,
  },
  autocomplete: {
    type: String,
    default: null,
  },
});

defineExpose({
  focus,
});

const isInvalid = computed(() => !!props.errorMessage);

const textareaRef = ref(null);

const uid = getUid();
const textareaId = computed(() => props.id || `ec-textarea-${uid}`);
const errorMessageId = computed(() => (isInvalid.value ? (props.errorId || `ec-textarea-error-${uid}`) : null));

const textareaModel = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

function focus() {
  if (textareaRef.value) {
    textareaRef.value.focus();
  }
}
</script>

<script>
export default {
  inheritAttrs: false,
};
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
      /* :read-only is not supported by IE https://developer.mozilla.org/en-US/docs/Web/CSS/:read-only */
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
