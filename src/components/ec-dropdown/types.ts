import type { DropdownItem, DropdownSearchProps } from '../ec-dropdown-search/types';

export interface DropdownProps<TValue = string, TDropdownItem extends DropdownItem<TValue> = DropdownItem<TValue>> extends DropdownSearchProps<TValue, TDropdownItem> {
  selectedText?: string,
  searchPlaceholder?: string,
  id?: string,
  errorId?: string,
  label?: string,
  labelTooltip?: string,
  errorMessage?: string,
  isInGroup?: 'left' | 'right',
}
