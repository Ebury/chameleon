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

<style lang="scss">
@import '../../scss/settings/colors/index';

.ec-loading {
  position: relative;

  &__backdrop {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &--is-transparent {
      background: rgba($white, 0.5);
    }
  }

  &__content {
    visibility: hidden;

    &--is-transparent {
      visibility: visible;
    }
  }

  &__icon {
    animation: 1s linear infinite both ec-loading__animation;
    fill: $level-4-tech-blue;
  }
}

@keyframes ec-loading__animation {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
