import type { PageSize } from '../../composables/use-ec-pagination/types';
import type { Sorting } from '../../composables/use-ec-sorting/types';
import type { SortDirectionCycle } from '../../enums';
import type { TableProps } from '../ec-table/types';
import type { TableFilter } from '../ec-table-filter/types';

export type * from '../ec-smart-table-heading/types';
export type * from '../ec-table-pagination/types';

export interface SmartTableFetchPayload {
  page: number,
  numberOfItems: PageSize,
  sorts: Sorting[],
  filter: object,
}

export interface SmartTablePagination {
  page: number,
  numberOfItems: PageSize,
}

export interface SmartTableProps<TRow extends ReadonlyArray<unknown>, TAdditionalPayload = never> extends TableProps<TRow> {
  errorMessage?: string,
  emptyMessage?: string,
  clearFiltersButtonText?: string,
  itemsPerPageText?: string,
  pagination?: SmartTablePagination,
  isPaginationEnabled?: boolean,
  filters?: TableFilter<unknown>[],
  filter?: Record<string, unknown>,
  isMultiSort?: boolean,
  sortCycle?: SortDirectionCycle,
  additionalPayload?: TAdditionalPayload,
  isFetching?: boolean,
  error?: Error | Record<string, unknown> | string,
  isCustomRowShown?: boolean,
  isClearFiltersButtonHidden?: boolean,
  isPageSizeHidden?: boolean,
  isTotalHidden?: boolean,
  isResponsive?: boolean,
  isInfiniteScrollEnabled?: boolean,
}
