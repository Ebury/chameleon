import type { IconName, IconType } from '../ec-icon/types';

export interface MultipleValuesSelectionItem {
  text: string,
  value: string | number,
  icon?: { name: IconName, type?: IconType },
}

export interface MultipleValuesSelectionProps {
  items: MultipleValuesSelectionItem[],
  modelValue?: MultipleValuesSelectionItem[],
  isLoading?: boolean,
  errorMessage?: string,
  errorIcon?: IconName,
  emptyMessage?: string,
  emptyIcon?: IconName,
  isSearchable?: boolean,
  isSelectAll?: boolean,
  selectAllFiltersText?: string,
  searchFilterPlaceholder?: string,
  hasRoundedIcons?: boolean,
}
