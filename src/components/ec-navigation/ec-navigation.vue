<template>
  <div
    class="ec-navigation"
    :class="{ 'ec-navigation--can-be-collapsed': canBeCollapsed, 'ec-navigation--is-expanded': isExpanded }"
  >
    <div
      v-if="showBrandingLogo && branding.logo"
      class="ec-navigation__branding"
    >
      <img
        :src="branding.logo"
        :alt="branding.name"
      >
    </div>
    <div
      v-if="$slots['user-info']"
      class="ec-navigation__block ec-navigation__user-info"
    >
      <slot name="user-info" />
    </div>
    <div
      v-if="$slots['call-to-action']"
      class="ec-navigation__block ec-navigation__call-to-action"
    >
      <slot name="call-to-action" />
    </div>
    <div class="ec-navigation__block ec-navigation__menu">
      <slot name="menu" />
    </div>
    <div
      v-if="$slots['footer-menu']"
      class="ec-navigation__block ec-navigation__footer-menu"
    >
      <slot name="footer-menu" />
    </div>
    <div
      v-if="$slots.copyright"
      class="ec-navigation__block ec-navigation__copyright"
    >
      <slot name="copyright" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'EcNavigation',
  props: {
    isExpanded: {
      type: Boolean,
      required: true,
    },
    canBeCollapsed: {
      type: Boolean,
      required: true,
    },
    branding: {
      type: Object,
      default: () => ({}),
      required: true,
    },
    showBrandingLogo: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/settings/colors/index';
@import '../../scss/tools/typography';

.ec-navigation {
  height: 100%;
  width: 280px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: auto;
  right: auto;
  z-index: 1;
  background-color: $level-2-bank-blue;
  color: $white;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;

  &--can-be-collapsed {
    transition: width 0.5s;
    width: 80px;

    &.ec-navigation--is-expanded {
      width: 280px;
    }
  }

  &__branding {
    padding: 24px;
    text-align: center;
  }

  &__block {
    margin-top: 16px;

    &:last-child {
      margin-bottom: 16px;
    }
  }

  &__menu {
    flex: 1;
  }

  &__copyright {
    @include small-text;

    padding: 0 24px;
    text-align: center;
    color: $level-5-placeholders;
  }
}
</style>
