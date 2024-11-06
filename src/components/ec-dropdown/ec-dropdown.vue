<template>
  <ec-dropdown-search
    v-bind="{ ...$attrs, 'data-test': 'ec-dropdown' }"
    v-model="selectedModel"
    class="ec-dropdown"
    :items="items"
    :placeholder="searchPlaceholder"
    :no-results-text="noResultsText"
    :is-search-enabled="isSearchEnabled"
    :is-custom-search-enabled="isCustomSearchEnabled"
    :search-fields="searchFields"
    :disabled="disabled"
    :level="level"
    :is-loading="isLoading"
    :popover-options="popoverOptions"
    :popover-style="popoverStyle"
    :is-sensitive="isSensitive"
    :tooltip-cta="tooltipCta"
    :is-in-light-mode="isInLightMode"
    @change="onSelected"
    @open="onOpen"
    @close="onClose"
    @after-open="$emit('after-open')"
    @after-close="$emit('after-close')"
    @search-change="$emit('search-change', $event)"
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
      :icon="isDropdownOpen ? IconName.SIMPLE_CHEVRON_UP : IconName.SIMPLE_CHEVRON_DOWN"
      :is-in-group="isInGroup"
      :bg-color-level="(isInLightMode && !isDropdownOpen) ? 7 : 8"
      :bottom-note="bottomNote"
      :show-pointer-cursor="true"
      :show-input-tooltip="true"
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

<script setup lang="ts" generic="TValue, TDropdownItem extends DropdownItem<TValue>">
import { computed, ref, useSlots } from 'vue';

import EcDropdownSearch from '../ec-dropdown-search';
import { IconName } from '../ec-icon/icon-names';
import EcInputField from '../ec-input-field';
import type { DropdownItem, DropdownProps } from './types';

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: TDropdownItem | undefined],
  'change': [value: TDropdownItem | undefined],
  'blur': [],
  'focus': [],
  'open': [],
  'close': [],
  'after-open': [],
  'after-close': [],
  'search-change': [value: string]
}>();

const props = withDefaults(defineProps<DropdownProps<TValue, TDropdownItem>>(), {
  items: () => [],
  selectedText: '',
  label: '',
  labelTooltip: '',
  errorMessage: '',
  placeholder: '',
  searchPlaceholder: 'Search...',
  noResultsText: 'No results found',
  tooltipCta: '',
  bottomNote: '',
  isInLightMode: false,
});

const isDropdownOpen = ref(false);

// selected value
const selectedModel = computed<TDropdownItem | undefined>({
  get() {
    return props.modelValue;
  },
  set(selectedItem: TDropdownItem | undefined) {
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
const triggerRef = ref<InstanceType<typeof EcInputField>>();

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

function onOpen() {
  emit('open');
  isDropdownOpen.value = true;
}

function onClose() {
  emit('close');
  isDropdownOpen.value = false;
}

// slots
const slots = useSlots();

function hasSlot(name: string): boolean {
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
