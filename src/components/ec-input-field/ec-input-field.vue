<template>
  <div
    class="ec-input-field"
    data-test="ec-input-field"
  >
    <label
      v-if="label || note"
      class="ec-input-field__label"
      data-test="ec-input-field__label"
      :for="id"
    >
      <span
        v-if="label"
        class="ec-input-field__label-text"
        data-test="ec-input-field__label-text"
      >{{ label }}</span>
      <span
        v-if="note"
        class="ec-input-field__note"
        data-test="ec-input-field__note"
      >{{ note }}</span>
    </label>
    <input
      :id="id"
      v-model="inputModel"
      class="ec-input-field__input"
      :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-input-field__input` : 'ec-input-field__input'"
      :class="{
        'ec-input-field__input--has-error': isInvalid,
        'ec-input-field__input--has-icon': !!icon,
      }"
      v-bind="$attrs"
      :type="type"
      :aria-describedby="errorId"
      v-on="$listeners"
    >
    <div
      v-if="icon"
      class="ec-input-field__icon-wrapper"
    >
      <ec-icon
        class="ec-input-field__icon"
        data-test="ec-input-field__icon"
        :name="icon"
        :size="iconSize"
      />
    </div>
    <div
      :id="errorId"
      v-if="isInvalid"
      class="ec-input-field__error-text"
      data-test="ec-input-field__error-text"
    >{{ errorMessage }}</div>
  </div>
</template>

<script>
import EcIcon from '../ec-icon';

export default {
  name: 'EcInputField',
  components: { EcIcon },
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
    note: {
      default: '',
      type: String,
    },
    errorMessage: {
      default: '',
      type: String,
    },
    icon: {
      type: String,
      default: '',
    },
    iconSize: {
      type: Number,
      default: 20,
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

$ec-input-field-text-color: $level-3-body-and-headings !default;
$ec-input-field-primary-color: $level-4-tech-blue !default;
$ec-input-field-border-color: $level-6-disabled-lines !default;
$ec-input-field-note-color: $level-5-placeholders !default;
$ec-input-field-background-disabled: $level-7-backgrounds !default;
$ec-input-field-icon-area-size: 42px !default;
$ec-input-field-icon-color: $ec-input-field-text-color !default;
$ec-input-field-invalid-color: $color-error !default;

.ec-input-field {
  width: 100%;
  position: relative;

  &__input {
    @include body-text;
    @include shape-border-radius;

    color: $ec-input-field-text-color;
    padding: 8px 12px;
    border: 1px solid $ec-input-field-border-color;
    width: inherit;
    max-width: 100%;

    &--has-error {
      border: 1px solid $ec-input-field-invalid-color;

      &:hover,
      &:focus {
        border: 1px solid $ec-input-field-invalid-color;
      }
    }

    &--has-icon {
      padding-right: $ec-input-field-icon-area-size;
    }

    &:focus {
      border: 1px solid $ec-input-field-primary-color;
      outline: none;
    }

    &:disabled {
      background: $ec-input-field-background-disabled;
    }

    &:read-only,
    &[readonly] {
      // :read-only is not supported by IE https://developer.mozilla.org/en-US/docs/Web/CSS/:read-only
      @include ellipsis;
    }
  }

  &__label {
    display: flex;
    flex-wrap: wrap;
  }

  &__label-text {
    @include input-label;

    flex-grow: 1;
    margin-right: 8px;
  }

  &__note {
    @include caption-text;
  }

  &__error-text {
    @include flags-text;

    color: $ec-input-field-invalid-color;
  }

  &__icon-wrapper {
    position: absolute;
    right: 0;
    display: inline-block;
    height: $ec-input-field-icon-area-size;
    width: $ec-input-field-icon-area-size;
    color: $ec-input-field-icon-color;
    fill: currentColor;
    line-height: $ec-input-field-icon-area-size;
    font-size: 0;
    text-align: center;
  }

  &__icon {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
