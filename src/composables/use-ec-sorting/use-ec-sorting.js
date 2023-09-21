import { ref, unref } from 'vue';

import { SortDirection } from '../../enums/sort-direction';
import * as SortDirectionCycle from '../../enums/sort-direction-cycle';

export default function useEcSorting({
  initialSorts = [],
  isMultiSort = false,
  sortCycle: defaultSortCycle,
} = {}) {
  // eslint-disable-next-line no-param-reassign
  defaultSortCycle = unref(defaultSortCycle ?? SortDirectionCycle.LOWEST_FIRST);
  // eslint-disable-next-line no-param-reassign
  isMultiSort = unref(isMultiSort);

  if (!isValidSortCycle(defaultSortCycle)) {
    throw new Error(`Invalid sortCycle: ${defaultSortCycle}`);
  }

  const sorts = ref(unref(initialSorts));

  function sortBy({ name: columnName, sortCycle = defaultSortCycle }) {
    const existingSort = sorts.value.find(sort => sort.column === columnName);
    if (existingSort) {
      existingSort.direction = nextDirection(existingSort.direction, sortCycle);
      if (!existingSort.direction) {
        sorts.value = sorts.value.filter(sort => sort !== existingSort);
      } else {
        sorts.value = [...sorts.value];
      }
    } else if (isMultiSort) {
      sorts.value = [...sorts.value, { column: columnName, direction: sortCycle[0] }];
    } else {
      sorts.value = [{ column: columnName, direction: sortCycle[0] }];
    }
  }

  return {
    sorts,
    sortBy,
  };
}

function nextDirection(current, sortCycle) {
  const nextDirectionIndex = sortCycle.indexOf(current) + 1;
  return sortCycle[nextDirectionIndex];
}

function isValidSortCycle(sortCycle) {
  return !sortCycle || sortCycle.every(direction => direction === SortDirection.ASC || direction === SortDirection.DESC);
}
