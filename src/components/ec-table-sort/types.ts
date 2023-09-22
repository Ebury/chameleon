import type { SortDirection } from '../../enums/sort-direction';

export type SortDirectionType = SortDirection | '' | null;

export enum TableSortEvent {
  SORT = 'sort',
}

export interface TableSortEvents {
  [TableSortEvent.SORT]: SortDirectionType,
}

export interface TableSortProps {
  direction?: SortDirectionType,
}
