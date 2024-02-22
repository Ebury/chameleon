import type { DropdownItem } from '../ec-dropdown/types';

export interface ComparisonSymbolItem extends DropdownItem<string> {}

export interface AmountFilterInputModel {
  amount?: number,
  comparisonSymbol?: ComparisonSymbolItem,
}

export interface AmountFilterInputProps {
  modelValue: AmountFilterInputModel,
  locale?: string,
  isSensitive?: boolean,
  label?: string,
  note?: string,
  amountPlaceholder?: string,
  bottomNote?: string,
  isWarning?: boolean,
  warningTooltipMessage?: string,
  errorMessage?: string,
  errorTooltipMessage?: string,
  comparisonSymbolItems: ComparisonSymbolItem[],
}
