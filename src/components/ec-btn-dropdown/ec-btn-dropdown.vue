<template>
  <div
    ref="popperReference"
    class="ec-btn-dropdown"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-btn-dropdown` : 'ec-btn-dropdown'"
  >
    <ec-btn
      :is-disabled="isDisabled"
      :is-submit="false"
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
      :max-visible-items="Infinity"
      :popover-options="popoverOptions"
      :popover-style="getPopoverStyle"
      :disabled="isDisabled"
      :list-data-test="listDataTest"
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
    listDataTest: {
      type: String,
    },
  },
  emits: ['click', 'change'],
  data() {
    return {
      isOpen: false,
      popoverOptions: {
        autoSize: 'min',
        placement: 'bottom-end',
      },
    };
  },
  methods: {
    getPopoverStyle() {
      if (this.$refs.popperReference) {
        return {
          width: `${this.$refs.popperReference.offsetWidth}px`,
        };
      }

      return null;
    },
  },

};
</script>

<style>
  .ec-btn-dropdown {
    @apply tw-inline-flex;

    max-width: 246px;

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
      @apply tw-px-16;
      @apply tw-text-gray-3;

      &:disabled {
        @apply tw-text-gray-5;
      }
    }
  }
</style>
