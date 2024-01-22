<template>
  <ec-filter-popover
    v-bind="{
      ...$attrs,
      label,
      numberOfSelectedFilters,
      popoverOptions: allPopoverOptions,
      'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-date-range-filter__trigger` : 'ec-date-range-filter__trigger',
    }"
  >
    <template #filter>
      <div
        class="ec-date-range-filter"
        data-test="ec-date-range-filter"
      >
        <div class="ec-date-range-filter__inputs-wrapper">
          <ec-datepicker
            v-bind="{
              ...$props,
              ...fromDatepickerOptions,
              level: 'modal',
            }"
            v-model="fromValueDate"
            data-test="ec-date-range-filter__from-input"
            class="ec-date-range-filter__from-input"
            @blur="onBlur()"
            @open="/* c8 ignore next */ isAutoHideEnabled = false"
            @close="/* c8 ignore next */ onClose()"
          />

          <ec-datepicker
            v-bind="{
              ...$props,
              ...toDatepickerOptions,
              level: 'modal',
            }"
            v-model="toValueDate"
            class="ec-date-range-filter__to-input"
            data-test="ec-date-range-filter__to-input"
            @blur="onBlur()"
            @open="/* c8 ignore next */ isAutoHideEnabled = false"
            @close="/* c8 ignore next */ onClose()"
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
import { computed, ref } from 'vue';

import EcDatepicker from '../ec-datepicker';
import EcFilterPopover from '../ec-filter-popover';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  label: {
    type: String,
    required: true,
    default: '',
  },
  clearText: {
    type: String,
    required: false,
    default: 'Clear dates',
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
  fromDatepickerOptions: {
    type: Object,
    default: () => ({}),
  },
  toDatepickerOptions: {
    type: Object,
    default: () => ({}),
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
  update({
    from: null,
    to: null,
  });
}

function onBlur() {
  emit('blur', { from: fromValueDate.value, to: toValueDate.value });
}

const isAutoHideEnabled = ref(true);
const allPopoverOptions = computed(() => ({
  ...props.popoverOptions,
  autoHide: isAutoHideEnabled.value, // autoHide of the ec-filter-popover should be disabled while flatpickr is open, otherwise selecting value in the flatpickr will close this popover too.
  hideTriggers: ['close'],
}));

/* c8 ignore start */
function onClose() {
  requestAnimationFrame(() => { // Floating vue requests next animation frame to set values and decide where to autohide or not. We need to do the same and wait for the next animation frame before re-enabling autohide.
    isAutoHideEnabled.value = true;
  });
}
/* c8 ignore stop */
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
