<template>
  <ec-filter-popover
    :label="label"
    :number-of-selected-filters="numberOfSelectedFilters"
    :popover-options="popoverOptions"
  >
    <template #filter>
      <div
        class="ec-date-range-filter"
        data-test="ec-date-range-filter"
      >
        <div class="ec-date-range-filter__inputs-wrapper">
          <ec-input-field
            v-model="fromValueDate"
            class="ec-date-range-filter__from-label"
            data-test="ec-date-range-filter__from-label"
            type="date"
            placeholder="dd/mm/yyyy"
            :label="fromLabelText"
            :error-message="errorMessage"
            :max="toValueDate"
          />
          <ec-input-field
            v-model="toValueDate"
            class="ec-date-range-filter__to-label"
            data-test="ec-date-range-filter__to-label"
            type="date"
            placeholder="dd/mm/yyyy"
            :label="toLabelText"
            :min="fromValueDate"
          />
        </div>
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
    errorMessage: {
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
        return this.value.from;
      },
      set(value) {
        this.$emit('change', { from: value, to: this.toValueDate });
      },
    },
    toValueDate: {
      get() {
        return this.value.to;
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
      this.$emit('clear');
    },
  },
};
</script>

<style>
.ec-date-range-filter {
  @apply tw-px-20 tw-py-16;

  &__to-label {
    @apply tw-pt-20;
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
  }
}
</style>
