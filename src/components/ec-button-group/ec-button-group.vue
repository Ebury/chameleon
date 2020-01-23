<template>
  <div class="ec-btn-group">
    <button
      v-for="(button, index) in items"
      :key="index"
      class="ec-btn ec-btn--md ec-btn--primary ec-btn-group__btn"
      :class="{
        'ec-btn--outline': value !== button.value
      }"
      :disabled="button.disabled"
      @click="$emit('change', button.value)"
    >
      {{ button.text }}
    </button>
  </div>
</template>

<script>
import { arrayOfObjectsContainsKey } from '../../utils/validators';

export default {
  name: 'EcButtonGroup',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {},
    items: {
      type: Array,
      required: true,
      validator: array => arrayOfObjectsContainsKey(array, 'value') && arrayOfObjectsContainsKey(array, 'text'),
    },
  },
  methods: {
  },
};
</script>

<style lang="scss">
@import '../../scss/settings/index';

$ec-btn-primary-color: $level-4-tech-blue !default;

.ec-btn-group {
  &__btn:first-child {
    border-radius: 32px 0 0 32px;
  }

  &__btn:not(:last-child) {
    border-right: 0;
  }

  &__btn:last-child {
    border-radius: 0  32px  32px 0;
  }
}
</style>
