import { ref } from 'vue';

import { SortDirection, SortDirectionCycle } from '../../enums';
import type { SortingOptions } from './types';

export default function useEcSorting({
  initialSorts = [],
  isMultiSort = false,
  sortCycle: defaultSortCycle = SortDirectionCycle.LOWEST_FIRST,
}: SortingOptions) {
  const sorts = ref(initialSorts);

  function sortBy({ name: columnName, sortCycle = defaultSortCycle }: { name: string, sortCycle?: SortDirectionCycle }) {
    const existingSort = sorts.value.find(sort => sort.column === columnName);
    if (existingSort) {
      existingSort.direction = nextDirection(existingSort.direction, sortCycle);
      if (!existingSort.direction) {
        sorts.value = sorts.value.filter(sort => sort !== existingSort);
      } else {
        sorts.value = [...sorts.value];
      }
    } else if (isMultiSort) {
      sorts.value = [...sorts.value, { column: columnName, direction: nextDirection(undefined, sortCycle) }];
    } else {
      sorts.value = [{ column: columnName, direction: nextDirection(undefined, sortCycle) }];
    }
  }

  return {
    sorts,
    sortBy,
  };
}

const sortDirections = {
  [SortDirectionCycle.LOWEST_FIRST]: [SortDirection.ASC, SortDirection.DESC] as const,
  [SortDirectionCycle.HIGHEST_FIRST]: [SortDirection.DESC, SortDirection.ASC] as const,
};

function nextDirection(current: SortDirection | undefined, sortCycle: SortDirectionCycle) : SortDirection | undefined {
  let nextDirectionIndex = 0;
  if (current) {
    nextDirectionIndex = sortDirections[sortCycle].indexOf(current) + 1;
  }
  return sortDirections[sortCycle][nextDirectionIndex];
}
