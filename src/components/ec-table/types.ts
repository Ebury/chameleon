import type { StickyColumnPosition, TableHeadColumn, TableHeadSort } from '../ec-table-head/types';

export { StickyColumnPosition, TableHeadColumn, TableHeadSort };

export interface TableProps {
  columns?: TableHeadColumn[],
  sorts?: TableHeadSort[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[],
  totalRecords?: number,
  maxHeight?: string,
  stickyColumn?: StickyColumnPosition,
  title?: string,
  isCustomRowShown?: boolean,
  isTableHeaderHidden?: boolean
}
