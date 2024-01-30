<template>
  <div
    v-show="open"
    class="ec-alert"
    v-bind="{
      ...$attrs,
      'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-alert` : 'ec-alert',
    }"
    :class="{
      [`ec-alert--${type}`]: type,
      'ec-alert--is-responsive': responsive,
    }"
  >
    <a
      v-if="dismissable"
      href="#"
      class="ec-alert__dismiss-icon"
      :class="`ec-alert__dismiss-icon--${type}`"
      data-test="ec-alert__dismiss-icon"
      @click.stop.prevent="onDismiss"
    >
      <ec-icon
        :name="IconName.SIMPLE_CLOSE"
        :size="16"
      />
    </a>
    <ec-icon
      class="ec-alert__icon"
      :class="{ 'ec-alert__icon--alert-has-subtitle': subtitle }"
      :name="icon"
    />
    <div class="ec-alert__body">
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
      <slot
        v-if="hasCtaSlot()"
        name="cta"
      />

      <button
        v-else-if="buttonText"
        type="button"
        class="ec-btn ec-btn--sm ec-btn--outline ec-btn--rounded ec-alert__button"
        :class="`ec-btn--${type === 'info' ? 'primary' : type}-reverse`"
        data-test="ec-alert__button"
        @click="emit(AlertEvent.ACTION)"
      >{{ buttonText }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';

import EcIcon from '../ec-icon';
import { IconName } from '../ec-icon/types';
import type { AlertEvents } from './types';
import { AlertEvent, AlertType } from './types';

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits<{
  'update:open': [value: AlertEvents[AlertEvent.UPDATE_OPEN]],
  'action': [],
  'change': [value: AlertEvents[AlertEvent.CHANGE]],
}>();

interface AlertProps {
  type: AlertType,
  title: string,
  subtitle?: string,
  dismissable?: boolean,
  buttonText?: string,
  open?: boolean,
  responsive?: boolean
}

const props = withDefaults(defineProps<AlertProps>(), {
  open: true,
  responsive: true,
});

const slots = useSlots();

const icon = computed(() => {
  switch (props.type) {
    case AlertType.ERROR:
    case AlertType.WARNING:
      return IconName.SIMPLE_ERROR;
    case AlertType.SUCCESS:
      return IconName.SIMPLE_CHECK;
    case AlertType.INFO:
    default:
      return IconName.SIMPLE_INFO;
  }
});

function hasCtaSlot() {
  return !!slots.cta;
}

function onDismiss() {
  const newValue = !props.open;
  emit(AlertEvent.UPDATE_OPEN, newValue);
  emit(AlertEvent.CHANGE, newValue);
}
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
    @mixin ec-alert-responsive;
  }

  &__button {
    @apply tw-flex-shrink-0;
    @apply tw-mt-16;
  }

  &__content {
    @apply tw-flex-grow;
    @apply tw-text-center;
    @apply tw-self-center;
  }

  &__title {
    @apply tw-body-strong;
  }

  &__subtitle {
    @apply tw-body-text;
  }

  &__title,
  &__subtitle {
    &--success {
      @apply tw-text-success-dark;
    }

    &--warning {
      @apply tw-text-warning-dark;
    }

    &--info {
      @apply tw-text-info-dark;
    }

    &--error {
      @apply tw-text-error-dark;
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
    @apply tw-leading-reset;

    &:focus {
      @apply tw-outline-none;
    }

    &--info {
      @apply tw-fill-info-dark;

      &:focus,
      &:hover {
        @apply tw-fill-info;
      }
    }

    &--success {
      @apply tw-fill-success-dark;

      &:focus,
      &:hover {
        @apply tw-fill-success;
      }
    }

    &--warning {
      @apply tw-fill-warning-dark;

      &:focus,
      &:hover {
        @apply tw-fill-warning;
      }
    }

    &--error {
      @apply tw-fill-error-dark;

      &:focus,
      &:hover {
        @apply tw-fill-error;
      }
    }
  }

  &--info {
    @apply tw-bg-info-light;
    @apply tw-text-info-dark;
  }

  &--success {
    @apply tw-bg-success-light;
    @apply tw-text-success-dark;
  }

  &--warning {
    @apply tw-bg-warning-light;
    @apply tw-text-warning-dark;
  }

  &--error {
    @apply tw-bg-error-light;
    @apply tw-text-error-dark;
  }
}
</style>
