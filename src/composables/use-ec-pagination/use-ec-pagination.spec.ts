import useEcPagination, { DEFAULT_PAGE_SIZE, PAGE_SIZES } from './use-ec-pagination';

describe('useEcPagination', () => {
  it('should initialise properly', () => {
    const { page, numberOfItems } = useEcPagination();

    expect(page.value).toBe(1);
    expect(numberOfItems.value).toBe(DEFAULT_PAGE_SIZE);
  });

  it('should initialise with given options', () => {
    const { page, numberOfItems } = useEcPagination({
      initialPage: 42,
      initialNumberOfItems: 5,
    });

    expect(page.value).toBe(42);
    expect(numberOfItems.value).toBe(5);
  });

  it('should throw an error if number of items is invalid', () => {
    expect(() => {
      useEcPagination({
        initialNumberOfItems: 42,
      });
    }).toThrow(`Invalid number of items: 42. Expecting one of: ${PAGE_SIZES}`);
  });

  it('should update the pagination when paginate is called', () => {
    const { page, numberOfItems, paginate } = useEcPagination();

    paginate(5, 20);
    expect(page.value).toBe(5);
    expect(numberOfItems.value).toBe(20);
  });

  it('should ignore undefined values when paginate call updates only the page', () => {
    const { page, numberOfItems, paginate } = useEcPagination();

    paginate(42, undefined);
    expect(page.value).toBe(42);
    expect(numberOfItems.value).toBe(10);
  });

  it('should ignore undefined values when paginate call updates only the number of items', () => {
    const { page, numberOfItems, paginate } = useEcPagination();

    paginate(undefined, 42);
    expect(page.value).toBe(1);
    expect(numberOfItems.value).toBe(42);
  });
});
