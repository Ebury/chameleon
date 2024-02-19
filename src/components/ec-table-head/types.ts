import type { Sorting } from '../../composables/use-ec-sorting/types';
import type { SortDirectionCycle } from '../../enums';

export interface TableHeadColumn {
  name?: string,
  title?: string,
  sortable?: boolean,
  minWidth?: string,
  maxWidth?: string,
  tooltip?: string,
  type?: string,
  span?: number,
  sortCycle?: SortDirectionCycle
}

export interface TableHeadSort extends Sorting {}

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
