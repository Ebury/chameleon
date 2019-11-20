<template>
  <div class="ec-toaster">
    <transition-group
      ref="list"
      name="list"
      tag="ul"
      class="ec-toaster__list"
      appear
      @after-enter="rememberTopItemPositions"
      @before-leave="rememberTopItemPositions"
    >
      <li
        v-for="message of messages"
        :key="message.id"
        ref="items"
        v-toaster-touch="{ minDistance: 50 }"
        class="ec-toaster__item"
        @toaster-touch-remove="$emit('remove', message)"
      >
        <ec-alert
          :type="message.type"
          :title="message.title"
          :subtitle="message.subtitle"
          :dismissable="message.dismissable"
          @change="$emit('remove', message)"
        />
      </li>
    </transition-group>
  </div>
</template>

<script>
import EcAlert from '../ec-alert';
import ToasterTouchDirective from '../../directives/ec-toaster-touch';

export default {
  name: 'Toaster',
  components: {
    EcAlert,
  },
  directives: { ToasterTouch: ToasterTouchDirective },
  props: {
    messages: { type: Array, default: () => [] },
  },
  methods: {
    rememberTopItemPositions() {
      if (this.$refs.items) {
        // eslint-disable-next-line no-restricted-syntax
        for (const item of this.$refs.items) {
          item.style.top = `${item.offsetTop}px`;
        }
      }
    },
  },
};
</script>

<style lang="scss">
.ec-toaster {
  position: fixed;
  z-index: 300;
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
    border: 1px solid tomato;
    overflow: visible;
    padding: 10px;
    margin: 0;
    pointer-events: none;
  }

  &__item {
    display: inline-block;
    max-width: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    // padding: 8px;
    // border: 1px solid #ccc;
    transition-property: opacity, transform;
    transition-duration: 1s;
    margin-bottom: 8px;
    pointer-events: auto;
    // background-color: #fff;

    &--swipe-active {
      transition-duration: 0s; // do not transition while swiping, let the element to follow the finger.
    }

    &--removed-by-swipe {
      transition-duration: 0.3s;
    }
  }
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.list-leave-active {
  position: absolute;
}
</style>
