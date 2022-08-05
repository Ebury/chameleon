import { ref, unref } from 'vue';

import { DEFAULT_PAGE_SIZE, PAGE_SIZES } from '../../enums/pagination';

export default function useEcPagination({
  initialPage = 1,
  initialNumberOfItems = DEFAULT_PAGE_SIZE,
} = {}) {
  if (!PAGE_SIZES.includes(initialNumberOfItems)) {
    throw new Error(`Invalid number of items: ${initialNumberOfItems}. Expecting one of: ${PAGE_SIZES}`);
  }

  const page = ref(unref(initialPage));
  const numberOfItems = ref(unref(initialNumberOfItems));

  function paginate(newPage, newNumberOfItems) {
    page.value = newPage ?? page.value;
    numberOfItems.value = newNumberOfItems ?? numberOfItems.value;
  }

  return {
    page,
    numberOfItems,
    paginate,
  };
}
