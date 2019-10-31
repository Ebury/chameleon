<template>
  <!-- If it is a router link -->
  <router-link
    v-if="isRouterLink"
    active-class="ec-navigation-link--is-active"
    class="ec-navigation-link"
    :class="{
      'ec-navigation-link--is-active': isActive,
      'ec-navigation-link--is-compact': isCompact,
      'ec-navigation-link--is-expanded': isExpanded
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
        v-show="isExpanded"
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
      'ec-navigation-link--is-expanded': isExpanded
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
        v-show="isExpanded"
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
    isExpanded: {
      type: Boolean,
      default: true,
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
@import '../../scss/tools/typography';
@import '../../scss/tools/media-queries';
@import '../../scss/settings/colors/index';
$ec-navigation-link-text-color: $white !default;

.ec-navigation-link {
  @include h6;

  font-style: normal;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: $ec-navigation-link-text-color;

  &:not(&--is-expanded) {
    padding: 12px 28px;
  }

  &--is-compact {
    text-transform: none;
    padding: 0;
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
    &-enter-active,
    &-leave-active {
      transition: opacity 0.5s;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
    }
  }

  &--is-active {
    background-color: $level-4-tech-blue;
  }

  &:hover:not(&--is-active) {
    color: $level-4-tech-blue;
  }
}
</style>
