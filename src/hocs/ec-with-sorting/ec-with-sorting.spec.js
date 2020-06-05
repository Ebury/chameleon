import { mount, createLocalVue, createWrapper } from '@vue/test-utils';
import * as SortDirection from '../../enums/sort-direction';
import * as SortDirectionCycle from '../../enums/sort-direction-cycle';
import withSorting from './ec-with-sorting';
import { withMockedConsole } from '../../../tests/utils/console';

describe('EcWithSorting', () => {
  function mountEcWithSorting(props, mountOpts) {
    const localVue = createLocalVue();

    const Component = localVue.extend({
      props: {
        sorts: {
          type: Array,
          default: () => [],
        },
      },
      render(h) {
        return h('div');
      },
    });

    const hocWrapper = mount(withSorting(Component), {
      localVue,
      propsData: { ...props },
      ...mountOpts,
    });

    const componentWrapper = createWrapper(hocWrapper.vm.$children[0].$vnode);

    return { hocWrapper, componentWrapper };
  }

  it('should render properly', () => {
    const { hocWrapper } = mountEcWithSorting();
    expect(hocWrapper.element).toMatchSnapshot();
  });

  it('should throw an error if sort direction cycle is not valid', () => {
    withMockedConsole((errorSpy) => {
      mountEcWithSorting({ sortCycle: ['HI', 'LO'] });
      expect(errorSpy).toMatchSnapshot();
    });
  });

  describe('multi sort', () => {
    describe('with default sort cycle: asc -> desc', () => {
      function mountMultiEcWithSorting(props, mountOpts) {
        return mountEcWithSorting({ multiSort: true, ...props }, mountOpts);
      }
      it('should use default sort direction when column is not sorted yet', () => {
        const { componentWrapper } = mountMultiEcWithSorting();
        componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column', direction: SortDirection.ASC },
        ]);
      });

      it('should go from ASC to DESC', () => {
        const { componentWrapper } = mountMultiEcWithSorting({ sorts: [{ column: 'test-column', direction: SortDirection.ASC }] });
        componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column', direction: SortDirection.DESC },
        ]);
      });

      it('should go from DESC to nothing', () => {
        const { componentWrapper } = mountMultiEcWithSorting({ sorts: [{ column: 'test-column', direction: SortDirection.DESC }] });
        componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([]);
      });

      it('should allow sort by multiple columns', () => {
        const { componentWrapper } = mountMultiEcWithSorting();
        componentWrapper.vm.$emit('sort', { name: 'test-column-1' });
        componentWrapper.vm.$emit('sort', { name: 'test-column-2' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column-1', direction: SortDirection.ASC },
          { column: 'test-column-2', direction: SortDirection.ASC },
        ]);
      });

      it('should update existing sorting when there are multiple column sorted', () => {
        const { componentWrapper } = mountMultiEcWithSorting({
          sorts: [
            { column: 'test-column-1', direction: SortDirection.ASC },
            { column: 'test-column-2', direction: SortDirection.DESC },
          ],
        });

        componentWrapper.vm.$emit('sort', { name: 'test-column-1' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column-1', direction: SortDirection.DESC },
          { column: 'test-column-2', direction: SortDirection.DESC },
        ]);

        componentWrapper.vm.$emit('sort', { name: 'test-column-2' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column-1', direction: SortDirection.DESC },
        ]);
      });

      it('should preserve sorting order', () => {
        const { componentWrapper } = mountMultiEcWithSorting({
          sorts: [
            { column: 'test-column-1', direction: SortDirection.ASC },
            { column: 'test-column-2', direction: SortDirection.DESC },
            { column: 'test-column-3', direction: SortDirection.ASC },
          ],
        });

        // sorting test-column-1 3 times should move it to bottom of the sorts array
        componentWrapper.vm.$emit('sort', { name: 'test-column-1' }); // ASC -> DESC
        componentWrapper.vm.$emit('sort', { name: 'test-column-1' }); // DESC -> null
        componentWrapper.vm.$emit('sort', { name: 'test-column-1' }); // null -> ASC

        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column-2', direction: SortDirection.DESC },
          { column: 'test-column-3', direction: SortDirection.ASC },
          { column: 'test-column-1', direction: SortDirection.ASC },
        ]);

        // sorting test-column-2 2 times should move it to bottom of the sorts array
        componentWrapper.vm.$emit('sort', { name: 'test-column-2' }); // DESC -> null
        componentWrapper.vm.$emit('sort', { name: 'test-column-2' }); // null -> ASC

        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column-3', direction: SortDirection.ASC },
          { column: 'test-column-1', direction: SortDirection.ASC },
          { column: 'test-column-2', direction: SortDirection.ASC },
        ]);
      });
    });

    describe('with default sort cycle: desc -> asc', () => {
      function mountMultiEcWithSortingDesc(props, mountOpts) {
        return mountEcWithSorting({ multiSort: true, sortCycle: SortDirectionCycle.HIGHEST_FIRST, ...props }, mountOpts);
      }
      it('should use default sort direction when column is not sorted yet', () => {
        const { componentWrapper } = mountMultiEcWithSortingDesc();
        componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column', direction: SortDirection.DESC },
        ]);
      });

      it('should go from ASC to nothing', () => {
        const { componentWrapper } = mountMultiEcWithSortingDesc({ sorts: [{ column: 'test-column', direction: SortDirection.ASC }] });
        componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([]);
      });

      it('should go from DESC to ASC', () => {
        const { componentWrapper } = mountMultiEcWithSortingDesc({ sorts: [{ column: 'test-column', direction: SortDirection.DESC }] });
        componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column', direction: SortDirection.ASC },
        ]);
      });

      it('should allow sort by multiple columns', () => {
        const { componentWrapper } = mountMultiEcWithSortingDesc();
        componentWrapper.vm.$emit('sort', { name: 'test-column-1' });
        componentWrapper.vm.$emit('sort', { name: 'test-column-2' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column-1', direction: SortDirection.DESC },
          { column: 'test-column-2', direction: SortDirection.DESC },
        ]);
      });

      it('should update existing sorting when there are multiple column sorted', () => {
        const { componentWrapper } = mountMultiEcWithSortingDesc({
          sorts: [
            { column: 'test-column-1', direction: SortDirection.DESC },
            { column: 'test-column-2', direction: SortDirection.ASC },
          ],
        });

        componentWrapper.vm.$emit('sort', { name: 'test-column-1' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column-1', direction: SortDirection.ASC },
          { column: 'test-column-2', direction: SortDirection.ASC },
        ]);

        componentWrapper.vm.$emit('sort', { name: 'test-column-2' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column-1', direction: SortDirection.ASC },
        ]);
      });

      it('should preserve sorting order', () => {
        const { componentWrapper } = mountMultiEcWithSortingDesc({
          sorts: [
            { column: 'test-column-1', direction: SortDirection.ASC },
            { column: 'test-column-2', direction: SortDirection.DESC },
            { column: 'test-column-3', direction: SortDirection.ASC },
          ],
        });

        // sorting test-column-1 3 times should move it to bottom of the sorts array
        componentWrapper.vm.$emit('sort', { name: 'test-column-1' }); // ASC -> null
        componentWrapper.vm.$emit('sort', { name: 'test-column-1' }); // DESC -> ASC
        componentWrapper.vm.$emit('sort', { name: 'test-column-1' }); // null -> DESC

        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column-2', direction: SortDirection.DESC },
          { column: 'test-column-3', direction: SortDirection.ASC },
          { column: 'test-column-1', direction: SortDirection.ASC },
        ]);

        // sorting test-column-2 2 times should move it to bottom of the sorts array
        componentWrapper.vm.$emit('sort', { name: 'test-column-2' }); // DESC -> ASC
        componentWrapper.vm.$emit('sort', { name: 'test-column-2' }); // ASC -> null

        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column-3', direction: SortDirection.ASC },
          { column: 'test-column-1', direction: SortDirection.ASC },
        ]);
      });
    });
  });

  describe('single sort', () => {
    describe('with default sort cycle: asc -> desc', () => {
      function mountSingleEcWithSorting(props, mountOpts) {
        return mountEcWithSorting({ multiSort: false, ...props }, mountOpts);
      }

      it('should use default sort direction when column is not sorted yet', () => {
        const { componentWrapper } = mountSingleEcWithSorting();
        componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column', direction: SortDirection.ASC },
        ]);
      });

      it('should go from ASC to DESC', () => {
        const { componentWrapper } = mountSingleEcWithSorting({ sorts: [{ column: 'test-column', direction: SortDirection.ASC }] });
        componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column', direction: SortDirection.DESC },
        ]);
      });

      it('should go from DESC to nothing', () => {
        const { componentWrapper } = mountSingleEcWithSorting({ sorts: [{ column: 'test-column', direction: SortDirection.DESC }] });
        componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([]);
      });

      it('should not allow sort by multiple columns', () => {
        const { componentWrapper } = mountSingleEcWithSorting();
        componentWrapper.vm.$emit('sort', { name: 'test-column-1' });
        componentWrapper.vm.$emit('sort', { name: 'test-column-2' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column-2', direction: SortDirection.ASC },
        ]);
      });
    });
    describe('with default sort cycle: desc -> asc', () => {
      function mountSingleEcWithSortingDesc(props, mountOpts) {
        return mountEcWithSorting({ sortCycle: SortDirectionCycle.HIGHEST_FIRST, multiSort: false, ...props }, mountOpts);
      }

      it('should use default sort direction when column is not sorted yet', () => {
        const { componentWrapper } = mountSingleEcWithSortingDesc();
        componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column', direction: SortDirection.DESC },
        ]);
      });

      it('should go from ASC to nothing', () => {
        const { componentWrapper } = mountSingleEcWithSortingDesc({ sorts: [{ column: 'test-column', direction: SortDirection.ASC }] });
        componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([]);
      });

      it('should go from DESC to ASC', () => {
        const { componentWrapper } = mountSingleEcWithSortingDesc({ sorts: [{ column: 'test-column', direction: SortDirection.DESC }] });
        componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column', direction: SortDirection.ASC },
        ]);
      });

      it('should not allow sort by multiple columns', () => {
        const { componentWrapper } = mountSingleEcWithSortingDesc();
        componentWrapper.vm.$emit('sort', { name: 'test-column-1' });
        componentWrapper.vm.$emit('sort', { name: 'test-column-2' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column-2', direction: SortDirection.DESC },
        ]);
      });
    });
  });
});
