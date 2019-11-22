<template>
  <div class="ec-toaster">
    <transition-group
      name="ec-toaster-items-transition"
      tag="ul"
      class="ec-toaster__list"
      @after-enter="rememberTopItemPositions"
      @before-leave="rememberTopItemPositions"
    >
      <li
        v-for="message of messages"
        :key="message.id"
        ref="items"
        v-ec-toaster-touch="{ minDistance: 50 }"
        class="ec-toaster__item"
        @ec-toaster-touch-remove="$emit('remove', message)"
      >
        <ec-alert
          :type="message.type"
          :title="message.title"
          :subtitle="message.subtitle"
          dismissable
          @change="$emit('remove', message)"
        />
      </li>
    </transition-group>
  </div>
</template>

<script>
import EcAlert from '../ec-alert';
import EcToasterTouchDirective from './ec-toaster-touch';

export default {
  name: 'Toaster',
  components: {
    EcAlert,
  },
  directives: { EcToasterTouch: EcToasterTouchDirective },
  props: {
    messages: { type: Array, default: () => [] },
  },
  methods: {
    rememberTopItemPositions: /* istanbul ignore next */ () => {
      if (this.$refs.items) {
        for (const item of this.$refs.items) {
          item.style.top = `${item.offsetTop}px`;
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/settings/z-index';

.ec-toaster {
  position: fixed;
  z-index: $z-index-notification;
  top: 0;
  right: 0;
  left: auto;
  pointer-events: none;
  max-width: 400px;
  width: 100%;

  &__list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;
    overflow: visible;
    padding: 24px;
    margin: 0;
    pointer-events: none;
  }

  &__item {
    display: inline-block;
    max-width: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    transition-property: opacity, transform;
    transition-duration: 1s;
    margin-bottom: 8px;
    pointer-events: auto;

    &--swipe-active {
      transition-duration: 0s;
    }

    &--removed-by-swipe {
      transition-duration: 0.3s;
    }
  }
}

.ec-toaster-items-transition-enter,
.ec-toaster-items-transition-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.ec-toaster-items-transition-leave-active {
  position: absolute;
}
</style>
