<template>
  <div
    v-show="open"
    class="ec-alert"
    :class="{
      [`ec-alert--${type}`]: type,
      'ec-alert--is-responsive': responsive
    }"
  >
    <a
      v-if="dismissable"
      href="#"
      class="ec-alert__dismiss-icon"
      :class="`ec-alert__dismiss-icon--${type}`"
      @click.stop.prevent="$emit('change', !open)"
    >
      <ec-icon
        name="simple-close"
        :size="16"
      />
    </a>
    <ec-icon
      class="ec-alert__icon"
      :class="{ 'ec-alert__icon--alert-has-subtitle': subtitle }"
      :name="icon"
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
      :class="`ec-btn--${type === 'info' ? 'primary' : type}-reverse`"
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
    responsive: {
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
  },
};
</script>

<style lang="scss">
@import '../../scss/settings/colors';
@import '../../scss/tools/borders';
@import '../../scss/tools/ec-alert';
@import '../../scss/tools/typography';

.ec-alert {
  @include shape-border-radius;

  padding: 16px;
  color: $white;
  fill: $white;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  &--is-responsive {
    @media (min-width: 480px) {
      @include ec-alert-responsive;
    }
  }

  &__button {
    flex-shrink: 0;
    margin-top: 16px;
  }

  &__content {
    flex-grow: 1;
    text-align: center;
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
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    margin-bottom: 16px;
  }

  &__dismiss-icon {
    @include shape-border-radius;

    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
    line-height: 0;
    fill: $white;

    &:focus {
      outline: 0;
      background: $white;
    }

    &:hover {
      background: $white;
    }

    &--info:focus,
    &--info:hover {
      fill: $color-info;
    }

    &--success:focus,
    &--success:hover {
      fill: $color-success;
    }

    &--warning:focus,
    &--warning:hover {
      fill: $color-warning;
    }

    &--error:focus,
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
