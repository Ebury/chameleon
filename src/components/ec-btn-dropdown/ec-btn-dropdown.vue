<template>
  <div
    ref="popperReference"
    class="ec-btn-dropdown"
  >
    <ec-btn
      :is-disabled="isDisabled"
      :is-reverse="true"
      category="primary"
      :is-rounded="true"
      class="ec-btn-dropdown__btn"
      @click="$emit('click')"
    >
      <slot />
    </ec-btn>
    <ec-dropdown-search
      :items="itemsDropdown"
      :is-search-enabled="false"
      :popper-modifiers="popperModifiers"
      :disabled="isDisabled"
      @change="(value) => $emit('change', value)"
    >
      <ec-btn
        :is-disabled="isDisabled"
        :is-reverse="true"
        :is-rounded="true"
        category="primary"
        class="ec-btn-dropdown__icon-btn"
        icon="simple-arrow-drop-down"
      />
    </ec-dropdown-search>
  </div>
</template>

<script>
import EcBtn from '../ec-btn';
import EcDropdownSearch from '../ec-dropdown-search';

export default {
  name: 'EcBtnDropdown',
  components: {
    EcBtn,
    EcDropdownSearch,
  },
  props: {
    itemsDropdown: {
      type: Array,
      default: () => [],
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    popperModifiers() {
      return {
        setPopperWidth: {
          enabled: true,
          order: 840,
          fn: /* istanbul ignore next */ (data) => {
            data.styles.width = this.$refs.popperReference.offsetWidth;
            return data;
          },
        },
        calculatePopperPosition: {
          enabled: true,
          order: 845,
          fn: /* istanbul ignore next */ (data) => {
            const ref = this.$refs.popperReference;
            data.offsets.popper.left = ref.offsetLeft;
            data.popper.left = ref.offsetLeft;

            return data;
          },
        },
      };
    },
  },
};
</script>

<style>
  .ec-btn-dropdown {
    @apply tw-flex;

    &__icon-btn {
      @apply tw-rounded-l-none;
      @apply tw-bg-gray-7;
    }

    &__btn {
      @apply tw-rounded-r-none;
      @apply tw-pl-16;
      @apply tw-text-gray-3;

      padding-right: 14px;
    }
  }
</style>
