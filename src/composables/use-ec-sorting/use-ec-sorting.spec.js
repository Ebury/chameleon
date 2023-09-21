import { SortDirection } from '../../enums/sort-direction';
import * as SortDirectionCycle from '../../enums/sort-direction-cycle';
import useEcSorting from './use-ec-sorting';

describe('useEcSorting', () => {
  it('should initialise properly', () => {
    const { sorts, sortBy } = useEcSorting();

    expect(sorts.value).toEqual([]);
    expect(typeof sortBy).toBe('function');
  });

  it('should accept initial sorts', () => {
    const { sorts } = useEcSorting({
      initialSorts: [
        { column: 'test', direction: SortDirection.ASC },
      ],
    });

    expect(sorts.value).toEqual([
      { column: 'test', direction: SortDirection.ASC },
    ]);
  });

  it('should validate given sort cycle', () => {
    expect(() => {
      useEcSorting({
        sortCycle: ['HI', 'LO'],
      });
    }).toThrow('Invalid sortCycle: HI,LO');
  });

  describe('multi sort', () => {
    describe('with default sort cycle: asc -> desc', () => {
      function initUseEcSorting(opts) {
        return useEcSorting({ isMultiSort: true, ...opts });
      }

      it('should use default sort direction when column is not sorted yet', () => {
        const { sorts, sortBy } = initUseEcSorting();
        sortBy({ name: 'test-column' });
        expect(sorts.value).toEqual([
          { column: 'test-column', direction: SortDirection.ASC },
        ]);
      });

      it('should go from ASC to DESC', () => {
        const { sorts, sortBy } = initUseEcSorting({
          initialSorts: [{ column: 'test-column', direction: SortDirection.ASC }],
        });
        sortBy({ name: 'test-column' });
        expect(sorts.value).toEqual([
          { column: 'test-column', direction: SortDirection.DESC },
        ]);
      });

      it('should go from DESC to nothing', () => {
        const { sorts, sortBy } = initUseEcSorting({
          initialSorts: [{ column: 'test-column', direction: SortDirection.DESC }],
        });
        sortBy({ name: 'test-column' });
        expect(sorts.value).toEqual([]);
      });

      it('should allow sort by multiple columns', () => {
        const { sorts, sortBy } = initUseEcSorting();
        sortBy({ name: 'test-column-1' });
        sortBy({ name: 'test-column-2' });
        expect(sorts.value).toEqual([
          { column: 'test-column-1', direction: SortDirection.ASC },
          { column: 'test-column-2', direction: SortDirection.ASC },
        ]);
      });

      it('should update existing sorting when there are multiple column sorted', () => {
        const { sorts, sortBy } = initUseEcSorting({
          initialSorts: [
            { column: 'test-column-1', direction: SortDirection.ASC },
            { column: 'test-column-2', direction: SortDirection.DESC },
          ],
        });

        sortBy({ name: 'test-column-1' });
        expect(sorts.value).toEqual([
          { column: 'test-column-1', direction: SortDirection.DESC },
          { column: 'test-column-2', direction: SortDirection.DESC },
        ]);

        sortBy({ name: 'test-column-2' });
        expect(sorts.value).toEqual([
          { column: 'test-column-1', direction: SortDirection.DESC },
        ]);
      });

      it('should preserve sorting order', () => {
        const { sorts, sortBy } = initUseEcSorting({
          initialSorts: [
            { column: 'test-column-1', direction: SortDirection.ASC },
            { column: 'test-column-2', direction: SortDirection.DESC },
            { column: 'test-column-3', direction: SortDirection.ASC },
          ],
        });

        // sorting test-column-1 3 times should move it to bottom of the sorts array
        sortBy({ name: 'test-column-1' }); // ASC -> DESC
        sortBy({ name: 'test-column-1' }); // DESC -> null
        sortBy({ name: 'test-column-1' }); // null -> ASC

        expect(sorts.value).toEqual([
          { column: 'test-column-2', direction: SortDirection.DESC },
          { column: 'test-column-3', direction: SortDirection.ASC },
          { column: 'test-column-1', direction: SortDirection.ASC },
        ]);

        // sorting test-column-2 2 times should move it to bottom of the sorts array
        sortBy({ name: 'test-column-2' }); // DESC -> null
        sortBy({ name: 'test-column-2' }); // null -> ASC

        expect(sorts.value).toEqual([
          { column: 'test-column-3', direction: SortDirection.ASC },
          { column: 'test-column-1', direction: SortDirection.ASC },
          { column: 'test-column-2', direction: SortDirection.ASC },
        ]);
      });
    });

    describe('with default sort cycle: desc -> asc', () => {
      function initUseEcSorting(opts) {
        return useEcSorting({
          isMultiSort: true,
          sortCycle: SortDirectionCycle.HIGHEST_FIRST,
          ...opts,
        });
      }

      it('should use default sort direction when column is not sorted yet', () => {
        const { sorts, sortBy } = initUseEcSorting();
        sortBy({ name: 'test-column' });
        expect(sorts.value).toEqual([
          { column: 'test-column', direction: SortDirection.DESC },
        ]);
      });

      it('should go from ASC to nothing', () => {
        const { sorts, sortBy } = initUseEcSorting({
          initialSorts: [{ column: 'test-column', direction: SortDirection.ASC }],
        });
        sortBy({ name: 'test-column' });
        expect(sorts.value).toEqual([]);
      });

      it('should go from DESC to ASC', () => {
        const { sorts, sortBy } = initUseEcSorting({ initialSorts: [{ column: 'test-column', direction: SortDirection.DESC }] });
        sortBy({ name: 'test-column' });
        expect(sorts.value).toEqual([
          { column: 'test-column', direction: SortDirection.ASC },
        ]);
      });

      it('should allow sort by multiple columns', () => {
        const { sorts, sortBy } = initUseEcSorting();
        sortBy({ name: 'test-column-1' });
        sortBy({ name: 'test-column-2' });
        expect(sorts.value).toEqual([
          { column: 'test-column-1', direction: SortDirection.DESC },
          { column: 'test-column-2', direction: SortDirection.DESC },
        ]);
      });

      it('should update existing sorting when there are multiple column sorted', () => {
        const { sorts, sortBy } = initUseEcSorting({
          initialSorts: [
            { column: 'test-column-1', direction: SortDirection.DESC },
            { column: 'test-column-2', direction: SortDirection.ASC },
          ],
        });

        sortBy({ name: 'test-column-1' });
        expect(sorts.value).toEqual([
          { column: 'test-column-1', direction: SortDirection.ASC },
          { column: 'test-column-2', direction: SortDirection.ASC },
        ]);

        sortBy({ name: 'test-column-2' });
        expect(sorts.value).toEqual([
          { column: 'test-column-1', direction: SortDirection.ASC },
        ]);
      });

      it('should preserve sorting order', () => {
        const { sorts, sortBy } = initUseEcSorting({
          initialSorts: [
            { column: 'test-column-1', direction: SortDirection.ASC },
            { column: 'test-column-2', direction: SortDirection.DESC },
            { column: 'test-column-3', direction: SortDirection.ASC },
          ],
        });

        // sorting test-column-1 3 times should move it to bottom of the sorts array
        sortBy({ name: 'test-column-1' }); // ASC -> null
        sortBy({ name: 'test-column-1' }); // DESC -> ASC
        sortBy({ name: 'test-column-1' }); // null -> DESC

        expect(sorts.value).toEqual([
          { column: 'test-column-2', direction: SortDirection.DESC },
          { column: 'test-column-3', direction: SortDirection.ASC },
          { column: 'test-column-1', direction: SortDirection.ASC },
        ]);

        // sorting test-column-2 2 times should move it to bottom of the sorts array
        sortBy({ name: 'test-column-2' }); // DESC -> ASC
        sortBy({ name: 'test-column-2' }); // ASC -> null

        expect(sorts.value).toEqual([
          { column: 'test-column-3', direction: SortDirection.ASC },
          { column: 'test-column-1', direction: SortDirection.ASC },
        ]);
      });
    });
  });

  describe('single sort', () => {
    describe('with default sort cycle: asc -> desc', () => {
      function initUseEcSorting(opts) {
        return useEcSorting({ isMultiSort: false, ...opts });
      }

      it('should use default sort direction when column is not sorted yet', () => {
        const { sorts, sortBy } = initUseEcSorting();
        sortBy({ name: 'test-column' });
        expect(sorts.value).toEqual([
          { column: 'test-column', direction: SortDirection.ASC },
        ]);
      });

      it('should go from ASC to DESC', () => {
        const { sorts, sortBy } = initUseEcSorting({ initialSorts: [{ column: 'test-column', direction: SortDirection.ASC }] });
        sortBy({ name: 'test-column' });
        expect(sorts.value).toEqual([
          { column: 'test-column', direction: SortDirection.DESC },
        ]);
      });

      it('should go from DESC to nothing', () => {
        const { sorts, sortBy } = initUseEcSorting({ initialSorts: [{ column: 'test-column', direction: SortDirection.DESC }] });
        sortBy({ name: 'test-column' });
        expect(sorts.value).toEqual([]);
      });

      it('should not allow sort by multiple columns', () => {
        const { sorts, sortBy } = initUseEcSorting();
        sortBy({ name: 'test-column-1' });
        sortBy({ name: 'test-column-2' });
        expect(sorts.value).toEqual([
          { column: 'test-column-2', direction: SortDirection.ASC },
        ]);
      });
    });

    describe('with default sort cycle: desc -> asc', () => {
      function initUseEcSorting(opts) {
        return useEcSorting({
          isMultiSort: false,
          sortCycle: SortDirectionCycle.HIGHEST_FIRST,
          ...opts,
        });
      }

      it('should use default sort direction when column is not sorted yet', () => {
        const { sorts, sortBy } = initUseEcSorting();
        sortBy({ name: 'test-column' });
        expect(sorts.value).toEqual([
          { column: 'test-column', direction: SortDirection.DESC },
        ]);
      });

      it('should go from ASC to nothing', () => {
        const { sorts, sortBy } = initUseEcSorting({ initialSorts: [{ column: 'test-column', direction: SortDirection.ASC }] });
        sortBy({ name: 'test-column' });
        expect(sorts.value).toEqual([]);
      });

      it('should go from DESC to ASC', () => {
        const { sorts, sortBy } = initUseEcSorting({ initialSorts: [{ column: 'test-column', direction: SortDirection.DESC }] });
        sortBy({ name: 'test-column' });
        expect(sorts.value).toEqual([
          { column: 'test-column', direction: SortDirection.ASC },
        ]);
      });

      it('should not allow sort by multiple columns', () => {
        const { sorts, sortBy } = initUseEcSorting();
        sortBy({ name: 'test-column-1' });
        sortBy({ name: 'test-column-2' });
        expect(sorts.value).toEqual([
          { column: 'test-column-2', direction: SortDirection.DESC },
        ]);
      });
    });
  });
});
