<template>
  <div class="ec-checkbox">
    <input
      :id="id"
      v-model="inputModel"
      :aria-describedby="errorId"
      type="checkbox"
      class="ec-checkbox__input"
      :disabled="disabled"
    >
    <label
      :for="id"
      class="ec-checkbox__label"
      :class="{
        'ec-checkbox__label--has-error': isInvalid || $slots['error-message'],
        'ec-checkbox__label--large': large
      }"
    >
      <span v-if="labelMessage || $slots['label-message']">
        {{ labelMessage }}
        <slot name="label-message" />
      </span>
    </label>

    <div
      :id="errorId"
      v-if="isInvalid || $slots['error-message']"
      class="ec-checkbox__error-text"
    >
      {{ errorMessage }}
      <slot name="error-message" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'EcCheckbox',
  model: {
    prop: 'checked',
    event: 'checked-value-change',
  },
  props: {
    checked: {
      type: Boolean,
    },
    labelMessage: {
      default: '',
      type: String,
    },
    errorMessage: {
      default: '',
      type: String,
    },
    large: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
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

<style lang="scss">
@import '../../scss/settings/index';
@import '../../scss/tools/index';

$ec-checkbox-white: $white !default;
$ec-checkbox-tech-blue: $level-4-tech-blue !default;
$ec-checkbox-level-4-interactive-elements: $level-4-interactive-elements !default;
$ec-checkbox-level-3-hover: $level-3-hover !default;
$ec-checkbox-border: $level-5-placeholders !default;
$ec-checkbox-color-error: $color-error !default;
$ec-checkbox-disabled-lines: $level-6-disabled-lines !default;

.ec-checkbox {
  &__input {
    @include ec-screen-reader-only;
  }

  &__label {
    @include input-text-bold;

    position: relative;
    padding-left: 24px;
    cursor: pointer;

    .ec-checkbox__input:disabled:hover ~ & {
      cursor: default;
    }

    &:before {
      background: $ec-checkbox-white;
      border: 2px solid $ec-checkbox-level-4-interactive-elements;
      width: 16px;
      height: 16px;
      left: 0;
      top: 0;
      cursor: pointer;

      @include checkbox-border-radius;

      .ec-checkbox__input:checked ~ & {
        background: $ec-checkbox-tech-blue;
        border: $ec-checkbox-tech-blue;
      }

      .ec-checkbox__input:disabled ~ &,
      .ec-checkbox__input:disabled:hover ~ & {
        cursor: default;
        border-color: $ec-checkbox-disabled-lines;
      }

      .ec-checkbox__input:disabled:checked ~ &,
      .ec-checkbox__input:disabled:checked:hover ~ & {
        background-color: $ec-checkbox-disabled-lines;
      }

      .ec-checkbox__input:hover:checked ~ &,
      .ec-checkbox__input:focus:checked ~ & {
        background-color: $ec-checkbox-level-3-hover;
      }
    }

    &:after {
      display: none;
      width: 5px;
      height: 10px;
      left: 6px;
      top: 2px;
      position: absolute;
      transform: rotate(45deg);
      border-style: solid;
      border-color: $white;
      border-width: 0 2px 2px 0;
      content: '';

      .ec-checkbox__input:checked ~ & {
        display: block;
      }
    }

    &:before,
    &:after {
      position: absolute;
      display: inline-block;
      content: '';
    }

    &:hover {
      &:before {
        border-color: $ec-checkbox-level-3-hover;
      }
    }

    &--large {
      padding: 4px 0 4px 32px;

      &:before {
        width: 24px;
        height: 24px;
      }

      &:after {
        width: 8px;
        height: 13px;
        top: 3px;
        left: 8px;
      }
    }

    &--has-error {
      &:before {
        border-color: $ec-checkbox-color-error;

        .ec-checkbox__input:hover ~ &,
        .ec-checkbox__input:focus ~ & {
          border-color: $ec-checkbox-color-error;
        }
      }
    }
  }

  &__error-text {
    @include flags-text;

    color: $ec-checkbox-color-error;
  }
}
</style>
