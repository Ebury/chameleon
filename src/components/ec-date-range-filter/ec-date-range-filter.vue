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
          :disabled="isDisabled"
          class="ec-date-range-filter__clear-button"
          data-test="ec-date-range-filter__clear-button"
          @click="clear()"
        >{{ clearText }}</button>
      </div>
    </template>
  </ec-filter-popover>
</template>
<script>
import EcInputField from '../ec-input-field';
import EcFilterPopover from '../ec-filter-popover';

export default {
  name: 'EcDateRangeFilter',
  components: { EcFilterPopover, EcInputField },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
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
    value: {
      type: Object,
    },
  },
  computed: {
    fromValueDate: {
      get() {
        return this.value?.from;
      },
      set(value) {
        this.$emit('change', { from: value, to: this.toValueDate });
      },
    },
    toValueDate: {
      get() {
        return this.value?.to;
      },
      set(value) {
        this.$emit('change', { from: this.fromValueDate, to: value });
      },
    },
    numberOfSelectedFilters() {
      let dateSelected = 0;
      if (this.fromValueDate && this.toValueDate) {
        dateSelected = 2;
      } else if (this.fromValueDate || this.toValueDate) {
        dateSelected = 1;
      }
      return dateSelected;
    },
    isDisabled() {
      return !this.numberOfSelectedFilters > 0;
    },
  },
  methods: {
    clear() {
      this.$emit('change', null);
    },
    onBlur() {
      this.$emit('blur', { from: this.fromValueDate, to: this.toValueDate });
    },
  },
};
</script>
<style>
.ec-date-range-filter {
  @apply tw-px-20 tw-py-16;

  &__to-input {
    @apply tw-pt-20;
  }

  &__error-text {
    @apply tw-help-text tw-text-error;
  }

  &__clear-button {
    @apply tw-pt-24;
    @apply tw-text-key-4;
    @apply tw-border-none;
    @apply tw-bg-transparent;

    &:disabled {
      @apply tw-text-gray-5;
      @apply tw-pointer-events-none;
    }

    &:hover {
      @apply tw-cursor-pointer;
    }

    &:focus {
      @apply tw-outline-none;
    }
  }
}
</style>
