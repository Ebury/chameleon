import type { ComparisonSymbolItem } from '../ec-amount-filter-input/types';
import type { MultipleValuesSelectionItem } from '../ec-multiple-values-selection/types';
import type { PopoverProps } from '../ec-popover/types';

export interface CurrencyFilterModel {
  currencies?: CurrencyFilterItem[],
  comparisonSymbol?: ComparisonSymbolItem,
  amount?: number,
}

export interface CurrencyFilterItem extends MultipleValuesSelectionItem {}

export interface CurrencyFilterProps {
  label: string,
  popoverOptions?: PopoverProps,
  modelValue?: CurrencyFilterModel,
  currencyItems: CurrencyFilterItem[],
  isLoadingCurrencies?: boolean,
  currenciesEmptyMessage?: string,
  currenciesErrorMessage?: string,
  selectAllCurrenciesText?: string,
  currencyTabHeaderText?: string,
  comparisonSymbolItems: ComparisonSymbolItem[],
  amountTabHeaderText?: string,
  amountPlaceholder?: string,
  clearAmountText?: string,
  locale?: string,
  isSensitive?: boolean,
  errorMessage?: string,
}
