<template>
  <div
    class="ec-radio-btn"
    :class="$attrs.class"
    :style="$attrs.style"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-radio-btn` : 'ec-radio-btn'"
  >
    <input
      v-bind="{
        ...$attrs,
        'aria-describedby': errorId,
        'data-test': 'ec-radio-btn__input',
        style: null,
        value: value,
        class: 'ec-radio-btn__input',
        id: id,
        disabled: disabled,
        type: 'radio'
      }"
      ref="radioBtnInput"
      v-model="inputModel"
      @focus="inputIsFocused = true"
      @blur="inputIsFocused = false"
    >

    <div
      :class="{
        'ec-radio-btn__wrapper': true,
        'ec-radio-btn__wrapper--is-single-line': isSingleLine,
      }"
    >
      <div
        class="ec-radio-btn__radio-icon-wrapper"
        :class="{
          'ec-radio-btn__radio-icon-wrapper--focused': inputIsFocused,
          'ec-radio-btn__radio-icon-wrapper--checked': inputModel,
          'ec-radio-btn__radio-icon-wrapper--checked-and-focused': inputModel && inputIsFocused,
          'ec-radio-btn__radio-icon-wrapper--indeterminate': indeterminate,
          'ec-radio-btn__radio-icon-wrapper--indeterminate-and-focused': indeterminate && inputIsFocused,
          'ec-radio-btn__radio-icon-wrapper--error': isInvalid && !inputModel,
          'ec-radio-btn__radio-icon-wrapper--disabled': disabled,
          'ec-radio-btn__radio-icon-wrapper--checked-and-disabled': disabled && inputModel,
          'ec-radio-btn__radio-icon-wrapper--indeterminate-and-disabled': disabled && indeterminate,
        }"
        @click="radioBtnInput.click()"
      >
        <div
          class="ec-radio-btn__radio-icon-wrapper-inner"
        >
          <div
            v-if="indeterminate"
            class="ec-radio-btn__indeterminate-icon"
          />

          <ec-icon
            v-else-if="inputModel"
            :class="{
              'ec-radio-btn__radio-icon--disabled': disabled,
            }"
            class="ec-radio-btn__radio-icon"
            name="rounded-notification"
            :size="16"
          />
        </div>
      </div>

      <div
        :class="{
          'ec-radio-btn__radio-text-wrapper': true,
          'ec-radio-btn__radio-text-wrapper--is-single-line': isSingleLine,
        }"
      >
        <label
          :for="id"
          :class="{
            'ec-radio-btn__label': true
          }"
          :title="isSingleLine ? label : null"
          data-test="ec-radio-btn__label"
        >
          <slot name="label">{{ label }}</slot>
        </label>

        <p
          :for="id"
          :class="{
            'ec-radio-btn__description': true,
            'ec-radio-btn__description--is-single-line': isSingleLine,
          }"
          :title="isSingleLine ? description : null"
          data-test="ec-radio-btn__description"
        >
          {{ description }}
        </p>
      </div>
    </div>

    <div
      :id="errorId"
      v-if="isInvalid"
      class="ec-radio-btn__error-text"
      data-test="ec-radio-btn__error-text"
    >
      <slot name="error-message">{{ errorMessage }}</slot>
    </div>

  </div>
</template>

<script setup>
import {
  computed,
  onMounted,
  ref,
  useSlots,
  watch,
} from 'vue';

import { getUid } from '../../utils/uid';
import EcIcon from '../ec-icon';

const props = defineProps(
  {
    modelValue: {
      default: '',
      type: String,
    },
    indeterminate: {
      default: false,
      type: Boolean,
    },
    label: {
      default: '',
      type: String,
    },
    description: {
      default: '',
      type: String,
    },
    errorMessage: {
      default: '',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    isSingleLine: {
      default: false,
      type: Boolean,
    },
    value: {
      default: '',
      type: String,
    },
  },
);

const uid = getUid();
const slots = useSlots();

const id = `ec-radio-btn-${uid}`;
const isInvalid = computed(() => (!!props.errorMessage || !!slots['error-message']));
const errorId = computed(() => (isInvalid.value ? `ec-radio-btn-error-${uid}` : null));

const inputIsFocused = ref(false);
const radioBtnInput = ref(null);

const emit = defineEmits(['update:modelValue']);

const inputModel = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

watch(() => props.indeterminate, (newValue) => {
  updateIndeterminate(newValue);
});

function updateIndeterminate(newValue) {
  if (radioBtnInput.value) {
    radioBtnInput.value.indeterminate = !!newValue;
  }
}

onMounted(() => {
  updateIndeterminate(props.indeterminate);
});
</script>

<style>
.ec-radio-btn {
  &__input {
    @apply tw-sr-only;
  }

  &__wrapper {
    @apply tw-flex tw-flex-nowrap;

    &--is-single-line {
      @apply tw-items-center;
    }
  }

  &__label {
    @apply tw-align-top;
    @apply tw-input-label;
    @apply tw-flex-grow;
    @apply tw-min-w-0;
  }

  &__description {
    @apply tw-small-text;
    @apply tw-my-0;

    &--is-single-line {
      @apply tw-ml-8;
    }
  }

  &__radio-text-wrapper {
    &--is-single-line {
      @apply tw-flex;
      @apply tw-flex-nowrap;
    }
  }

  &__radio-icon-wrapper {
    @apply tw-cursor-pointer;
    @apply tw-bg-gray-8;
    @apply tw-w-20 tw-h-20;
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

  &__radio-icon-wrapper-inner {
    @apply tw-rounded-1/2;
    @apply tw-cursor-pointer;
    @apply tw-bg-gray-8;
    @apply tw-absolute;

    width: 16px;
    height: 16px;
  }

  &__radio-icon {
    transform: translate(-50%, -50%);

    @apply tw-fill-key-4;
    @apply tw-absolute;
    @apply tw-left-1/2 tw-top-1/2;

    &--disabled {
      @apply tw-fill-gray-6;
    }
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
