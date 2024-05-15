import type { DropdownSearchItem, DropdownSearchProps } from '../ec-dropdown-search/types';

export interface DropdownItem<TValue = string> extends DropdownSearchItem<TValue> {}

export interface DropdownProps<TValue = string, TDropdownItem extends DropdownItem<TValue> = DropdownItem<TValue>> extends DropdownSearchProps<TValue, TDropdownItem> {
  selectedText?: string,
  searchPlaceholder?: string,
  id?: string,
  errorId?: string,
  label?: string,
  labelTooltip?: string,
  errorMessage?: string,
  isInGroup?: 'left' | 'right',
  isInLightMode?: boolean,
}
