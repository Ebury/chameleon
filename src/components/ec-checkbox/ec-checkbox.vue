<template>
  <div
    class="ec-checkbox"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-checkbox` : 'ec-checkbox'"
  >
    <input
      :id="id"
      ref="checkboxInput"
      v-model="inputModel"
      :aria-describedby="errorId"
      type="checkbox"
      class="ec-checkbox__input"
      :disabled="disabled"
      v-bind="$attrs"
      data-test="ec-checkbox__input"
      @focus="inputIsFocused = true"
      @blur="inputIsFocused = false"
      v-on="$listeners"
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
          'ec-checkbox__check-icon-wrapper--error': isInvalid && !inputModel,
          'ec-checkbox__check-icon-wrapper--disabled': disabled,
          'ec-checkbox__check-icon-wrapper--checked-and-disabled': disabled && inputModel,
        }"
        @click="$refs.checkboxInput.click()"
      >
        <ec-icon
          v-if="inputModel"
          class="ec-checkbox__check-icon"
          name="simple-check"
          :size="16"
        />
      </span>

      <label
        :for="id"
        :class="{
          'ec-checkbox__label': true,
          'ec-checkbox__label--is-single-line': isSingleLine,
        }"
        :title="isSingleLine ? label : null"
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

<script>
import EcIcon from '../ec-icon';

export default {
  name: 'EcCheckbox',
  components: {
    EcIcon,
  },
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'checked-value-change',
  },
  props: {
    checked: {
      type: Boolean,
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
    isSingleLine: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      inputIsFocused: false,
    };
  },
  computed: {
    id() {
      return `ec-checkbox-${this._uid}`;
    },
    errorId() {
      return this.isInvalid ? `ec-checkbox-error-${this._uid}` : null;
    },
    isInvalid() {
      return !!this.errorMessage || !!this.$slots['error-message'];
    },
    inputModel: {
      get() {
        return this.checked;
      },
      set(checked) {
        this.$emit('checked-value-change', checked);
      },
    },
  },
};
</script>

<style>
.ec-checkbox {
  &__input {
    @apply tw-sr-only;
  }

  &__label-checkbox-wrapper {
    @apply tw-flex tw-flex-no-wrap;

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
    @apply tw-relative;
    @apply tw-mr-8;
    @apply tw-rounded-sm;

    &--focused,
    &:hover {
      @apply tw-border-key-3;
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

  &__check-icon {
    transform: translate(-50%, -50%);

    @apply tw-fill-gray-8;
    @apply tw-absolute;
    @apply tw-left-1/2 tw-top-1/2;
  }

  &__error-text {
    @apply tw-help-text tw-text-error;
    @apply tw-mt-4;
  }
}
</style>
