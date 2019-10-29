<template>
  <div class="ec-main-container">
    <template v-if="title">
      <h1 class="ec-main-container__title">{{ title }}</h1>
      <p class="ec-main-container__title-intro">{{ titleIntro }}</p>
    </template>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'EcMainContainer',
  props: {
    title: {
      type: String,
      default: null,
    },
    titleIntro: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/tools/typography';
@import '../../scss/settings/colors/gray-color-scale';

.ec-main-container {
  padding: 24px;
  min-height: 100%;

  &__title {
    @include h1;

    margin-top: 0;
    margin-bottom: 8px;
  }

  &__title-intro {
    @include body-text;

    color: $level-4-interactive-elements;
    margin-top: 0;
    margin-bottom: 16px;
  }
}
</style>
