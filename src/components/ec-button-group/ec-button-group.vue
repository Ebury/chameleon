<template>
  <div
    class="ec-btn-group"
    v-bind="{
      'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-btn-group` : 'ec-btn-group',
    }"
  >
    <ec-btn
      v-for="(item, index) in items"
      :key="item.id || index"
      :data-test="`ec-button-group__btn ec-button-group__btn-${index}`"
      category="primary"
      class="ec-btn-group__btn"
      :is-submit="false"
      :is-outline="modelValue !== item.value"
      :is-disabled="item.disabled"
      @click="onSelected(item.value)"
    >{{ item.text }}</ec-btn>
  </div>
</template>

<script>
import { arrayOfObjectsContainsKey } from '../../utils/validators';
import EcBtn from '../ec-btn';

export default {
  name: 'EcButtonGroup',
  compatConfig: {
    COMPONENT_V_MODEL: false,
  },
  components: {
    EcBtn,
  },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    modelValue: {},
    items: {
      type: Array,
      required: true,
      validator: array => arrayOfObjectsContainsKey(array, ['value', 'text']),
    },
  },
  emits: ['update:modelValue', 'change'],
  methods: {
    onSelected(value) {
      this.$emit('update:modelValue', value);
      this.$emit('change', value);
    },
  },
};
</script>

<style>
.ec-btn-group {
  &__btn:first-child {
    @apply tw-rounded-l-button;
  }

  &__btn:not(:last-child) {
    @apply tw-border-r-0;
  }

  &__btn:not(:disabled) + &__btn:disabled:not(:first-child) {
    @apply tw-border-l tw-border-solid;

    border-left-color: theme('colors.key.4');
  }

  &__btn:last-child {
    @apply tw-rounded-r-button;
  }
}
</style>
