<template>
  <div
    class="ec-user-info"
    :class="{'ec-user-info--is-collapsable': isCollapsable}"
  >
    <img
      class="ec-user-info__image"
      :src="user.gravatar"
      @click="toggle()"
    >
    <template v-if="!isCollapsed">
      <div>
        <a
          class="ec-user-info__client-name"
          :href="user.profileUrl"
        >{{ user.name }}</a>

        <slot name="dropdown-search" />
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
  font-size: 18px;
  align-items: center;
  color: $white;

  &--is-collapsable {
    flex-direction: row;
    justify-content: center;

    .ec-user-info__image {
      margin-right: 8px;
    }
  }

  &__image {
    width: 48px;
    height: 48px;
    border-radius: 6px;
  }

  &__client-name {
    display: block;
    color: $white;
    font-weight: 300;
    font-size: 18px;
    text-decoration: none;
    margin: 8px 0;

    &:hover {
      color: $ec-client-text-color-hover;
      transition: color 0.5s ease-out;
    }
  }
}
</style>
