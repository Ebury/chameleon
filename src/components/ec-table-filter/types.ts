import { type Raw } from 'vue';
import type { ComponentProps } from 'vue-component-type-helpers';

export type TableFilter<TComponent> = ComponentProps<TComponent> & {
  name: string,
  component: Raw<TComponent>,
  isFullWidth?: boolean,
  isHidden?: boolean,
  stretch?: boolean,
};

export interface TableFilterProps {
  modelValue?: Record<string, unknown>,
  filters: TableFilter<unknown>[],
  lessFiltersButtonText?: string,
  moreFiltersButtonText?: string,
  clearFiltersButtonText?: string,
  isClearFiltersButtonHidden?: boolean,
  hasStretchFilter?: boolean,
}
