<template>
  <div
    v-if="submenu && submenu.length > 0"
    class="ec-submenu"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-submenu` : 'ec-submenu'"
  >
    <div class="ec-submenu__header-container">
      <ul
        :class="{
          'ec-submenu__header': true,
          'ec-submenu__header--no-gap': !hasHeaderGap,
        }"
      >
        <li
          v-for="(menuItem, index) in submenu"
          :key="index"
          data-test="ec-submenu__header-item"
          :class="{
            'ec-submenu__header-item': true,
            'ec-submenu__header-item--is-full-width': isFullWidth,
            'ec-submenu__header-item--is-active': index === activeIndex,
          }"
        >
          <a
            v-if="!menuItem.route"
            href="#"
            class="ec-submenu__header-title"
            :data-test="`ec-submenu__header-title-${index}`"
            @click.prevent.stop="select(index)"
          >{{ menuItem.headerTitle }}</a>

          <router-link
            v-else
            :to="menuItem.route"
            class="ec-submenu__header-title"
            :data-test="`ec-submenu__header-title-${index}`"
            @click="select(index)"
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

<script setup>
defineProps({
  submenu: {
    type: Array,
    required: true,
  },
  activeIndex: {
    type: Number,
    default: 0,
  },
  isFullWidth: {
    type: Boolean,
    default: false,
  },
  hasHeaderGap: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:activeIndex', 'change']);

function select(index) {
  emit('update:activeIndex', index);
  emit('change', index);
}
</script>

<style>
@import '../../styles/tools/transitions.css';

.ec-submenu {
  @apply tw-relative;

  &__header {
    @apply tw-min-w-104;
    @apply tw-mb-12;
    @apply tw-flex tw-flex-col;
    @apply tw-whitespace-nowrap;

    @screen lg {
      @apply tw-flex-row;
      @apply tw-border-b tw-border-solid tw-text-gray-6;
    }

    &--no-gap {
      @apply tw-mb-0;
    }
  }

  &__header-item {
    @apply tw--bottom-1;
    @apply tw-cursor-pointer;
    @apply tw-inline-block;
    @apply tw-relative;
    @apply tw-text-center;
    @apply tw-border-b tw-border-solid tw-border-transparent;

    &--is-full-width {
      @apply tw-w-full;
    }
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
    @apply tw-border-key-4;
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
