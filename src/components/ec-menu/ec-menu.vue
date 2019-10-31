<template>
  <ul
    v-if="hasLinks"
    class="ec-menu"
    :class="{'ec-menu--horizontal': horizontal }"
  >
    <li
      v-for="(link, index) of validLinks"
      :key="index"
      class="ec-menu__item"
    >
      <ec-navigation-link
        class="ec-menu__link"
        v-bind="link"
        :is-collapsed="isCollapsed"
        :is-compact="horizontal"
        v-on="link.on"
      />
    </li>
  </ul>
</template>

<script>
import EcNavigationLink from '../ec-navigation-link';

export default {
  name: 'EcMenu',
  components: { EcNavigationLink },
  props: {
    horizontal: {
      type: Boolean,
    },
    isCollapsed: {
      type: Boolean,
      default: false,
    },
    links: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    hasLinks() {
      return Boolean(this.links && this.links.length);
    },
    validLinks() {
      return this.links.filter(link => Boolean(link && link.url));
    },
  },
};
</script>

<style lang="scss">
.ec-menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;

  &--horizontal {
    justify-content: center;
  }

  &__item {
    flex-basis: 100%;
    display: block;

    .ec-menu--horizontal & {
      display: inline-block;
      flex-basis: 0%;

      // stylelint-disable-next-line selector-max-class
      + .ec-menu__item {
        margin-left: 16px;
      }
    }
  }
}
</style>
