<template>
  <div class="ec-loading">
    <div
      v-if="show"
      class="ec-loading__backdrop"
      :class="{ 'ec-loading__backdrop--is-transparent': isTransparent }"
    >
      <ec-icon
        name="simple-loading"
        :size="size"
        class="ec-loading__icon"
      />
    </div>
    <div
      class="ec-loading__content"
      :class="{ 'ec-loading__content--is-transparent': isTransparent }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import EcIcon from '../ec-icon';

export default {
  name: 'EcLoading',
  components: {
    EcIcon,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    size: {
      type: Number,
      default: 48,
    },
    transparent: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isTransparent() {
      return this.transparent || !this.show;
    },
  },
};
</script>

<style>
.ec-loading {
  @apply tw-relative;

  &__backdrop {
    @apply tw-absolute;
    @apply tw-h-full tw-w-full;
    @apply tw-flex;
    @apply tw-justify-center;
    @apply tw-items-center;
    @apply tw-z-loading;

    &--is-transparent {
      background: hsla(var(--ec-light-color), 0.5);
    }
  }

  &__content {
    @apply tw-invisible;

    &--is-transparent {
      @apply tw-visible;
    }
  }

  &__icon {
    @apply tw-fill-key-4;

    animation: 1s linear infinite both ec-loading__animation;
  }
}

@keyframes ec-loading__animation {
  0% {
    @apply tw-rotate-0;
  }

  100% {
    @apply tw-rotate-360;
  }
}
</style>
