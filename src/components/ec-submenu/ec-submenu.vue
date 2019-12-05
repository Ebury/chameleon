<template>
  <div
    v-if="submenu && submenu.length > 0"
    class="ec-submenu"
  >
    <div
      class="ec-submenu__header-container"
    >
      <ul
        class="ec-submenu__header"
      >
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
          >
            {{ menuItem.headerTitle }}
          </a>

          <router-link
            v-if="menuItem.route"
            :to="menuItem.route"
            class="ec-submenu__header-title"
          >
            {{ menuItem.headerTitle }}
          </router-link>
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
          :key="index"
          v-show="index === activeIndex"
          :data-test="'ec-submenu__panel-' + index"
        >
          <slot
            :name="menuItem.slotName"
          />
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

<style lang="scss">
@import '../../scss/settings/index';
@import '../../scss/tools/index';

$ec-submenu-body: $level-3-body-and-headings !default;
$ec-submenu-hover: $level-4-tech-blue !default;
$ec-submenu-disabled: $level-6-disabled-lines !default;

.ec-submenu {
  position: relative;

  &__header {
    min-width: 100px;
    margin-bottom: 12px;
    white-space: nowrap;
    display: flex;
    flex-direction: column;

    @include media__from-1024 {
      flex-direction: row;
      border-bottom: 1px solid $ec-submenu-disabled;
    }
  }

  &__header-item {
    bottom: -1px;
    cursor: pointer;
    display: inline-block;
    padding: 8px 16px 4px 16px;
    position: relative;
    text-align: center;
  }

  &__header-title {
    text-decoration: none;
    outline: none;
    color: $ec-submenu-body;

    @include transition-ease-out(color);

    &:focus {
      outline-width: 0;
      color: $ec-submenu-hover;
    }

    &:hover {
      text-decoration: none;
      color: $ec-submenu-hover;
    }
  }

  &__header-item--is-active {
    border-bottom-width: 1px;
    border-style: solid;
    border-color: $ec-submenu-hover;
    cursor: auto;

    .ec-submenu__header-title {
      color: $ec-submenu-hover;
    }
  }

  &__main {
    position: relative;
  }

  &__fade-enter,
  &__fade-leave-to {
    opacity: 0;
  }

  &__fade-enter-to {
    @include transition-ease-out(opacity);

    opacity: 1;
  }

  &__fade-leave,
  &__fade-leave-active,
  &__fade-leave-to {
    position: absolute;
    top: 0;
  }

  &__fade-leave {
    opacity: 1;
  }
}
</style>
