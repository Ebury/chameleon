import type { MultipleValuesSelectionItem } from '../ec-multiple-values-selection/types';
import type { PopoverProps } from '../ec-popover/types';

export interface SyncMultipleValuesFilterProps {
  label: string,
  modelValue?: MultipleValuesSelectionItem[],
  items: MultipleValuesSelectionItem[],
  isLoading?: boolean,
  errorMessage?: string,
  emptyMessage?: string,
  isSearchable?: boolean,
  isSelectAll?: boolean,
  selectAllFiltersText?: string,
  popoverOptions?: PopoverProps,
  searchFilterPlaceholder?: string,
  isFullHeight?: boolean,
  hasRoundedIcons?: boolean,
}
