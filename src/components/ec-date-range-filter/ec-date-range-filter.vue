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
        <div
          class="ec-date-range-filter__inputs-wrapper"
          data-test="ec-date-range-filter__inputs-wrapper"
        >
          <ec-input-field
            v-model="fromValueDate"
            class="ec-date-range-filter__from-label"
            type="date"
            placeholder="DD/MM/YYYY"
            :label="fromLabelText"
            :error-message="errorMessageFromDate"
            @change="onChange()"
            @input="errorMessageFromDate = ''"
          />
          <ec-input-field
            v-model="toValueDate"
            class="ec-date-range-filter__to-label"
            type="date"
            placeholder="DD/MM/YYYY"
            :label="toLabelText"
            @change="onChange()"
            @input="errorMessageFromDate = ''"
          />
        </div>
        <button
          type="button"
          :disabled="isDisabled"
          class="ec-date-range-filter__clear-button"
          data-test="ec-date-range-filter__clear-button"
          @click="clearDates()"
        >Clear Dates</button>
      </div>
    </template>
  </ec-filter-popover>
</template>

<script>
import EcInputField from '../ec-input-field';
import ecFilterPopover from '../ec-filter-popover';

export default {
  name: 'EcDateRangeFilter',
  components: { ecFilterPopover, EcInputField },
  props: {
    label: {
      type: String,
      required: true,
      default: '',
    },
    value: { // Check we actually need this
      type: [Number, String, Date],
      required: false,
      default: '',
    },
    fromLabelText: {
      type: String,
      required: true,
      default: 'From',
    },
    toLabelText: {
      type: String,
      required: true,
      default: 'To',
    },
    errorMessage: {
      type: String,
      required: false,
      default: 'From date must not be later than the to date',
    },
    popoverOptions: {
      type: Object,
    },
  },
  data() {
    return {
      fromValueDate: '', // Check that this format is ok
      toValueDate: '',
      errorMessageFromDate: '',
    };
  },
  computed: {
    numberOfSelectedFilters() {
      let dateSelected = 0;

      if (this.fromValueDate && this.toValueDate !== '') {
        dateSelected = 2;
      } else if (this.fromValueDate || this.toValueDate !== '') {
        dateSelected = 1;
      }
      return dateSelected;
    },
    isDisabled() {
      return !this.numberOfSelectedFilters > 0;
    },
  },
  methods: {
    onChange() {
      this.validateFromDate();
    },
    clearDates() {
      this.fromValueDate = '';
      this.toValueDate = '';
      this.errorMessageFromDate = '';
    },
    validateFromDate() {
      const fromValueDate = new Date(this.fromValueDate);
      const toValueDate = new Date(this.toValueDate);
      const isfromDateInvalid = fromValueDate >= toValueDate;

      if (isfromDateInvalid) {
        this.errorMessageFromDate = this.errorMessage;
        return this.errorMessageFromDate;
      }
      return this.$emit('change', { from: this.fromValueDate, to: this.toValueDate });
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

