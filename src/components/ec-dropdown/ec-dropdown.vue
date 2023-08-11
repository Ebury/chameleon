<template>
  <ec-dropdown-search
    v-bind="{ ...$attrs, 'data-test': 'ec-dropdown' }"
    v-model="selectedModel"
    class="ec-dropdown"
    :items="items"
    :placeholder="searchPlaceholder"
    :no-results-text="noResultsText"
    :is-search-enabled="isSearchEnabled"
    :search-fields="searchFields"
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
      ref="triggerRef"
      :error-id="errorId"
      :model-value="selectedTextValue"
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
      v-if="hasSlot('item')"
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
      v-if="hasSlot('cta')"
    >
      <slot name="cta" />
    </template>
  </ec-dropdown-search>
</template>

<script setup>
defineOptions({
  inheritAttrs: false,
});

import { computed, ref, useSlots } from 'vue';

import EcDropdownSearch from '../ec-dropdown-search';
import EcInputField from '../ec-input-field';

const emit = defineEmits(['update:modelValue', 'change', 'blur', 'focus', 'open', 'close', 'after-open', 'after-close']);

const props = defineProps({
  items: {
    type: Array,
    default: () => ([]),
  },
  searchFields: {
    type: Array,
    default: null,
  },
  modelValue: {
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
    type: [Object, Function],
    default: null,
  },
  tooltipCta: {
    type: String,
    default: '',
  },
});

// selected value
const selectedModel = computed({
  get() {
    return props.modelValue;
  },
  set(selectedItem) {
    emit('update:modelValue', selectedItem);
    emit('change', selectedItem);
  },
});

const selectedTextValue = computed(() => {
  if (props.selectedText) {
    return props.selectedText;
  }
  if (props.modelValue) {
    return props.modelValue.text;
  }
  return '';
});

// maintaining focus
const shouldEmitFocus = ref(true);
const triggerRef = ref(null);

function onSelected() {
  // return focus back to the readonly input
  if (triggerRef.value && triggerRef.value.inputRef !== document.activeElement) {
    shouldEmitFocus.value = false;
    triggerRef.value.focus();
  }
}

function onFocus() {
  // when an item has been selected the readonly input will regain the focus.
  // The `focus` event should not be emitted in this scenario
  if (shouldEmitFocus.value) {
    emit('focus');
  } else {
    shouldEmitFocus.value = true;
  }
}

// slots
const slots = useSlots();

function hasSlot(name) {
  return name in slots;
}
</script>

<style>
.ec-dropdown {
  &__input-wrapper {
    @apply tw-relative;
  }
}
</style>
