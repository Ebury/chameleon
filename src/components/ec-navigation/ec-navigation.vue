<template>
  <div
    class="ec-navigation"
    :class="{ 'ec-navigation--is-collapsable': isCollapsable, 'ec-navigation--is-collapsed': isCollapsed }"
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
    isCollapsed: {
      type: Boolean,
      required: true,
      default: false,
    },
    isCollapsable: {
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
@import '../../scss/tools/index';

.ec-navigation {
  width: 280px;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 1;
  background-color: $level-2-bank-blue;
  color: $white;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;

  &--is-collapsed {
    width: 80px;
  }

  &--is-collapsable {
    transition: width 0.5s;
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
    flex-grow: 1;
  }

  &__copyright {
    @include caption-text;

    padding: 0 24px;
    text-align: center;
  }
}
</style>
