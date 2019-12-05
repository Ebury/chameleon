<template>
  <div
    class="ec-user-info"
    :class="{'ec-user-info--is-collapsable': isCollapsable}"
  >
    <img
      class="ec-user-info__avatar"
      :src="user.gravatar"
      :alt="user.name + ' gravatar'"
      @click="toggle()"
    >

    <transition name="ec-user-info__client-fade">
      <div
        v-if="!isCollapsed"
        class="ec-user-info__client-wrapper"
      >
        <a
          class="ec-user-info__client-name"
          :href="user.profileUrl"
        >{{ user.name }}</a>

        <slot name="client-selector" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'EcUserInfo',
  props: {
    user: {
      type: Object,
      default: () => ({}),
      required: true,
    },
    isCollapsed: {
      type: Boolean,
    },
    isCollapsable: {
      type: Boolean,
    },
  },
  methods: {
    toggle() {
      this.$emit('toggle');
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/settings/colors/index';
@import '../../scss/tools/index';

$ec-client-text-color: $white !default;
$ec-client-text-color-hover: $level-4-tech-blue !default;
$ec-user-info-avatar-size: 48px !default;

.ec-user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  white-space: nowrap;

  &--is-collapsable {
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    max-height: $ec-user-info-avatar-size;

    .ec-user-info__avatar {
      margin-right: 16px;
    }
  }

  &__avatar {
    width: $ec-user-info-avatar-size;
    height: $ec-user-info-avatar-size;
    border-radius: 6px;
  }

  &__client-name {
    @include h4;
    @include ellipsis;

    display: block;
    color: $ec-client-text-color;
    text-decoration: none;
    margin-top: 8px;
    margin-bottom: 4px;

    &:hover {
      color: $ec-client-text-color-hover;
      text-decoration: none;

      @include transition-ease-out(color, 0.5s);
    }

    &:focus {
      outline: 0;
      color: $ec-client-text-color-hover;
    }

    .ec-user-info--is-collapsable & {
      margin-top: 0;
    }
  }

  &__client-fade {
    @include fade-transition;
  }

  &__client-wrapper {
    min-width: 0;
    max-width: 100%;
    text-align: center;

    .ec-user-info--is-collapsable & {
      text-align: left;
      align-self: center;
    }
  }
}
</style>
