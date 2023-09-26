import type { SortDirection } from '../../enums';

export interface TableHeadColumn {
  name?: string,
  title?: string,
  sortable?: true,
  minWidth?: string,
  maxWidth?: string,
  tooltip?: string,
  type?: string,
  span?: number,
}

export interface TableHeadSort {
  direction?: SortDirection,
  column?: string,
}

export enum StickyColumnPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

export interface TableHeadProps {
  columns?: TableHeadColumn[],
  sorts?: TableHeadSort[],
  stickyColumn?: StickyColumnPosition,
}

export enum TableHeadEvent {
  SORT = 'sort',
}

export interface TableHeadEvents {
  [TableHeadEvent.SORT]: TableHeadColumn,
}
