<template>
  <div class="ec-btn-group">
    <button
      v-for="(item, index) in items"
      :key="item.id || index"
      :data-test="`ec-button-group__btn-${index}`"
      class="ec-btn ec-btn--md ec-btn--primary ec-btn-group__btn"
      :class="{
        'ec-btn--outline': value !== item.value
      }"
      :disabled="item.disabled"
      @click="$emit('change', item.value)"
    >
      {{ item.text }}
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
    // eslint-disable-next-line vue/require-prop-types
    value: {},
    items: {
      type: Array,
      required: true,
      validator: array => arrayOfObjectsContainsKey(array, ['value', 'text']),
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/settings/index';

$ec-btn-primary-color: $level-4-tech-blue !default;
$ec-btn-border-radius: 32px;

.ec-btn-group {
  &__btn:first-child {
    border-radius: $ec-btn-border-radius 0 0 $ec-btn-border-radius;
  }

  &__btn:not(:last-child) {
    border-right: 0;
  }

  &__btn:not(:disabled) + &__btn:disabled:not(:first-child) {
    border-left: 1px solid $ec-btn-primary-color;
  }

  &__btn:last-child {
    border-radius: 0 $ec-btn-border-radius $ec-btn-border-radius 0;
  }
}
</style>
