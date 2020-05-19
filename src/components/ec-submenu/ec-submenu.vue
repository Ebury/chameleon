<template>
  <div
    v-if="submenu && submenu.length > 0"
    class="ec-submenu"
  >
    <div class="ec-submenu__header-container">
      <ul class="ec-submenu__header">
        <li
          v-for="(menuItem, index) in submenu"
          :key="index"
          :data-test="'ec-submenu__header-item-' + index"
          class="ec-submenu__header-item"
          :class="{'ec-submenu__header-item--is-active': index === activeIndex}"
          @click="$emit('change', index)"
        >
          <a
            v-if="!menuItem.route"
            class="ec-submenu__header-title"
          >{{ menuItem.headerTitle }}</a>

          <router-link
            v-if="menuItem.route"
            :to="menuItem.route"
            class="ec-submenu__header-title"
          >{{ menuItem.headerTitle }}</router-link>
        </li>
      </ul>
    </div>

    <main class="ec-submenu__main">
      <transition-group
        name="ec-submenu__fade"
        tag="div"
      >
        <div
          v-for="(menuItem, index) in submenu"
          :key="menuItem.headerTitle"
          v-show="index === activeIndex"
          :data-test="'ec-submenu__panel-' + index"
        >
          <slot :name="menuItem.slotName" />
        </div>
      </transition-group>
    </main>
  </div>
</template>

<script>
export default {
  name: 'EcSubmenu',
  model: {
    prop: 'activeIndex',
    event: 'change',
  },
  props: {
    submenu: {
      type: Array,
      required: true,
    },
    activeIndex: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style>
@import '../../styles/tools/transitions.css';

.ec-submenu {
  @apply tw-relative;

  &__header {
    min-width: 100px;

    @apply tw-mb-12;
    @apply tw-flex tw-flex-col;
    @apply tw-whitespace-no-wrap;

    @screen lg {
      @apply tw-flex-row;
      @apply tw-border-b tw-border-solid tw-text-gray-6;
    }
  }

  &__header-item {
    @apply tw--bottom-1;
    @apply tw-cursor-pointer;
    @apply tw-inline-block;
    @apply tw-relative;
    @apply tw-text-center;
  }

  &__header-title {
    @apply tw-no-underline tw-outline-none;
    @apply tw-text-gray-3;
    @apply tw-pt-8 tw-px-16 tw-pb-4;
    @apply tw-inline-block;

    @mixin ec-text-color-transition;

    &:focus {
      @apply tw-outline-none;
      @apply tw-text-key-4;
    }

    &:hover {
      @apply tw-no-underline;
      @apply tw-text-key-4;
    }
  }

  &__header-item--is-active {
    @apply tw-border-b tw-border-solid tw-border-key-4;
    @apply tw-cursor-auto;

    .ec-submenu__header-title {
      @apply tw-text-key-4;
    }
  }

  &__main {
    @apply tw-relative;
  }

  &__fade-enter,
  &__fade-leave-to {
    @apply tw-opacity-0;
  }

  &__fade-enter-to {
    @apply tw-transition-opacity tw-duration-300 tw-ease-out;
    @apply tw-opacity-100;
  }

  &__fade-leave,
  &__fade-leave-active,
  &__fade-leave-to {
    @apply tw-absolute;
    @apply tw-top-0;
  }

  &__fade-leave {
    @apply tw-opacity-100;
  }
}
</style>
