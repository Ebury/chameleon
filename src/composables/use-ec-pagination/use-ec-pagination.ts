import { ref, unref } from 'vue';

export const PAGE_SIZES = [5, 10, 50, 100];
export const DEFAULT_PAGE_SIZE = 10;

export default function useEcPagination({
  initialPage = 1,
  initialNumberOfItems = DEFAULT_PAGE_SIZE,
}: Partial<{
  initialPage: number,
  initialNumberOfItems: number,
}> = {}) {
  if (!PAGE_SIZES.includes(initialNumberOfItems)) {
    throw new Error(`Invalid number of items: ${initialNumberOfItems}. Expecting one of: ${PAGE_SIZES}`);
  }

  const page = ref(unref(initialPage));
  const numberOfItems = ref(unref(initialNumberOfItems));

  function paginate(newPage?: number, newNumberOfItems?: number) {
    page.value = newPage ?? page.value;
    numberOfItems.value = newNumberOfItems ?? numberOfItems.value;
  }

  return {
    page,
    numberOfItems,
    paginate,
  };
}
