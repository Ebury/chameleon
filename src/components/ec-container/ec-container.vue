<template>
  <div class="ec-container">
    <template v-if="title">
      <h1 class="ec-container__title">{{ title }}</h1>
      <p class="ec-container__title-intro">{{ titleIntro }}</p>
    </template>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'EcContainer',
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

.ec-container {
  padding: 1.5rem;

  &__title {
    @include h1;

    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  &__title-intro {
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    color: $level-4-interactive-elements;
    margin-top: 0;
    margin-bottom: 1rem;
  }
}
</style>
