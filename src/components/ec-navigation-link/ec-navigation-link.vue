<template>
  <!-- If it is a router link -->
  <router-link
    v-if="isRouterLink"
    active-class="ec-navigation-link--is-active"
    class="ec-navigation-link"
    :class="{
      'ec-navigation-link--is-active': isActive,
      'ec-navigation-link--is-compact': isCompact,
      'ec-navigation-link--is-collapsed': isCollapsed
    }"
    :exact="isExact"
    :to="url"
    v-on="$listeners"
  >
    <ec-icon
      class="ec-navigation-link__icon"
      :name="iconName"
      :size="iconSize"
    />
    <transition name="ec-navigation-link__text-fade">
      <span
        v-show="!isCollapsed"
        class="ec-navigation-link__text"
      >{{ text }}</span>
    </transition>

  </router-link>

  <!-- If is a normal link that directs you outside the SPA -->
  <a
    v-else
    class="ec-navigation-link"
    :class="{
      'ec-navigation-link--is-active': isActive,
      'ec-navigation-link--is-compact': isCompact,
      'ec-navigation-link--is-collapsed': isCollapsed
    }"
    :href="url"
    :target="target"
    v-on="$listeners"
  >
    <ec-icon
      class="ec-navigation-link__icon"
      :name="iconName"
      :size="iconSize"
    />
    <transition name="ec-navigation-link__text-fade">
      <span
        v-show="!isCollapsed"
        class="ec-navigation-link__text"
      >{{ text }}</span>
    </transition>
  </a>
</template>

<script>
import EcIcon from '../ec-icon/ec-icon.vue';

export default {
  components: {
    EcIcon,
  },
  props: {
    text: {
      type: String,
      required: true,
    },
    iconName: String,
    iconSize: {
      default: 24,
      type: Number,
    },
    url: {
      type: String,
      required: true,
    },
    isExact: {
      type: Boolean,
      default: false,
    },
    isRouterLink: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isCollapsed: {
      type: Boolean,
      default: false,
    },
    isCompact: {
      type: Boolean,
      default: false,
    },
    target: {
      type: String,
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/tools/index';
@import '../../scss/settings/colors/index';
$ec-navigation-link-text-color: $white !default;
$ec-navigation-link-text-color-hover: $level-4-tech-blue !default;

.ec-navigation-link {
  @include h6;

  font-style: normal;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: $ec-navigation-link-text-color;
  white-space: nowrap;

  &:hover {
    color: $ec-navigation-link-text-color-hover;
    text-decoration: none;
  }

  &:focus {
    outline: 0;
    color: $ec-navigation-link-text-color-hover;
  }

  &--is-compact {
    text-transform: none;
    padding: 0;
  }

  &--is-collapsed {
    padding: 12px 28px;
  }

  &__icon {
    fill: currentColor;
    transition: color 0.5s;
  }

  &__text {
    @include ellipsis;

    flex-shrink: 1;
    margin-left: 16px;
    transition: color 0.5s;

    .ec-navigation-link--is-compact & {
      margin-left: 8px;
    }
  }

  &__text-fade {
    @include fade-transition;
  }

  &--is-active {
    background-color: $level-4-tech-blue;

    &:hover,
    &:focus {
      color: $ec-navigation-link-text-color;
    }

    &:focus {
      background-color: rgba($level-4-tech-blue, 0.9);
    }
  }
}
</style>
