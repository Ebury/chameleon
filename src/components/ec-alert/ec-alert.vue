<template>
  <div
    v-show="open"
    class="ec-alert"
    :class="typeClass"
  >
    <ec-icon
      v-if="dismissable"
      class="ec-alert__dismiss-icon"
      :class="`ec-alert__dismiss-icon--${type}`"
      name="simple-close"
      :size="16"
      @click="$emit('change', !open)"
    />
    <ec-icon
      class="ec-alert__icon"
      :class="{ 'ec-alert__icon--alert-has-subtitle': subtitle }"
      :name="icon"
      :size="24"
    />
    <div class="ec-alert__content">
      <slot v-bind="{ title, subtitle }">
        <div class="ec-alert__title">{{ title }}</div>
        <div
          v-if="subtitle"
          class="ec-alert__subtitle"
        >{{ subtitle }}</div>
      </slot>
    </div>
    <button
      v-if="buttonText"
      class="ec-btn ec-btn--sm ec-btn--outline ec-btn--rounded ec-alert__button"
      :class="typeClass"
      @click="$emit('action')"
    >{{ buttonText }}</button>
  </div>
</template>

<script>
import EcIcon from '../ec-icon';

export default {
  name: 'EcAlert',
  components: {
    EcIcon,
  },
  model: {
    prop: 'open',
    event: 'change',
  },
  props: {
    type: {
      type: String,
      validator(value) {
        return ['error', 'info', 'success', 'warning'].includes(value);
      },
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    dismissable: {
      type: Boolean,
      default: false,
    },
    buttonText: {
      type: String,
    },
    open: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    icon() {
      switch (this.type) {
        case 'error':
        case 'warning':
          return 'simple-error';
        case 'success':
          return 'simple-check';
        case 'info':
        default:
          return 'simple-info';
      }
    },
    typeClass() {
      return `ec-alert--${this.type}`;
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/settings/colors';
@import '../../scss/tools/borders';
@import '../../scss/tools/typography';

.ec-alert {
  @include shape-border-radius;

  padding: 16px 24px;
  color: $white;
  fill: $white;
  position: relative;
  display: flex;
  align-items: center;

  &__content {
    flex-grow: 1;
  }

  &__button {
    vertical-align: middle;
    align-items: center;
    display: inline-flex;
    margin-right: 24px;
  }

  &__title {
    @include body-strong;

    color: $white;
  }

  &__subtitle {
    @include body-text;

    color: $white;
  }

  &__icon {
    margin: 4px 16px 4px 0;

    &--alert-has-subtitle {
      align-self: flex-start;
    }
  }

  &__dismiss-icon {
    @include shape-border-radius;

    position: absolute;
    top: 8px;
    right: 8px;

    &:hover {
      background: $white;
    }

    &--info:hover {
      fill: $color-info;
    }

    &--success:hover {
      fill: $color-success;
    }

    &--warning:hover {
      fill: $color-warning;
    }

    &--error:hover {
      fill: $color-error;
    }
  }

  &--info {
    background: $color-info;
  }

  &--success {
    background: $color-success;
  }

  &--warning {
    background: $color-warning;
  }

  &--error {
    background: $color-error;
  }
}
</style>
