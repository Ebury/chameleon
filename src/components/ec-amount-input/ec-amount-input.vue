<template>
  <ec-input-field
    v-bind="{
      ...$attrs,
      ...$props,
      'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-amount-input` : 'ec-amount-input',
      modelValue: null,
      locale: null,
      isMasked: null,
      currency: null,
    }"
    v-model="inputModel"
    v-ec-amount="numberFormatOptions"
    autocomplete="off"
  />
</template>

<script setup>
defineOptions({
  inheritAttrs: false,
});

import { computed, ref, watch } from 'vue';

import VEcAmount from '../../directives/ec-amount/ec-amount';
import { format, unFormat } from '../../directives/ec-amount/utils';
import { getDecimalSeparator, getGroupingSeparator } from '../../utils/number-format';
import EcInputField from '../ec-input-field';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  ...EcInputField.props,
  modelValue: {
    validator: prop => typeof prop === 'number' || typeof prop === 'string' || prop === null,
    required: true,
    default: null,
  },
  isMasked: {
    type: Boolean,
    default: false,
  },
  locale: {
    type: String,
    default: 'en',
  },
  currency: {
    type: String,
  },
});

// number format settings
const precision = computed(() => {
  const options = new Intl.NumberFormat(props.locale, { style: 'currency', currency: props.currency || 'XYZ' }).resolvedOptions();
  return options.maximumFractionDigits;
});
const groupingSeparator = computed(() => getGroupingSeparator(props.locale));
const decimalSeparator = computed(() => getDecimalSeparator(props.locale));
const numberFormatOptions = computed(() => ({
  precision: precision.value,
  decimalSeparator: decimalSeparator.value,
  groupingSeparator: groupingSeparator.value,
}));

// models
const formattedValue = ref('');
const unformattedValue = ref(null);

const inputModel = computed({
  get() {
    return formattedValue.value;
  },
  set(newValue) {
    const newValueFormatted = format(newValue, numberFormatOptions.value);
    if (newValueFormatted !== newValue) {
      return;
    }

    if (newValue === formattedValue.value) {
      return;
    }

    formattedValue.value = newValue;
  },
});

watch([() => props.currency, () => props.locale], () => {
  if (formattedValue.value) {
    const formatted = new Intl.NumberFormat(props.locale, { type: 'decimal', maximumFractionDigits: precision.value }).format(unformattedValue.value);
    formattedValue.value = format(formatted, numberFormatOptions.value);
  }
});

watch(formattedValue, (newValue) => {
  if (newValue) {
    const newUnformattedValue = +(unFormat(newValue, groupingSeparator.value, decimalSeparator.value));
    const hasUnformattedValueChanged = unformattedValue.value !== newUnformattedValue;
    unformattedValue.value = newUnformattedValue;
    if (props.isMasked) {
      emit('update:modelValue', formattedValue.value);
    } else {
      if (Number.isNaN(newUnformattedValue) || !hasUnformattedValueChanged) {
        // prevent emitting update events for NaN values or if the unformatted values hasn't changed.
        // this can happen in cases like:
        // 1. user types "-" into the input field -> unformattedValue will be NaN
        // 2. user typed "1", then "1.", then "1.0" -> unformattedValue is always the same, only the formattedValue changes.
        return;
      }
      emit('update:modelValue', unformattedValue.value);
    }
  } else {
    unformattedValue.value = null;
    emit('update:modelValue', props.isMasked ? formattedValue.value : unformattedValue.value);
  }
});

watch(() => props.modelValue, (newValue) => {
  if (props.isMasked) {
    if (newValue === formattedValue.value) {
      return;
    }

    formattedValue.value = newValue;
    unformattedValue.value = +(unFormat(newValue, groupingSeparator.value, decimalSeparator.value));
  } else {
    if (newValue === unformattedValue.value) {
      return;
    }

    if (!Number.isNaN(newValue) && formattedValue.value !== '-') {
      if (typeof newValue === 'number') {
        formattedValue.value = new Intl.NumberFormat(props.locale, { type: 'decimal', maximumFractionDigits: precision.value }).format(newValue);
      } else {
        formattedValue.value = format(newValue, numberFormatOptions.value);
      }
    }
    unformattedValue.value = newValue;
  }
}, {
  immediate: true,
});

watch(() => props.isMasked, (newValue) => {
  emit('update:modelValue', newValue ? formattedValue.value : unformattedValue.value);
});
</script>

