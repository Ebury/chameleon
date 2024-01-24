import type { SortDirection, SortDirectionCycle } from '../../enums';

export interface Sorting {
  direction?: SortDirection,
  column: string,
}

export interface SortingOptions {
  initialSorts: Sorting[],
  isMultiSort: boolean,
  sortCycle: SortDirectionCycle,
}
