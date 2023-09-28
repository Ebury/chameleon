import type { StickyColumnPosition, TableHeadColumn, TableHeadSort } from '../ec-table-head/types';

export { StickyColumnPosition, TableHeadColumn, TableHeadSort };

export interface TableProps {
  columns?: TableHeadColumn[],
  sorts?: TableHeadSort[],
  data?: unknown[],
  totalRecords?: number,
  maxHeight?: string,
  stickyColumn?: StickyColumnPosition,
  title?: string,
  isCustomRowShown?: boolean,
  isTableHeaderHidden?: boolean
}

export enum TableEvent {
  SORT = 'sort',
}

export interface TableEvents {
  [TableEvent.SORT]: TableHeadColumn,
}
