<template>
  <div class="ec-checkbox">
    <input
      :id="id"
      ref="checkboxInput"
      v-model="inputModel"
      :aria-describedby="errorId"
      type="checkbox"
      class="ec-checkbox__input"
      :disabled="disabled"
      v-bind="$attrs"
      @focus="inputIsFocused = true"
      @blur="inputIsFocused = false"
      v-on="$listeners"
    >

    <div class="ec-checkbox__label-checkbox-wrapper ">
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
        class="ec-checkbox__label"
      >
        <slot name="label">{{ label }}</slot>
      </label>
    </div>

    <div
      :id="errorId"
      v-if="isInvalid"
      class="ec-checkbox__error-text"
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

<style lang="scss">
@import '../../scss/settings/index';
@import '../../scss/tools/index';

$ec-checkbox-default-border-color: $level-4-interactive-elements !default;
$ec-checkbox-default-background-color: $white !default;
$ec-checkbox-checked-background-color: $level-4-tech-blue !default;
$ec-checkbox-checked-background-hover-color: $level-3-hover !default;
$ec-checkbox-error-color: $color-error !default;
$ec-checkbox-disabled-color: $level-6-disabled-lines !default;

.ec-checkbox {
  &__input {
    @include ec-screen-reader-only;
  }

  &__label-checkbox-wrapper {
    display: flex;
    flex-wrap: nowrap;
  }

  &__label {
    @include input-label;

    flex-grow: 1;
    min-width: 0;
  }

  &__check-icon-wrapper {
    cursor: pointer;
    background: $ec-checkbox-default-background-color;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    border: 2px solid $ec-checkbox-default-border-color;
    position: relative;
    margin-right: 8px;

    @include checkbox-border-radius;

    &--focused,
    &:hover {
      border-color: $ec-checkbox-checked-background-hover-color;
    }

    &--checked {
      border-color: $ec-checkbox-checked-background-color;
      background-color: $ec-checkbox-checked-background-color;

      &:hover {
        background-color: $ec-checkbox-checked-background-hover-color;
      }
    }

    &--checked-and-focused {
      border-color: $ec-checkbox-checked-background-hover-color;
      background-color: $ec-checkbox-checked-background-hover-color;
    }

    &--disabled {
      border-color: $ec-checkbox-disabled-color;
      cursor: default;

      &:hover,
      &:focus {
        border-color: $ec-checkbox-disabled-color;
      }
    }

    &--checked-and-disabled {
      background: $ec-checkbox-disabled-color;

      &:hover,
      &:focus {
        background: $ec-checkbox-disabled-color;
      }
    }

    &--error {
      border-color: $ec-checkbox-error-color;
    }
  }

  &__check-icon {
    fill: $ec-checkbox-default-background-color;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &__error-text {
    @include flags-text;

    color: $ec-checkbox-error-color;
  }
}

</style>
