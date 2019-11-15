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
@import '../../scss/settings/z-index';
@import '../../scss/tools/typography';
@import '../../scss/tools/media-queries';

.ec-privacy-policy {
  z-index: $z-index-level-3;
  padding: 24px;
  background-color: #ebfbff;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  opacity: 0.95;

  &__content {
    max-width: 1184px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    justify-content: space-between;
  }

  &__title {
    @include h4;
  }

  &__item {
    @media screen and (max-width: 1184px) {
      width: 100%;
      margin: 0.25rem auto;
    }
  }
}
</style>
