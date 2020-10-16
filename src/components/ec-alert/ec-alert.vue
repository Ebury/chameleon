<template>
  <div
    v-show="open"
    class="ec-alert"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-alert` : 'ec-alert'"
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
      data-test="ec-alert__dismiss-icon"
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
        <div
          class="ec-alert__title"
          :class="`ec-alert__title--${type}`"
          data-test="ec-alert__title"
        >{{ title }}</div>
        <div
          v-if="subtitle"
          class="ec-alert__subtitle"
          :class="`ec-alert__subtitle--${type}`"
          data-test="ec-alert__subtitle"
        >{{ subtitle }}</div>
      </slot>
    </div>
    <button
      v-if="buttonText"
      class="ec-btn ec-btn--sm ec-btn--outline ec-btn--rounded ec-alert__button"
      :class="`ec-btn--${type === 'info' ? 'primary' : type}`"
      data-test="ec-alert__button"
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

<style>
@import '../../styles/tools/ec-alert.css';

.ec-alert {
  @apply tw-rounded;
  @apply tw-p-16;
  @apply tw-relative;
  @apply tw-fill-current;
  @apply tw-flex tw-flex-col tw-items-center;

  &--is-responsive {
    @media (min-width: 480px) {
      @mixin ec-alert-responsive;
    }
  }

  &__button {
    @apply tw-flex-shrink-0;
    @apply tw-mt-16;
  }

  &__content {
    @apply tw-flex-grow;
    @apply tw-text-center;
  }

  &__title {
    @apply tw-body-strong;

    &--success {
      @apply tw-text-success-hover;
    }

    &--warning {
      @apply tw-text-warning-hover;
    }

    &--info {
      @apply tw-text-info-hover;
    }

    &--error {
      @apply tw-text-error-hover;
    }
  }

  &__subtitle {
    @apply tw-body-text;

    &--success {
      @apply tw-text-success-hover;
    }

    &--warning {
      @apply tw-text-warning-hover;
    }

    &--info {
      @apply tw-text-info-hover;
    }

    &--error {
      @apply tw-text-error-hover;
    }
  }

  &__icon {
    @apply tw-w-40 tw-h-40;
    @apply tw-flex-shrink-0;
    @apply tw-mb-16;
  }

  &__dismiss-icon {
    @apply tw-rounded;
    @apply tw-absolute tw-top-8 tw-right-8;
    @apply tw-cursor-pointer;

    line-height: 0;

    &:focus {
      @apply tw-outline-none;
    }

    &:hover,
    &:focus {
      &--info {
        @apply tw-bg-info-hover;
      }

      &--warning {
        @apply tw-bg-warning-hover;
      }

      &--success {
        @apply tw-bg-success-hover;
      }

      &--error {
        @apply tw-bg-error-hover;
      }
    }

    &--info:focus,
    &--info:hover {
      @apply tw-fill-info;
    }

    &--info {
      @apply tw-fill-info-hover;
    }

    &--success:focus,
    &--success:hover {
      @apply tw-fill-success;
    }

    &--success {
      @apply tw-fill-success-hover;
    }

    &--warning:focus,
    &--warning:hover {
      @apply tw-fill-warning;
    }

    &--warning {
      @apply tw-fill-warning-hover;
    }

    &--error:focus,
    &--error:hover {
      @apply tw-fill-error;
    }

    &--error {
      @apply tw-fill-error-hover;
    }
  }

  &--info {
    @apply tw-bg-info-light;
    @apply tw-text-info-hover;
  }

  &--success {
    @apply tw-bg-success-light;
    @apply tw-text-success-hover;
  }

  &--warning {
    @apply tw-bg-warning-light;
    @apply tw-text-warning-hover;
  }

  &--error {
    @apply tw-bg-error-light;
    @apply tw-text-error-hover;
  }
}
</style>
