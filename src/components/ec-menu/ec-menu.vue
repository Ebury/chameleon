<template>
  <ul
    v-if="hasLinks"
    class="ec-menu"
    data-test="ec-menu"
    :class="{
      'ec-menu--horizontal': horizontal && !isReversed,
      'ec-menu--is-reversed': !horizontal && isReversed,
      'ec-menu--is-reversed-horizontal': horizontal && isReversed,
    }"
  >
    <li
      v-for="(link, index) of validLinks"
      :key="index"
      class="ec-menu__item"
      data-test="ec-menu__item"
    >
      <ec-navigation-link
        v-bind="{
          ...link,
          on: null,
          dataTest: null,
          'data-test': getLinkDataTest(link),
        }"
        class="ec-menu__link"
        :is-collapsed="isCollapsed"
        :is-compact="horizontal"
        v-on="link.on || {}"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import EcNavigationLink from '../ec-navigation-link';
import type { MenuLink, MenuProps } from './types';

const props = withDefaults(defineProps<MenuProps>(), {
  links: () => [],
});

const hasLinks = computed(() => Boolean(props.links && props.links.length));
const validLinks = computed(() => props.links.filter(link => Boolean(link && link.url)));

function getLinkDataTest(link: MenuLink): string {
  return `ec-menu__link ${link.dataTest || ''}`.trim();
}
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

  &--is-reversed {
    @apply tw-flex-col-reverse;
  }

  &--is-reversed-horizontal {
    @apply tw-flex-row-reverse;
    @apply tw-items-center tw-justify-center;
  }

  &__item {
    @apply tw-block;
    @apply tw-w-full;

    .ec-menu--horizontal &,
    .ec-menu--is-reversed-horizontal & {
      @apply tw-inline-block;
      @apply tw-min-w-0;
      @apply tw-w-auto;

      /* stylelint-disable selector-max-class */
      + .ec-menu__item {
        @apply tw-ml-16;
      }
      /* stylelint-enable */
    }
  }
}
</style>
