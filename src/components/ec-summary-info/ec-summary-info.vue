<template>
  <div
    class="ec-summary-info"
    data-test="ec-summary-info"
  >
    <div
      v-if="icon"
      class="ec-summary-info__icon"
    >
      <ec-icon
        name="simple-sell"
        :size="12"
      />
    </div>

    <div class="ec-summary-info__content">
      <div
        v-if="title"
        class="ec-summary-info__title"
        data-test="ec-summary-info__title"
      >
        {{ title }}
      </div>

      <slot>
        <div class="ec-summary-info__content-lines" />
      </slot>
    </div>
  </div>
</template>

<script setup>

import EcIcon from '../ec-icon';

defineProps({
  title: {
    type: String,
    default: null,
  },
  icon: {
    type: String,
  },
});
</script>

<style>
:root {
  --ec-summary-info--width: 184px;
}

.ec-summary-info {
  max-width: var(--ec-summary-info--width);
  @apply tw-flex;

  &__icon {
    @apply tw-flex-grow-0; }

  &__content {
    @apply tw-flex-grow;
  }
}

</style>
