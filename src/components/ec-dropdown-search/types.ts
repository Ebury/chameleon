import type { StyleValue } from 'vue';

import type { TooltipOptions } from '../../directives/ec-tooltip/types';
import type { ZIndexLevel } from '../../enums';
import type { PopoverProps } from '../ec-popover/types';

export interface DropdownSearchItem<TValue = string> {
  text?: string,
  value?: TValue,
  disabled?: boolean,
  disabledReason?: string,
  id?: string | number | symbol,
  tooltip?: TooltipOptions,
}

export interface DropdownSearchProps<TValue = string, TDropdownSearchItem extends DropdownSearchItem<TValue> = DropdownSearchItem<TValue>> {
  placeholder?: string,
  level?: ZIndexLevel,
  isSearchEnabled?: boolean,
  isCustomSearchEnabled?: boolean,
  isSensitive?: boolean,
  items?: TDropdownSearchItem[],
  searchFields?: ReadonlyArray<keyof TDropdownSearchItem>,
  modelValue?: TDropdownSearchItem,
  popoverOptions?: Partial<PopoverProps>,
  popoverStyle?: StyleValue | (() => StyleValue | undefined),
  tooltipOptions?: TooltipOptions,
  maxVisibleItems?: number,
  disabled?: boolean,
  isLoading?: boolean,
  noResultsText?: string,
  tooltipCta?: string,
  trapFocus?: boolean,
}
