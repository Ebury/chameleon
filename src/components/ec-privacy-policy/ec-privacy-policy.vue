<template>
  <div class="ec-privacy-policy">
    <div class="ec-privacy-policy__content">
      <div class="ec-privacy-policy__title ec-privacy-policy__item">{{ title }}</div>
      <div class="ec-privacy-policy__item">
        <slot />
      </div>
      <div class="ec-privacy-policy__item">
        <button
          class="ec-privacy-policy__btn ec-btn ec-btn--rounded ec-btn-secondary ec-btn--sm"
          @click="$emit('accept')"
        >{{ buttonText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EcPrivacyPolicy',
  props: {
    title: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/settings/colors/key-color-scale';
@import '../../scss/settings/layout';
@import '../../scss/settings/z-index';
@import '../../scss/tools/typography';
@import '../../scss/tools/media-queries';

$ec-privacy-policy-max-width: $body-max-width !default;

.ec-privacy-policy {
  z-index: $z-index-level-1;
  background-color: rgba($level-7, 0.95);
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;

  &__content {
    padding: 24px 48px;
    max-width: $ec-privacy-policy-max-width;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 640px) {
      padding: 24px 16px;
    }
  }

  &__title {
    @include h4;
  }

  &__item {
    @media screen and (max-width: $ec-privacy-policy-max-width) {
      width: 100%;
      margin: 4px auto;
    }
  }
}
</style>
