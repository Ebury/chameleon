<template>
  <div class="ec-input-field">
    <label
      v-if="label"
      class="ec-input-field__label"
      :for="id"
    >{{ label }}</label>
    <input
      :id="id"
      v-model="inputModel"
      class="ec-input-field__input"
      :class="{
        'ec-input-field__input--has-error': isInvalid,
      }"
      v-bind="$attrs"
      :type="type"
      :aria-describedby="errorId"
      v-on="$listeners"
    >
    <div
      :id="errorId"
      v-if="isInvalid"
      class="ec-input-field__error-text"
    >{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  name: 'EcInputField',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'value-change',
  },
  props: {
    type: {
      type: String,
      default: 'text',
      validator(value) {
        return ['text', 'date', 'number'].includes(value);
      },
    },
    value: {
      type: [Number, String, Date],
    },
    label: {
      default: '',
      type: String,
    },
    errorMessage: {
      default: '',
      type: String,
    },
  },
  computed: {
    id() {
      return `ec-input-field-${this._uid}`;
    },
    errorId() {
      return this.isInvalid ? `ec-input-field-error-${this._uid}` : null;
    },
    isInvalid() {
      return !!this.errorMessage;
    },
    inputModel: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('value-change', value);
      },
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/settings/index';
@import '../../scss/tools/index';

$ec-input-field-primary-color: $level-4-tech-blue !default;
$ec-input-field-border: $level-5-placeholders !default;
$ec-input-background-disabled: $level-7-backgrounds !default;

.ec-input-field {
  width: 100%;

  &__input {
    @include body-text;
    @include shape-border-radius;

    padding: 8px 12px;
    border: 1px solid $ec-input-field-border;
    width: inherit;

    &--has-error {
      border: 1px solid $color-error;

      &:hover,
      &:focus {
        border: 1px solid $color-error;
      }
    }

    &:focus {
      border: 1px solid $ec-input-field-primary-color;
      outline: none;
    }

    &:disabled {
      background: $ec-input-background-disabled;
    }
  }

  &__label {
    @include input-label;
  }

  &__error-text {
    @include flags-text;

    color: $color-error;
  }
}
</style>
