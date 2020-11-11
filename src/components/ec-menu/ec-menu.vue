<template>
  <ul
    v-if="hasLinks"
    class="ec-menu"
    data-test="ec-menu"
    :class="{'ec-menu--horizontal': horizontal }"
  >
    <li
      v-for="(link, index) of validLinks"
      :key="index"
      class="ec-menu__item"
      data-test="ec-menu__item"
    >
      <ec-navigation-link
        class="ec-menu__link"
        :data-test="getLinkDataTest(link)"
        v-bind="{ ...link, on: null }"
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
  methods: {
    getLinkDataTest(link) {
      return `ec-menu__link ${link.dataTest || ''}`.trim();
    },
  },
};
</script>

<style>
.ec-menu {
  @apply tw-list-none;
  @apply tw-p-0;
  @apply tw-m-0;
  @apply tw-flex tw-flex-col tw-flex-wrap;
  @apply tw-items-start tw-justify-start;

  &--horizontal {
    @apply tw-flex-row;
    @apply tw-items-center tw-justify-center;
  }

  &__item {
    @apply tw-block;
    @apply tw-min-w-full;

    .ec-menu--horizontal & {
      @apply tw-inline-block;
      @apply tw-min-w-0;

      /* stylelint-disable selector-max-class */
      + .ec-menu__item {
        @apply tw-ml-16;
      }
      /* stylelint-enable */
    }
  }
}
</style>
