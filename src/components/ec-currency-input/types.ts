import type { TooltipOptions } from '../../directives/ec-tooltip/types';
import type { DropdownItem } from '../ec-dropdown/types';

export interface CurrencyInputCurrencyItem extends DropdownItem<string> {}

export interface CurrencyInputModel {
  amount?: number,
  currency?: string,
}

export interface CurrencyInputProps {
  modelValue?: CurrencyInputModel,
  locale?: string,
  label?: string,
  note?: string,
  bottomNote?: string,
  warningTooltipMessage?: string,
  isWarning?: boolean,
  errorMessage?: string,
  errorTooltipMessage?: string,
  currencies?: string[],
  currenciesAreLoading?: boolean,
  disabledCurrenciesTooltip?: TooltipOptions,
  isCurrenciesDisabled?: boolean,
  isAmountDisabled?: boolean,
  isSensitive?: boolean,
  amountPlaceholder?: string,
  searchCurrencyPlaceholder?: string,
  noCurrenciesText?: string,
}
