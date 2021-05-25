<template>
  <div
    ref="popperReference"
    class="ec-btn-dropdown"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-btn-dropdown` : 'ec-btn-dropdown'"
  >
    <ec-btn
      :is-disabled="isDisabled"
      is-reverse
      category="primary"
      is-rounded
      class="ec-btn-dropdown__btn"
      data-test="ec-btn-dropdown__btn"
      @click="$emit('click')"
    >
      {{ textButton }}
    </ec-btn>
    <ec-dropdown-search
      :items="itemsDropdown"
      :is-search-enabled="false"
      :popper-modifiers="popperModifiers"
      :disabled="isDisabled"
      @change="(value) => $emit('change', value)"
      @open="isActive = true"
      @close="isActive = false"
    >
      <ec-btn
        :is-disabled="isDisabled"
        is-reverse
        is-rounded
        category="primary"
        :class="{
          'ec-btn-dropdown__dropdown-btn': true,
          'ec-btn-dropdown__dropdown-btn--active': isActive,
        }"
        data-test="ec-btn-dropdown__dropdown-btn"
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
    textButton: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isActive: false,
    };
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
            data.offsets.popper.left = ref.getBoundingClientRect().left;
            data.popper.left = ref.getBoundingClientRect().left;

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
    @apply tw-inline-flex;

    max-width: 217px;

    &__dropdown-btn {
      @apply tw-rounded-l-none;
      @apply tw-border-gray-6 tw-border-l tw-border-solid;
      @apply tw-bg-gray-7;

      &--active {
        @apply tw-bg-key-4;
        @apply tw-text-gray-8;
      }

      &:hover {
        @apply tw-bg-key-3;
      }

      &:disabled {
        @apply tw-text-gray-5;
      }
    }

    &__btn {
      @apply tw-rounded-r-none;
      @apply tw-pl-16;
      @apply tw-text-gray-3;

      padding-right: 14px;

      &:disabled {
        @apply tw-text-gray-5;
      }
    }
  }
</style>
