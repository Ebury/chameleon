<template>
  <div
    v-if="label"
    class="ec-radio-btn__label"
  >
    {{ label }}
  </div>
  <div
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
      :style="$attrs.style"
      :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-radio-btn ec-radio-btn-${radioIndex}` : `ec-radio-btn ec-radio-btn-${radioIndex}`"
      @click.prevent.stop="emit('update:modelValue', radio.value)"
    >
      <input
        v-bind="{
          ...$attrs,
          'aria-describedby': errorId,
          'data-test': `ec-radio-btn__input ec-radio-btn__input-${radioIndex}`,
          style: null,
          value: radio.value,
          class: 'ec-radio-btn__input',
          id: id,
          disabled: disabled,
          type: 'radio'
        }"
        v-model="inputModel"
        @focus="setFocus(radioIndex)"
        @blur="unsetFocus(radioIndex)"
      >

      <div
        class="ec-radio-btn__wrapper"
        :class="{
          'ec-radio-btn__wrapper--is-single-line': isTextInline,
        }"
      >
        <div
          class="ec-radio-btn__radio-icon-wrapper"
          :class="{
            'ec-radio-btn__radio-icon-wrapper--medium': iconSize === 'medium',
            'ec-radio-btn__radio-icon-wrapper--focused': inputIsFocused(radioIndex),
            'ec-radio-btn__radio-icon-wrapper--checked': inputIsChecked(radio.value) && !disabled,
            'ec-radio-btn__radio-icon-wrapper--checked-and-focused': inputIsChecked(radio.value) && inputIsFocused(radioIndex),
            'ec-radio-btn__radio-icon-wrapper--error': isInvalid && !inputIsChecked(radio.value),
            'ec-radio-btn__radio-icon-wrapper--disabled': disabled,
            'ec-radio-btn__radio-icon-wrapper--checked-and-disabled': disabled && inputIsChecked(radio.value),
          }"
        >
          <div
            class="ec-radio-btn__radio-icon-wrapper-inner"
            :class="{
              'ec-radio-btn__radio-icon-wrapper-inner--medium': iconSize === 'medium',
            }"
          >

            <ec-icon
              class="ec-radio-btn__radio-icon"
              :class="{
                'ec-radio-btn__radio-icon--checked': inputIsChecked(radio.value) && !disabled,
                'ec-radio-btn__radio-icon--checked-and-disabled': disabled && inputIsChecked(radio.value)
              }"
              name="rounded-notification"
              :size="pxlsIconSize"
            />
          </div>
        </div>

        <div
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
              'ec-radio-btn__radio-label--disabled': disabled,
            }"
            :title="isTextInline ? radio.label : null"
            :data-test="`ec-radio-btn__radio-label ec-radio-btn__radio-label-${radioIndex}`"
          >
            <slot name="label">{{ radio.label }}</slot>
          </label>

          <p
            v-if="radio.description"
            :for="id"
            class="ec-radio-btn__radio-description"
            :class="{
              'ec-radio-btn__radio-description--is-single-line': isTextInline,
              'ec-radio-btn__radio-description--disabled': disabled,
            }"
            :title="isTextInline ? radio.description : null"
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
    :class="{
      'tw-mr-32': iconSize === 'medium',
    }"
    data-test="ec-radio-btn__error-text"
  >
    <slot name="error-message">{{ errorMessage }}</slot>
  </div>
</template>

<script setup>
import {
  computed,
  onMounted,
  ref,
  useSlots,
} from 'vue';

import { getUid } from '../../utils/uid';
import EcIcon from '../ec-icon';

const props = defineProps(
  {
    radios: {
      default: () => [],
      type: Array,
    },
    modelValue: {
      default: '',
      type: String,
    },
    label: {
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
    isGroupInline: {
      default: false,
      type: Boolean,
    },
    isTextInline: {
      default: false,
      type: Boolean,
    },
    value: {
      default: '',
      type: String,
    },
    iconSize: {
      default: 'small',
      type: String,
    },
  },
);

const uid = getUid();
const slots = useSlots();

const id = `ec-radio-btn-${uid}`;
const isInvalid = computed(() => (!!props.errorMessage || !!slots['error-message']));
const errorId = computed(() => (isInvalid.value ? `ec-radio-btn-error-${uid}` : null));

const emit = defineEmits(['update:modelValue']);

const inputModel = computed(() => props.modelValue);

const radioButtons = ref([]);

function addFocusPropertyToRadios(radios) {
  if (radios?.length > 0) {
    radioButtons.value = radios.map(radio => ({
      ...radio,
      isFocused: false,
    }));
  }
}

function inputIsChecked(radioValue) {
  return inputModel.value === radioValue;
}

function inputIsFocused(radioIndex) {
  return radioButtons.value[radioIndex].isFocused;
}

function setFocus(radioIndex) {
  radioButtons.value[radioIndex].isFocused = true;
}

function unsetFocus(radioIndex) {
  radioButtons.value[radioIndex].isFocused = false;
}

onMounted(() => {
  addFocusPropertyToRadios(props.radios);
});

const pxlsIconSize = computed(() => {
  switch (props.iconSize) {
    case 'small':
      return 16;
    case 'medium':
      return 20;
    default:
      return 16;
  }
});
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

    &--is-single-line {
      @apply tw-items-center;
    }
  }

  &__radio-label {
    @apply tw-cursor-pointer;
    @apply tw-align-top;
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
    @apply tw-my-0;

    &--is-single-line {
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

    &--medium {
      width: 24px;
      height: 24px;
    }
  }

  &__radio-icon-wrapper-inner {
    @apply tw-rounded-1/2;
    @apply tw-bg-gray-8;
    @apply tw-absolute;

    width: 16px;
    height: 16px;

    &--medium {
      width: 20px;
      height: 20px;
    }
  }

  &__radio-icon {
    transform: translate(-50%, -50%);
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
    @apply tw-ml-28;
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
