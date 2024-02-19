import { ref, unref } from 'vue';

import type { PageSize } from './types';

export const PAGE_SIZES = [5, 10, 50, 100] as const;
export const DEFAULT_PAGE_SIZE = 10;

export default function useEcPagination({
  initialPage = 1,
  initialNumberOfItems = DEFAULT_PAGE_SIZE,
}: Partial<{
  initialPage: number,
  initialNumberOfItems: PageSize,
}> = {}) {
  const page = ref(unref(initialPage));
  const numberOfItems = ref(unref(initialNumberOfItems));

  function paginate(newPage?: number, newNumberOfItems?: PageSize) {
    page.value = newPage ?? page.value;
    numberOfItems.value = newNumberOfItems ?? numberOfItems.value;
  }

  return {
    page,
    numberOfItems,
    paginate,
  };
}
