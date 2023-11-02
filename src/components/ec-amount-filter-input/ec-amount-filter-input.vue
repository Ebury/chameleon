<template>
  <div
    v-bind="{
      ...$attrs,
      'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-amount-filter-input` : 'ec-amount-filter-input',
    }"
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
      ref="popoverWidthReference"
      class="ec-amount-filter-input__inputs-group"
    >
      <ec-dropdown
        :id="id"
        v-model="comparisonSymbolModel"
        data-test="ec-amount-filter-input__comparison-symbol-selector"
        class="ec-amount-filter-input__comparison-symbol-selector"
        :class="{ 'ec-amount-filter-input__comparison-symbol-selector--is-focused': comparisonSymbolHasFocus }"
        is-in-group="right"
        :is-sensitive="isSensitive"
        :items="comparisonSymbolItems"
        :selected-text="comparisonSymbolModel.value"
        :popover-options="popoverOptions"
        :popover-style="getPopoverStyle"
        :error-id="errorId"
        :error-message="errorMessage"
        @focus="onComparisonSymbolFocus"
        @blur="comparisonSymbolHasFocus = false"
        @change="onComparisonSymbolChange"
        @open="emit('open')"
        @close="emit('close')"
        @after-open="emit('after-open')"
        @after-close="emit('after-close')"
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
        @focus="emit('focus')"
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
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

import VEcTooltip from '../../directives/ec-tooltip';
import { getUid } from '../../utils/uid';
import EcAmountInput from '../ec-amount-input';
import EcDropdown from '../ec-dropdown';
import EcIcon from '../ec-icon';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
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
  comparisonSymbolItems: {
    type: Array,
  },
});

const emit = defineEmits([
  'update:modelValue',
  'change',
  'amount-change',
  'comparison-symbol-change',
  'focus',
  'open',
  'close',
  'after-open',
  'after-close',
]);

const uid = getUid();
const id = computed(() => `ec-amount-filter-input-${uid}`);
const isInvalid = computed(() => !!props.errorMessage);
const errorId = computed(() => (isInvalid.value ? `ec-amount-filter-input-${uid}` : null));

// amount
const amountModel = computed({
  get() {
    return props.modelValue.amount;
  },
  set(value) {
    emit('update:modelValue', { ...props.modelValue, amount: value });
  },
});
function onAmountChange(evt) {
  emit('change', evt);
  emit('amount-change', evt);
}

// comparison
const comparisonSymbolHasFocus = ref(false);
const comparisonSymbolModel = computed({
  get() {
    if (props.modelValue.comparisonSymbol) {
      return props.modelValue.comparisonSymbol;
    }

    return {
      value: null,
      text: null,
    };
  },
  set(value) {
    emit('update:modelValue', { ...props.modelValue, comparisonSymbol: value });
  },
});
function onComparisonSymbolChange(evt) {
  comparisonSymbolHasFocus.value = true;
  emit('change', evt);
  emit('comparison-symbol-change', evt);
}
function onComparisonSymbolFocus() {
  comparisonSymbolHasFocus.value = true;
  emit('focus');
}

// popover
const popoverOptions = {
  autoSize: 'min',
};
const popoverWidthReference = ref(null);
function getPopoverStyle() {
  if (popoverWidthReference.value) {
    return {
      width: `${popoverWidthReference.value.offsetWidth}px`,
    };
  }
  return null;
}
</script>

<style>
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

  &__comparison-symbol-selector {
    width: 79px;

    @apply tw--mr-1;
    @apply tw-flex-shrink-0;
    @apply tw-text-center;
  }

  &__comparison-symbol-selector--is-focused {
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
}
</style>
