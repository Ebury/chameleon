<template>
  <ec-input-field
    v-bind="{
      ...$attrs,
      ...inputFieldProps,
      'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-amount-input` : 'ec-amount-input',
    }"
    v-model="inputModel"
    v-ec-amount="numberFormatOptions"
    autocomplete="off"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import vEcAmount from '../../directives/ec-amount/ec-amount';
import { format, unFormat } from '../../directives/ec-amount/utils';
import type { Maybe } from '../../main';
import { getDecimalSeparator, getGroupingSeparator } from '../../utils/number-format';
import EcInputField from '../ec-input-field';
import type { AmountInputProps } from './types';

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: AmountInputProps['modelValue']],
}>();

const props = withDefaults(defineProps<AmountInputProps>(), {
  modelValue: null,
  locale: 'en',
});

const inputFieldProps = computed(() => {
  const {
    currency, locale, modelValue, isMasked, ...rest
  } = props;
  return rest;
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
const unformattedValue = ref<Maybe<number>>(null);

const inputModel = computed({
  get() {
    return formattedValue.value;
  },
  set(newValue: string) {
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
  if (formattedValue.value && typeof unformattedValue.value === 'number') {
    const formatted = new Intl.NumberFormat(props.locale, { style: 'decimal', maximumFractionDigits: precision.value }).format(unformattedValue.value);
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

    if (newValue === null || typeof newValue !== 'string') {
      formattedValue.value = '';
      unformattedValue.value = null;
      return;
    }

    formattedValue.value = format(newValue, numberFormatOptions.value);
    unformattedValue.value = +(unFormat(newValue, groupingSeparator.value, decimalSeparator.value));
  } else {
    if (newValue === unformattedValue.value) {
      return;
    }

    if (!Number.isNaN(newValue) && formattedValue.value !== '-') {
      if (typeof newValue === 'number') {
        formattedValue.value = new Intl.NumberFormat(props.locale, { style: 'decimal', maximumFractionDigits: precision.value }).format(newValue);
      } else if (typeof newValue === 'string') {
        formattedValue.value = format(newValue, numberFormatOptions.value);
      } else {
        formattedValue.value = '';
      }
    }

    if (typeof newValue !== 'string') {
      unformattedValue.value = newValue;
    }
  }
}, {
  immediate: true,
});

watch(() => props.isMasked, (newValue) => {
  emit('update:modelValue', newValue ? formattedValue.value : unformattedValue.value);
});
</script>
