import type { TableHeadColumn, TableHeadSort } from '../ec-table-head/types';
import { StickyColumnPosition } from '../ec-table-head/types';

export type { TableHeadColumn, TableHeadSort };
export { StickyColumnPosition };

export interface TableProps<TRow extends ReadonlyArray<unknown>> {
  columns?: TableHeadColumn[],
  sorts?: TableHeadSort[],
  data?: TRow[],
  totalRecords?: number,
  maxHeight?: string,
  stickyColumn?: StickyColumnPosition,
  title?: string,
  isCustomRowShown?: boolean,
  isTableHeaderHidden?: boolean,
  isMultiSelectEnabled?: boolean,
  selectedItems?: string[],
  allItemsSelected?: boolean,
  isSelectableCheck?: (itemId: string) => boolean,
}
