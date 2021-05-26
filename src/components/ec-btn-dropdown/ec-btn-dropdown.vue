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
      {{ buttonText }}
    </ec-btn>
    <ec-dropdown-search
      :items="items"
      :is-search-enabled="false"
      :popper-modifiers="popperModifiers"
      :disabled="isDisabled"
      @change="(value) => $emit('change', value)"
      @open="isOpen = true"
      @close="isOpen = false"
    >
      <ec-btn
        :is-disabled="isDisabled"
        is-reverse
        is-rounded
        category="primary"
        :class="{
          'ec-btn-dropdown__dropdown-btn': true,
          'ec-btn-dropdown__dropdown-btn--is-open': isOpen,
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
    items: {
      type: Array,
      default: () => [],
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    buttonText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
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
            const refLeft = this.$refs.popperReference.getBoundingClientRect().left;
            data.offsets.popper.left = refLeft;
            data.popper.left = refLeft;

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

      &--is-open {
        @apply tw-bg-key-4;
        @apply tw-border-key-4;
        @apply tw-text-gray-8;
      }

      &:hover {
        @apply tw-border-key-3;
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

      &:disabled {
        @apply tw-text-gray-5;
      }
    }
  }
</style>
