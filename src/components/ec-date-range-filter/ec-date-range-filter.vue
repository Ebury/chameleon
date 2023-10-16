<template>
  <ec-filter-popover
    :label="label"
    :number-of-selected-filters="numberOfSelectedFilters"
    :popover-options="popoverOptions"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-date-range-filter__trigger` : 'ec-date-range-filter__trigger'"
  >
    <template #filter>
      <div
        class="ec-date-range-filter"
        data-test="ec-date-range-filter"
      >
        <div class="ec-date-range-filter__inputs-wrapper">
          <ec-input-field
            v-model="fromValueDate"
            class="ec-date-range-filter__from-input"
            data-test="ec-date-range-filter__from-input"
            type="date"
            placeholder="dd/mm/yyyy"
            :label="fromLabelText"
            :error-message="fromErrorMessage"
            :max="toValueDate"
            @blur="onBlur()"
          />
          <ec-input-field
            v-model="toValueDate"
            class="ec-date-range-filter__to-input"
            data-test="ec-date-range-filter__to-input"
            type="date"
            placeholder="dd/mm/yyyy"
            :label="toLabelText"
            :error-message="toErrorMessage"
            :min="fromValueDate"
            @blur="onBlur()"
          />
        </div>
        <p
          v-if="dateRangeErrorMessage"
          class="ec-date-range-filter__error-text"
          data-test="ec-date-range-filter__error-text"
        >{{ dateRangeErrorMessage }}</p>
        <button
          type="button"
          :disabled="isButtonDisabled"
          class="ec-date-range-filter__clear-button"
          data-test="ec-date-range-filter__clear-button"
          @click="clear()"
        >{{ clearText }}</button>
      </div>
    </template>
  </ec-filter-popover>
</template>

<script setup>
import { computed } from 'vue';

import EcFilterPopover from '../ec-filter-popover';
import EcInputField from '../ec-input-field';

const props = defineProps({
  label: {
    type: String,
    required: true,
    default: '',
  },
  fromLabelText: {
    type: String,
    required: false,
    default: 'From',
  },
  toLabelText: {
    type: String,
    required: false,
    default: 'To',
  },
  clearText: {
    type: String,
    required: false,
    default: 'Clear dates',
  },
  fromErrorMessage: {
    type: String,
    required: false,
    default: '',
  },
  toErrorMessage: {
    type: String,
    required: false,
    default: '',
  },
  dateRangeErrorMessage: {
    type: String,
    required: false,
    default: '',
  },
  popoverOptions: {
    type: Object,
  },
  modelValue: {
    type: Object,
  },
});

const emit = defineEmits(['update:modelValue', 'change', 'blur']);

// update selected dates
function update(newValue) {
  emit('update:modelValue', newValue);
  emit('change', newValue);
}
const fromValueDate = computed({
  get() {
    return props.modelValue?.from;
  },
  set(value) {
    update({ from: value, to: toValueDate.value });
  },
});
const toValueDate = computed({
  get() {
    return props.modelValue?.to;
  },
  set(value) {
    update({ from: fromValueDate.value, to: value });
  },
});

// disable clear button
const numberOfSelectedFilters = computed(() => {
  if (fromValueDate.value && toValueDate.value) {
    return 2;
  }

  if (fromValueDate.value || toValueDate.value) {
    return 1;
  }

  return 0;
});
const isButtonDisabled = computed(() => numberOfSelectedFilters.value <= 0);

function clear() {
  update(null);
}
function onBlur() {
  emit('blur', { from: fromValueDate.value, to: toValueDate.value });
}
</script>

<style>
@import '../../styles/tools/typography.css';

.ec-date-range-filter {
  @apply tw-px-20 tw-py-16;

  &__to-input {
    @apply tw-pt-20;
  }

  &__error-text {
    @apply tw-help-text tw-text-error;
  }

  &__clear-button {
    @mixin ec-body-link;

    @apply tw-mt-24;
    @apply tw-border-none;
    @apply tw-bg-transparent;

    &:disabled {
      @apply tw-text-gray-5;
      @apply tw-pointer-events-none;
    }

    &:hover {
      @apply tw-cursor-pointer;
    }
  }
}
</style>
