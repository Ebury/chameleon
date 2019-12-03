<template>
  <div
    ref="submenu"
    v-if="submenu"
    class="ec-submenu"
    :class="{'ec-submenu--tabs': type === 'tabs'}"
  >
    <div
      ref="header"
      class="ec-submenu__header-container"
    >
      <ul
        class="ec-submenu__header"
        size="24"
      >
        <li
          v-for="(menuItem, index) in submenu"
          :key="menuItem.index"
          class="ec-submenu__header-item"
          :class="{'ec-submenu__header-item--active': index === activeIndex}"
          @click="$emit('change', index)"
        >
          <a
            v-if="menuItem.href"
            :href="menuItem.href"
            class="ec-submenu__header-title"
            @click.prevent
          >
            {{ menuItem.headerTitle }} + {{ menuItem.additionalText }}
          </a>

          <router-link
            v-if="menuItem.route"
            :to="menuItem.route"
            class="ec-submenu__header-title"
            @click.prevent
          >
            {{ menuItem.headerTitle }} + {{ menuItem.additionalText }}
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
          v-for="(menuItem, index ) in submenu"
          :key="index"
          v-show=" index === activeIndex"
          :class="{isActive: index === activeIndex}"
          class="fade-item"
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
    type: {
      type: String,
      default: 'submenu',
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
$ec-submenu-white: $white !default;

.ec-submenu {
  position: relative;
  z-index: 0;

  &__header {
    min-width: 100px;
    border-bottom: 1px solid $ec-submenu-disabled;
    margin-bottom: 12px;
    white-space: nowrap;
    display: flex;
    flex-direction: column;

    @include media__from-1024 {
      flex-direction: row;
    }
  }

  &__header-item {
    bottom: -1px;
    cursor: pointer;
    display: inline-block;
    padding: 8px 16px 4px 16px;
    position: relative;
    text-align: center;

    .ec-submenu--tabs & {
      padding-bottom: 8px;
    }
  }

  &__header-title {
    text-decoration: none;
    outline: none;
    color: $ec-submenu-body;
    transition: color 0.3s ease-out;

    &:focus {
      outline-width: 0;
    }

    &:hover {
      text-decoration: none;
      color: $ec-submenu-hover;
    }
  }

  &__header-item--active {
    border-bottom-width: 1px;
    border-style: solid;
    border-color: $ec-submenu-hover;
    cursor: auto;

    a {
      color: $ec-submenu-hover;
    }

    .ec-submenu--tabs & {
      border-top-width: 1px;
      border-left-width: 1px;
      border-right-width: 1px;
      border-color: $ec-submenu-disabled;
      border-radius: 5px;

      @include media__from-1024 {
        border-color: $ec-submenu-disabled $ec-submenu-disabled  $ec-submenu-white $ec-submenu-disabled;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
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
    transition: opacity 0.3s ease-out;
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
