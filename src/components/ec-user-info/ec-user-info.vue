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
    <template v-if="!isCollapsed">
      <div>
        <a
          class="ec-user-info__client-name"
          :href="user.profileUrl"
        >{{ user.name }}</a>

        <slot name="client-selector" />
      </div>
    </template>
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

.ec-user-info {
  display: flex;
  flex-direction: column;
  align-items: center;

  &--is-collapsable {
    flex-direction: row;
    justify-content: center;

    .ec-user-info__avatar {
      margin-right: 8px;
    }
  }

  &__avatar {
    width: 48px;
    height: 48px;
    border-radius: 6px;
  }

  &__client-name {
    @include h4;

    display: block;

    &:link,
    &:active {
      color: $ec-client-text-color;
      text-decoration: none;
    }

    color: $ec-client-text-color;
    text-decoration: none;
    margin: 8px 0;

    &:hover {
      color: $ec-client-text-color-hover;
      transition: color 0.5s ease-out;
    }
  }
}
</style>
