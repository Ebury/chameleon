<template>
  <div
    ref="submenu"
    class="ec-submenu"
    :class="{'ec-submenu--tabs': type === 'tabs'}"
  >
    <ec-icon
      v-if="headerOverflows"
      class="ec-submenu__arrow-left"
      name="simple-chevron-left"
      :size="24"
      @click="moveLeft"
    />
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
          :class="{'ec-submenu__header-item-active': menuItem.isActive}"
          @click="makeActive(index)"
        >
          <slot :name="menuItem.headerSlotName" />
        </li>
      </ul>
    </div>

    <ec-icon
      v-if="headerOverflows"
      class="ec-submenu__arrow-right"
      name="simple-chevron-right"
      :size="24"
      @click="moveRight"
    />

    <main class="ec-submenu__main">
      <div
        v-for="menuItem in submenu"
        :key="menuItem.id"
        v-show="menuItem.isActive"
        :class="{isActive: menuItem.isActive}"
      >
        <slot
          :name="menuItem.mainSlotName"
        />
      </div>
    </main>
  </div>
</template>

<script>
import EcIcon from '@/components/ec-icon';

export default {
  name: 'EcSubmenu',
  components: { EcIcon },
  props: {
    submenu: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      default: 'submenu',
    },
  },
  data() {
    return {
      windowWidth: 0,
      headerWidth: 0,
      headerOverflows: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.getWindowWidth);
      window.addEventListener('load', this.getWindowWidth);
      window.addEventListener('resize', this.headerIsOverflowing);
      window.addEventListener('load', this.headerIsOverflowing);
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
    window.removeEventListener('load', this.getWindowWidth);
    window.removeEventListener('resize', this.headerIsOverflowing);
    window.removeEventListener('load', this.headerIsOverflowing);
  },
  methods: {
    makeActive(index) {
      for (const menuItem of this.submenu) {
        menuItem.isActive = false;
      }
      this.submenu[index].isActive = true;
    },
    getWindowWidth() {
      this.windowWidth = this.$refs.submenu.clientWidth;
      console.log(`to window width einai${this.windowWidth}`);
    },
    headerIsOverflowing() {
      this.headerWidth = this.$refs.header.scrollWidth;
      console.log(`to header width einai${this.headerWidth}`);
      if (this.headerWidth > this.windowWidth) {
        this.headerOverflows = true;
      } else {
        this.headerOverflows = false;
      }
    },
    moveRight() {
      this.$refs.header.scrollBy(100, 0);
    },
    moveLeft() {
      this.$refs.header.scrollBy(-100, 0);
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

  &__arrow-left,
  &__arrow-right {
    background: $white;
    top: 8px;
    position: absolute;
    z-index: 1;
  }

  &__arrow-left {
    left: 0;
  }

  &__arrow-right {
    right: 0;
  }

  &__header {
    min-width: 100px;
    border-bottom: 1px solid $ec-submenu-disabled;
    margin-bottom: 12px;
    white-space: nowrap;

    &-container {
      overflow-x: auto;
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

    a {
      text-decoration: none;
      color: $ec-submenu-body;
      transition: color 0.3s ease-out;

      &:hover {
        color: $ec-submenu-hover;
      }
    }
  }

  &__header-item-active {
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
      border-color: $ec-submenu-disabled $ec-submenu-disabled  $ec-submenu-white $ec-submenu-disabled;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
  }

  // &__fade {
  //   @include fade-transition;
  // }
}
</style>
