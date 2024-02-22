<template>
  <div class="ec-currency-input">

    <label
      v-if="label || note"
      class="ec-currency-input__label"
      :for="id"
    >
      <span
        v-if="label"
        :data-test="prefixedDataTest('label-text')"
        class="ec-currency-input__label-text"
      >{{ label }}</span>

      <span
        v-if="note"
        :data-test="prefixedDataTest('note')"
        class="ec-currency-input__note"
      >{{ note }}</span>
    </label>

    <div
      ref="popoverWidthReference"
      class="ec-currency-input__input-group"
    >
      <div
        v-if="isCurrenciesDisabled"
        v-ec-tooltip="currenciesTooltipOptions"
        class="ec-currency-input__currencies ec-currency-input__currencies--is-disabled"
        :class="{ 'ec-currency-input__currencies--is-disabled-and-has-error': errorMessage }"
        :data-test="prefixedDataTest('currencies')"
      >{{ currencyModel && currencyModel.text }}</div>
      <ec-dropdown
        :id="id"
        v-else
        v-model="currencyModel"
        :class="{ 'ec-currency-input__currencies--is-focused': currenciesHasFocus }"
        :error-id="errorId"
        :items="currenciesItems"
        :popover-options="{ autoSize: 'min' }"
        :popover-style="getPopoverStyle"
        :search-placeholder="searchCurrencyPlaceholder"
        :no-results-text="noCurrenciesText"
        class="ec-currency-input__currencies"
        is-in-group="right"
        is-search-enabled
        :is-loading="currenciesAreLoading"
        :is-sensitive="isSensitive"
        :error-message="errorMessage"
        :data-test="prefixedDataTest('currencies')"
        :list-data-test="prefixedDataTest('currencies-list')"
        @focus="onFocusCurrency"
        @blur="currenciesHasFocus = false"
        @change="onCurrencyChange"
        @open="emit('open')"
        @after-open="emit('after-open')"
      />
      <ec-amount-input
        v-model="amountModel"
        :locale="locale"
        :currency="modelValue?.currency"
        :error-id="errorId"
        :error-message="errorMessage"
        :disabled="isAmountDisabled"
        :is-sensitive="isSensitive"
        :placeholder="amountPlaceholder"
        is-in-group="left"
        class="ec-currency-input__amount"
        :data-test="prefixedDataTest('amount')"
        @change="onAmountChange"
        @focus="emit('focus')"
      />
    </div>

    <div
      :id="errorId"
      v-if="errorMessage"
      :data-test="prefixedDataTest('error-text')"
      class="ec-currency-input__error-text"
    >
      <span>{{ errorMessage }}</span>
      <ec-icon
        v-if="errorMessage && errorTooltipMessage"
        v-ec-tooltip="{ content: errorTooltipMessage }"
        class="ec-currency-input__error-tooltip"
        :data-test="prefixedDataTest('error-tooltip')"
        :type="IconType.ERROR"
        :name="IconName.SIMPLE_ERROR"
        :size="14"
      />
    </div>

    <div
      v-else-if="bottomNote"
      :data-test="prefixedDataTest('bottom-note')"
      class="ec-currency-input__bottom-note"
      :class="{ 'ec-currency-input__bottom-note--is-warning': isWarning }"
    >
      <span>{{ bottomNote }}</span>
      <ec-icon
        v-if="isWarning && warningTooltipMessage"
        v-ec-tooltip="{ content: warningTooltipMessage }"
        class="ec-currency-input__warning-tooltip"
        :data-test="prefixedDataTest('warning-tooltip')"
        :type="IconType.WARNING"
        :name="IconName.SIMPLE_ERROR"
        :size="14"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StyleValue } from 'vue';
import { computed, ref, useAttrs } from 'vue';

import vEcTooltip from '../../directives/ec-tooltip';
import { type TooltipOptions, TooltipPlacement } from '../../directives/ec-tooltip/types';
import { getUid } from '../../utils/uid';
import EcAmountInput from '../ec-amount-input';
import EcDropdown from '../ec-dropdown';
import EcIcon from '../ec-icon';
import { IconName, IconType } from '../ec-icon/types';
import type { CurrencyInputCurrencyItem, CurrencyInputModel, CurrencyInputProps } from './types';

const props = withDefaults(defineProps<CurrencyInputProps>(), {
  locale: 'en',
  currencies: () => [],
  searchCurrencyPlaceholder: 'Search...',
  noCurrenciesText: 'No results found',
});

