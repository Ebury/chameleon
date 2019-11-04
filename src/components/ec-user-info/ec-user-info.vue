<template>
  <div class="ec-user-info">
    <img
      class="ec-user-info__image"
      :src="user.gravatar"
      @click="this.$emit('toggle')"
    >
    <template v-if="!isCollapsed">
      <div class="ec-ml--8 ec-mr--8">
        <a
          class="ec-user-info__client-name ec-mt--8 ec-mb--8"
          :href="user.profileUrl"
        >{{ user.name }}</a>

        <select
          name="acount selector"
        >
          <option value="ebury">Ebury</option>
          <option value="eburydemo2">EburyDemo2</option>
        </select>
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
  flex-direction: row;
  font-size: 18px;
  align-items: center;
  color: $white;

  @include media__from-1280 {
    flex-direction: column;
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

    &:hover {
      color: $ec-client-text-color-hover;
      transition: color 0.5s ease-out;
    }
  }
}
</style>
