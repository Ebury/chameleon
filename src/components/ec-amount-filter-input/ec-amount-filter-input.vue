<template>
  <div
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-amount-filter-input` : 'ec-amount-filter-input'"
    class="ec-amount-filter-input"
  >
    <label
      v-if="label || note"
      class="ec-amount-filter-input__label"
      :for="id"
    >
      <span
        v-if="label"
        data-test="ec-amount-filter-input__label-text"
        class="ec-amount-filter-input__label-text"
      >{{ label }}</span>

      <span
        v-if="note"
        data-test="ec-amount-filter-input__note"
        class="ec-amount-filter-input__note"
      >{{ note }}</span>
    </label>

    <div
      ref="popperWidthReference"
      class="ec-amount-filter-input__inputs-group"
    >
      <ec-dropdown
        :id="id"
        v-model="filterModel"
        data-test="ec-amount-filter-input__filter-selector"
        class="ec-amount-filter-input__filter-selector"
        :class="{ 'ec-amount-filter-input__filter-selector--is-focused': filtersHasFocus }"
        is-in-group="right"
        :is-sensitive="isSensitive"
        :items="filterItems"
        :selected-text="filterModel.value"
        :popper-modifiers="popperModifier"
        :popover-options="popoverOptions"
        :error-id="errorId"
        :error-message="errorMessage"
        @focus="onFilterFocus"
        @blur="filtersHasFocus = false"
        @change="onFilterChange"
        @open="$emit('open')"
        @after-open="$emit('after-open')"
      />

      <ec-amount-input
        v-model="amountModel"
        data-test="ec-amount-filter-input__amount"
        class="ec-amount-filter-input__amount"
        is-in-group="left"
        :locale="locale"
        :is-sensitive="isSensitive"
        :error-id="errorId"
        :error-message="errorMessage"
        :placeholder="amountPlaceholder"
        @change="onAmountChange"
        @focus="$emit('focus')"
      />
    </div>

    <div
      :id="errorId"
      v-if="isInvalid"
      data-test="ec-amount-filter-input__error-text"
      class="ec-amount-filter-input__error-text"
    >
      <span>{{ errorMessage }}</span>

      <ec-icon
        v-if="isInvalid && errorTooltipMessage"
        v-ec-tooltip="{ content: errorTooltipMessage }"
        class="ec-amount-filter-input__error-tooltip"
        data-test="ec-amount-filter-input__error-tooltip"
        type="error"
        name="simple-error"
        :size="14"
      />
    </div>

    <div
      v-else-if="bottomNote"
      data-test="ec-amount-filter-input__bottom-note"
      class="ec-amount-filter-input__bottom-note"
      :class="{ 'ec-amount-filter-input__bottom-note--is-warning': isWarning }"
    >
      <span>{{ bottomNote }}</span>

      <ec-icon
        v-if="isWarning && warningTooltipMessage"
        v-ec-tooltip="{ content: warningTooltipMessage }"
        class="ec-amount-filter-input__warning-tooltip"
        data-test="ec-amount-filter-input__warning-tooltip"
        type="warning"
        name="simple-error"
        :size="14"
      />
    </div>

    <button
      data-test="ec-amount-filter-input__clear-amount"
      class="ec-amount-filter-input__clear-amount"
      :class="{'ec-amount-filter-input__clear-amount--disabled': !value.amount }"
      :disabled="!value.amount"
      @click="onClearAmount"
    >
      {{ clearAmountButtonText }}
    </button>
  </div>
</template>

<script>
import EcAmountInput from '../ec-amount-input';
import EcDropdown from '../ec-dropdown';
import EcIcon from '../ec-icon';
import EcTooltip from '../../directives/ec-tooltip';
import { getUid } from '../../utils/uid';

export default {
  name: 'EcAmountFilterInput',
  components: {
    EcAmountInput,
    EcDropdown,
    EcIcon,
  },
  directives: { EcTooltip },
  model: {
    prop: 'value',
    event: 'value-change',
  },
  props: {
    value: {
      type: Object,
    },
    locale: {
      type: String,
      default: 'en',
    },
    isSensitive: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
    note: {
      type: String,
    },
    amountPlaceholder: {
      type: String,
    },
    bottomNote: {
      type: String,
    },
    isWarning: {
      type: Boolean,
      default: false,
    },
    warningTooltipMessage: {
      type: String,
    },
    errorMessage: {
      type: String,
    },
    errorTooltipMessage: {
      type: String,
    },
    comparisonSymbols: {
      type: Array,
    },
    clearAmountButtonText: {
      type: String,
      default: 'Clear amount',
    },
  },
  data() {
    return {
      uid: getUid(),
      filtersHasFocus: false,
      popperModifier: {
        setPopperWidth: {
          enabled: true,
          order: 841,
          fn: /* istanbul ignore next */ (data) => {
            data.styles.width = this.$refs.popperWidthReference.offsetWidth;
            return data;
          },
        },
      },
      popoverOptions: {
        placement: 'bottom-end',
      },
    };
  },
  computed: {
    id() {
      return `ec-amount-filter-input-${this.uid}`;
    },
    errorId() {
      return this.isInvalid ? `ec-amount-filter-input-${this.uid}` : null;
    },
    isInvalid() {
      return !!this.errorMessage;
    },
    filterItems() {
      return this.comparisonSymbols.map(symbol => ({ text: symbol.text, value: symbol.value }));
    },
    filterModel: {
      get() {
        if (this.value.filter) {
          return this.value.filter;
        }

        return {
          value: null,
          text: null,
        };
      },
      set(value) {
        this.$emit('value-change', { ...this.value, filter: value });
      },
    },
    amountModel: {
      get() {
        return this.value.amount;
      },
      set(value) {
        this.$emit('value-change', { ...this.value, amount: value });
      },
    },
  },
  methods: {
    onClearAmount() {
      this.amountModel = null;
      this.$emit('amount-cleared');
    },
    onAmountChange(evt) {
      this.$emit('change', evt);
      this.$emit('amount-change', evt);
    },
    onFilterChange(evt) {
      this.filtersHasFocus = true;
      this.$emit('change', evt);
      this.$emit('filter-change', evt);
    },
    onFilterFocus() {
      this.filtersHasFocus = true;
      this.$emit('focus');
    },
  },
};
</script>

<style>
:root {
  --ec-amount-filter-input-filter-width: 79px;
}

.ec-amount-filter-input {
  &__label {
    @apply tw-flex tw-flex-wrap;
  }

  &__label-text {
    @apply tw-input-label;
    @apply tw-flex-grow;
    @apply tw-mr-8;
  }

  &__note {
    @apply tw-caption-text;
  }

  &__inputs-group {
    @apply tw-flex tw-flex-row;
  }

  &__filter-selector {
    width: var(--ec-amount-filter-input-filter-width);

    @apply tw--mr-1;
    @apply tw-flex-shrink-0;
    @apply tw-text-center;
  }

  &__filter-selector--is-focused {
    @apply tw-z-level-1;
  }

  &__bottom-note {
    @apply tw-flex tw-items-start;
    @apply tw-help-text;
    @apply tw-mt-4;

    &--is-warning {
      @apply tw-text-warning-dark;
    }
  }

  &__error-text {
    @apply tw-flex tw-items-start;
    @apply tw-help-text tw-text-error;
    @apply tw-mt-4;
  }

  &__error-tooltip,
  &__warning-tooltip {
    @apply tw-flex-shrink-0;
    @apply tw-ml-1 tw-mt-1;
    @apply tw-outline-none;
  }

  &__clear-amount {
    @apply tw-text-key-4;
    @apply tw-border-none;
    @apply tw-bg-transparent;
    @apply tw-px-0;
    @apply tw-mt-24;
    @apply tw-cursor-pointer;

    &--disabled {
      @apply tw-text-gray-4;
      @apply tw-pointer-events-none;
    }
  }
}
</style>