const emit = defineEmits<{
  'update:modelValue': [value: CurrencyInputModel | undefined],
  'change': [],
  'focus': [],
  'amount-change': [event: Event],
  'currency-change': [item: CurrencyInputCurrencyItem | undefined],
  'open': [],
  'after-open': [],
}>();

// ids
const uid = getUid();
const errorId = computed(() => (props.errorMessage ? `ec-currency-input-field-${uid}` : undefined));
const id = `ec-currency-input-field-${uid}`;

// popover
const popoverWidthReference = ref<HTMLDivElement>();
function getPopoverStyle(): StyleValue | undefined {
  if (popoverWidthReference.value) {
    return {
      width: `${popoverWidthReference.value.offsetWidth}px`,
    };
  }

  return undefined;
}

const currenciesItems = computed(() => props.currencies.map<CurrencyInputCurrencyItem>(currency => ({ text: currency, value: currency, id: currency })));

// models
const currencyModel = computed({
  get() {
    return currenciesItems.value.find(item => item.value === props.modelValue?.currency);
  },
  set(item: CurrencyInputCurrencyItem | undefined) {
    emit('update:modelValue', { ...props.modelValue, currency: item?.value });
  },
});

const amountModel = computed({
  get() {
    return props.modelValue?.amount;
  },
  set(value: number | undefined) {
    emit('update:modelValue', { ...props.modelValue, amount: value });
  },
});

// focus
const currenciesHasFocus = ref(false);
function onFocusCurrency() {
  currenciesHasFocus.value = true;
  emit('focus');
}

// onChange
function onAmountChange(evt: Event) {
  emit('change');
  emit('amount-change', evt);
}

function onCurrencyChange(item: CurrencyInputCurrencyItem | undefined) {
  currenciesHasFocus.value = true;
  emit('change');
  emit('currency-change', item);
}

// attributes
const attrs = useAttrs();

function prefixedDataTest(dataTestSuffix: string): string {
  const dataTestPrefix = attrs['data-test'] as string | undefined;
  if (dataTestPrefix) {
    const dataTestPrefixes = [...dataTestPrefix.split(' '), 'ec-currency-input'];
    return dataTestPrefixes.map(dataTest => `${dataTest}__${dataTestSuffix}`).join(' ');
  }

  return `ec-currency-input__${dataTestSuffix}`;
}

const currenciesTooltipOptions = computed<TooltipOptions>(() => {
  const { content, placement = TooltipPlacement.TOP }: TooltipOptions = props.disabledCurrenciesTooltip || {};
  if (!content) {
    return {};
  }
  return { content, placement };
});
</script>

<style>
:root,
:host {
  --ec-currency-input-currencies-width: 104px;
}

.ec-currency-input {
  @apply tw-z-0; /* When currencies dropdown is focused, it gets a high z-index. We set the index here of the whole component to 0 so we eliminate the chance of competing with other components */

  &__input-group {
    @apply tw-flex tw-flex-row;
  }

  &__currencies {
    width: var(--ec-currency-input-currencies-width);

    @apply tw--mr-1;
    @apply tw-flex-shrink-0;

    &--is-disabled {
      @apply tw-rounded;
      @apply tw-w-auto;
      @apply tw-flex-grow-0;
      @apply tw-min-w-48;
      @apply tw-py-8 tw-px-12;
      @apply tw-border tw-border-solid tw-border-gray-6;
      @apply tw-rounded-r-none;
      @apply tw-bg-gray-6;

      max-width: var(--ec-currency-input-currencies-width);
    }

    &--is-disabled-and-has-error {
      @apply tw-border tw-border-solid tw-border-error;
    }
  }

  &__currencies--is-focused {
    @apply tw-z-level-1;
  }

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

  &__error-text {
    @apply tw-flex tw-items-start;
    @apply tw-help-text tw-text-error;
    @apply tw-mt-4;
  }

  &__bottom-note {
    @apply tw-flex tw-items-start;
    @apply tw-help-text;
    @apply tw-mt-4;

    &--is-warning {
      @apply tw-text-warning-dark;
    }
  }

  &__error-tooltip,
  &__warning-tooltip {
    @apply tw-flex-shrink-0;
    @apply tw-ml-1 tw-mt-1;
    @apply tw-outline-none;
  }
}
</style>
