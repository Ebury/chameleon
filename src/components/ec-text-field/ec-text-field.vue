<template>
  <div class="ec-text-field">
    <div
      v-if="label"
      class="ec-text-field__label"
    >{{ label }}</div>
    <input
      class="ec-text-field__input"
      :class="{
        'ec-text-field__input--error': state === 'error',
      }"
      :type="type"
      :value="value"
      @input="(e) => $emit('change', e.target.value)"
    >
    <div
      v-if="state === 'error'"
      class="ec-text-field__error-label"
    >{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  name: 'EcTextField',
  model: {
    prop: 'value',
    event: 'change',
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
      default: '',
    },
    label: {
      default: '',
      type: String,
    },
    errorMessage: {
      default: '',
      type: String,
    },
    state: {
      validator(value) {
        return ['error', ''].includes(value);
      },
      default: '',
      type: String,
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/settings/index';
@import '../../scss/tools/index';

$ec-primay-color: $level-4-tech-blue !default;
$ec-border: $level-5-placeholders !default;

.ec-text-field {
  width: 100%;

  &__input {
    @include body-text;

    padding: 8px 12px;
    border: 1px solid $ec-border;
    border-radius: 5px;
    width: inherit;

    &--error {
      border: 1px solid $color-error-hover;

      &:hover {
        border: 1px solid $color-error-hover;
      }
    }

    &:focus {
      border: 1px solid $ec-primay-color;
      outline: none;
    }
  }

  &__label {
    @include caption-text;

    font-weight: bold;
  }

  &__error-label {
    @include flags;

    color: $color-error-hover;
    font-size: 12px;
  }
}
</style>
