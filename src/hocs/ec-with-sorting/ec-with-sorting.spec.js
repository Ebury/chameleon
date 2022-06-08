import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';

import { withMockedConsole } from '../../../tests/utils/console';
import * as SortDirection from '../../enums/sort-direction';
import * as SortDirectionCycle from '../../enums/sort-direction-cycle';
import withSorting from './ec-with-sorting';

describe('EcWithSorting', () => {
  function mountEcWithSorting(props, mountOpts) {
    const Component = defineComponent({
      props: {
        sorts: {
          type: Array,
          default: () => [],
        },
      },
      render() {
        return h('div');
      },
    });

    const hocWrapper = mount(withSorting(Component), {
      props,
      ...mountOpts,
    });

    const componentWrapper = hocWrapper.findComponent(Component);

    return { hocWrapper, componentWrapper };
  }

  it('should render properly', () => {
    const { hocWrapper } = mountEcWithSorting();
    expect(hocWrapper.element).toMatchSnapshot();
  });

  it('should throw an error if sort direction cycle is not valid', () => {
    withMockedConsole((errorSpy, warnSpy) => {
      mountEcWithSorting({ sortCycle: ['HI', 'LO'] });
      expect(warnSpy).toHaveBeenCalledTimes(2);
      expect(warnSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "sortCycle".');
    });
  });

  describe('multi sort', () => {
    describe('with default sort cycle: asc -> desc', () => {
      function mountMultiEcWithSorting(props, mountOpts) {
        return mountEcWithSorting({ multiSort: true, ...props }, mountOpts);
      }

      it('should use default sort direction when column is not sorted yet', async () => {
        const { componentWrapper } = mountMultiEcWithSorting();
        await componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column', direction: SortDirection.ASC },
        ]);
      });

      it('should go from ASC to DESC', async () => {
        const { componentWrapper } = mountMultiEcWithSorting({ sorts: [{ column: 'test-column', direction: SortDirection.ASC }] });
        await componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column', direction: SortDirection.DESC },
        ]);
      });

      it('should go from DESC to nothing', async () => {
        const { componentWrapper } = mountMultiEcWithSorting({ sorts: [{ column: 'test-column', direction: SortDirection.DESC }] });
        await componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([]);
      });

      it('should allow sort by multiple columns', async () => {
        const { componentWrapper } = mountMultiEcWithSorting();
        await componentWrapper.vm.$emit('sort', { name: 'test-column-1' });
        await componentWrapper.vm.$emit('sort', { name: 'test-column-2' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column-1', direction: SortDirection.ASC },
          { column: 'test-column-2', direction: SortDirection.ASC },
        ]);
      });

      it('should update existing sorting when there are multiple column sorted', async () => {
        const { componentWrapper } = mountMultiEcWithSorting({
          sorts: [
            { column: 'test-column-1', direction: SortDirection.ASC },
            { column: 'test-column-2', direction: SortDirection.DESC },
          ],
        });

        await componentWrapper.vm.$emit('sort', { name: 'test-column-1' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column-1', direction: SortDirection.DESC },
          { column: 'test-column-2', direction: SortDirection.DESC },
        ]);

        await componentWrapper.vm.$emit('sort', { name: 'test-column-2' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column-1', direction: SortDirection.DESC },
        ]);
      });

      it('should preserve sorting order', async () => {
        const { componentWrapper } = mountMultiEcWithSorting({
          sorts: [
            { column: 'test-column-1', direction: SortDirection.ASC },
            { column: 'test-column-2', direction: SortDirection.DESC },
            { column: 'test-column-3', direction: SortDirection.ASC },
          ],
        });

        // sorting test-column-1 3 times should move it to bottom of the sorts array
        await componentWrapper.vm.$emit('sort', { name: 'test-column-1' }); // ASC -> DESC
        await componentWrapper.vm.$emit('sort', { name: 'test-column-1' }); // DESC -> null
        await componentWrapper.vm.$emit('sort', { name: 'test-column-1' }); // null -> ASC

        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column-2', direction: SortDirection.DESC },
          { column: 'test-column-3', direction: SortDirection.ASC },
          { column: 'test-column-1', direction: SortDirection.ASC },
        ]);

        // sorting test-column-2 2 times should move it to bottom of the sorts array
        await componentWrapper.vm.$emit('sort', { name: 'test-column-2' }); // DESC -> null
        await componentWrapper.vm.$emit('sort', { name: 'test-column-2' }); // null -> ASC

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

      it('should use default sort direction when column is not sorted yet', async () => {
        const { componentWrapper } = mountMultiEcWithSortingDesc();
        await componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column', direction: SortDirection.DESC },
        ]);
      });

      it('should go from ASC to nothing', async () => {
        const { componentWrapper } = mountMultiEcWithSortingDesc({ sorts: [{ column: 'test-column', direction: SortDirection.ASC }] });
        await componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([]);
      });

      it('should go from DESC to ASC', async () => {
        const { componentWrapper } = mountMultiEcWithSortingDesc({ sorts: [{ column: 'test-column', direction: SortDirection.DESC }] });
        await componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column', direction: SortDirection.ASC },
        ]);
      });

      it('should allow sort by multiple columns', async () => {
        const { componentWrapper } = mountMultiEcWithSortingDesc();
        await componentWrapper.vm.$emit('sort', { name: 'test-column-1' });
        await componentWrapper.vm.$emit('sort', { name: 'test-column-2' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column-1', direction: SortDirection.DESC },
          { column: 'test-column-2', direction: SortDirection.DESC },
        ]);
      });

      it('should update existing sorting when there are multiple column sorted', async () => {
        const { componentWrapper } = mountMultiEcWithSortingDesc({
          sorts: [
            { column: 'test-column-1', direction: SortDirection.DESC },
            { column: 'test-column-2', direction: SortDirection.ASC },
          ],
        });

        await componentWrapper.vm.$emit('sort', { name: 'test-column-1' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column-1', direction: SortDirection.ASC },
          { column: 'test-column-2', direction: SortDirection.ASC },
        ]);

        await componentWrapper.vm.$emit('sort', { name: 'test-column-2' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column-1', direction: SortDirection.ASC },
        ]);
      });

      it('should preserve sorting order', async () => {
        const { componentWrapper } = mountMultiEcWithSortingDesc({
          sorts: [
            { column: 'test-column-1', direction: SortDirection.ASC },
            { column: 'test-column-2', direction: SortDirection.DESC },
            { column: 'test-column-3', direction: SortDirection.ASC },
          ],
        });

        // sorting test-column-1 3 times should move it to bottom of the sorts array
        await componentWrapper.vm.$emit('sort', { name: 'test-column-1' }); // ASC -> null
        await componentWrapper.vm.$emit('sort', { name: 'test-column-1' }); // DESC -> ASC
        await componentWrapper.vm.$emit('sort', { name: 'test-column-1' }); // null -> DESC

        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column-2', direction: SortDirection.DESC },
          { column: 'test-column-3', direction: SortDirection.ASC },
          { column: 'test-column-1', direction: SortDirection.ASC },
        ]);

        // sorting test-column-2 2 times should move it to bottom of the sorts array
        await componentWrapper.vm.$emit('sort', { name: 'test-column-2' }); // DESC -> ASC
        await componentWrapper.vm.$emit('sort', { name: 'test-column-2' }); // ASC -> null

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

      it('should use default sort direction when column is not sorted yet', async () => {
        const { componentWrapper } = mountSingleEcWithSorting();
        await componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column', direction: SortDirection.ASC },
        ]);
      });

      it('should go from ASC to DESC', async () => {
        const { componentWrapper } = mountSingleEcWithSorting({ sorts: [{ column: 'test-column', direction: SortDirection.ASC }] });
        await componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column', direction: SortDirection.DESC },
        ]);
      });

      it('should go from DESC to nothing', async () => {
        const { componentWrapper } = mountSingleEcWithSorting({ sorts: [{ column: 'test-column', direction: SortDirection.DESC }] });
        await componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([]);
      });

      it('should not allow sort by multiple columns', async () => {
        const { componentWrapper } = mountSingleEcWithSorting();
        await componentWrapper.vm.$emit('sort', { name: 'test-column-1' });
        await componentWrapper.vm.$emit('sort', { name: 'test-column-2' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column-2', direction: SortDirection.ASC },
        ]);
      });
    });

    describe('with default sort cycle: desc -> asc', () => {
      function mountSingleEcWithSortingDesc(props, mountOpts) {
        return mountEcWithSorting({ sortCycle: SortDirectionCycle.HIGHEST_FIRST, multiSort: false, ...props }, mountOpts);
      }

      it('should use default sort direction when column is not sorted yet', async () => {
        const { componentWrapper } = mountSingleEcWithSortingDesc();
        await componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column', direction: SortDirection.DESC },
        ]);
      });

      it('should go from ASC to nothing', async () => {
        const { componentWrapper } = mountSingleEcWithSortingDesc({ sorts: [{ column: 'test-column', direction: SortDirection.ASC }] });
        await componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([]);
      });

      it('should go from DESC to ASC', async () => {
        const { componentWrapper } = mountSingleEcWithSortingDesc({ sorts: [{ column: 'test-column', direction: SortDirection.DESC }] });
        await componentWrapper.vm.$emit('sort', { name: 'test-column' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column', direction: SortDirection.ASC },
        ]);
      });

      it('should not allow sort by multiple columns', async () => {
        const { componentWrapper } = mountSingleEcWithSortingDesc();
        await componentWrapper.vm.$emit('sort', { name: 'test-column-1' });
        await componentWrapper.vm.$emit('sort', { name: 'test-column-2' });
        expect(componentWrapper.vm.sorts).toEqual([
          { column: 'test-column-2', direction: SortDirection.DESC },
        ]);
      });
    });
  });
});
