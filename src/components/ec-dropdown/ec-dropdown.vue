<template>
  <ec-dropdown-search
    v-bind="{ ...$attrs, 'data-test': 'ec-dropdown' }"
    v-model="selectedModel"
    class="ec-dropdown"
    :items="items"
    :placeholder="searchPlaceholder"
    :no-results-text="noResultsText"
    :is-search-enabled="isSearchEnabled"
    :disabled="disabled"
    :level="level"
    :is-loading="isLoading"
    :popover-options="popoverOptions"
    :popover-style="popoverStyle"
    :is-sensitive="isSensitive"
    :tooltip-cta="tooltipCta"
    @change="onSelected"
    @open="$emit('open')"
    @close="$emit('close')"
    @after-open="$emit('after-open')"
    @after-close="$emit('after-close')"
  >
    <ec-input-field
      :id="id"
      ref="trigger"
      :error-id="errorId"
      :value="selectedTextValue"
      :label="label"
      :label-tooltip="labelTooltip"
      :error-message="errorMessage"
      :placeholder="placeholder"
      :disabled="disabled"
      :icon-size="24"
      :is-sensitive="isSensitive"
      :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-dropdown__input` : 'ec-dropdown__input'"
      readonly
      icon="simple-arrow-drop-down"
      :is-in-group="isInGroup"
      @focus="onFocus"
      @blur="$emit('blur')"
    />

    <template
      #item="{ item, index, isSelected }"
      v-if="hasItemSlot()"
    >
      <slot
        name="item"
        v-bind="{
          item,
          index,
          isSelected,
        }"
      />
    </template>
    <template
      #cta
      v-if="hasCtaSlot()"
    >
      <slot name="cta" />
    </template>
  </ec-dropdown-search>
</template>

<script>
import EcDropdownSearch from '../ec-dropdown-search';
import EcInputField from '../ec-input-field';

export default {
  name: 'EcDropdown',
  components: {
    EcDropdownSearch, EcInputField,
  },
  inheritAttrs: false,
  model: {
    prop: 'selected',
    event: 'change',
  },
  props: {
    items: {
      type: Array,
      default: () => ([]),
    },
    selected: {
      type: [Object, Array],
      default: null,
    },
    selectedText: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    labelTooltip: {
      type: String,
      default: '',
    },
    level: {
      type: String,
      validator(value) {
        return ['notification', 'modal', 'tooltip', 'level-1', 'level-2', 'level-3'].includes(value);
      },
    },
    errorMessage: {
      type: String,
      default: '',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    searchPlaceholder: {
      type: String,
      default: 'Search...',
    },
    isSearchEnabled: {
      type: Boolean,
      default: false,
    },
    noResultsText: {
      type: String,
      default: 'No results found',
    },
    isInGroup: {
      type: String,
    },
    isSensitive: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
    },
    errorId: {
      type: String,
    },
    popoverOptions: {
      type: Object,
      default: null,
    },
    popoverStyle: {
      type: Object,
      default: null,
    },
    tooltipCta: {
      type: String,
      default: '',
    },
  },
  emits: ['change', 'blur', 'focus', 'open', 'close', 'after-open', 'after-close'],
  data() {
    return {
      shouldEmitFocus: true,
    };
  },
  computed: {
    selectedModel: {
      get() {
        return this.selected;
      },
      set(selectedItem) {
        this.$emit('change', selectedItem);
      },
    },
    selectedTextValue() {
      if (this.selectedText) {
        return this.selectedText;
      }
      if (this.selected) {
        return this.selected.text;
      }
      return '';
    },
  },
  methods: {
    onFocus() {
      // when an item has been selected the readonly input will regain the focus.
      // The `focus` event should not be emitted in this scenario
      if (this.shouldEmitFocus) {
        this.$emit('focus');
      } else {
        this.shouldEmitFocus = true;
      }
    },
    onSelected() {
      // return focus back to readonly input
      if (!this.$refs.trigger.$el.querySelector('input:focus')) {
        this.shouldEmitFocus = false;
        this.$refs.trigger.$el.querySelector('input').focus();
      }
    },
    hasCtaSlot() {
      return !!this.$slots.cta;
    },
    hasItemSlot() {
      return !!this.$slots.item;
    },
  },
};
</script>

<style>
.ec-dropdown {
  &__input-wrapper {
    @apply tw-relative;
  }
}
</style>
