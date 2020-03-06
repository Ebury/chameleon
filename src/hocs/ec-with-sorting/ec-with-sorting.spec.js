import { mount, createLocalVue, createWrapper } from '@vue/test-utils';
import * as SortDirection from '../../enums/sort-direction';
import withSorting from './ec-with-sorting';

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

  describe('multi sort', () => {
    function mountMultiEcWithSorting(props, mountOpts) {
      return mountEcWithSorting({ multiSort: true, ...props }, mountOpts);
    }

    it('should use default sort direction when column is not sorted yet', () => {
      const { componentWrapper } = mountMultiEcWithSorting();
      componentWrapper.vm.$emit('sort', 'test-column');
      expect(componentWrapper.vm.sorts).toEqual([
        { column: 'test-column', direction: SortDirection.ASC },
      ]);
    });

    it('should go from ASC to DESC', () => {
      const { componentWrapper } = mountMultiEcWithSorting({ sorts: [{ column: 'test-column', direction: SortDirection.ASC }] });
      componentWrapper.vm.$emit('sort', 'test-column');
      expect(componentWrapper.vm.sorts).toEqual([
        { column: 'test-column', direction: SortDirection.DESC },
      ]);
    });

    it('should go from DESC to nothing', () => {
      const { componentWrapper } = mountMultiEcWithSorting({ sorts: [{ column: 'test-column', direction: SortDirection.DESC }] });
      componentWrapper.vm.$emit('sort', 'test-column');
      expect(componentWrapper.vm.sorts).toEqual([]);
    });

    it('should allow sort by multiple columns', () => {
      const { componentWrapper } = mountMultiEcWithSorting();
      componentWrapper.vm.$emit('sort', 'test-column-1');
      componentWrapper.vm.$emit('sort', 'test-column-2');
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

      componentWrapper.vm.$emit('sort', 'test-column-1');
      expect(componentWrapper.vm.sorts).toEqual([
        { column: 'test-column-1', direction: SortDirection.DESC },
        { column: 'test-column-2', direction: SortDirection.DESC },
      ]);

      componentWrapper.vm.$emit('sort', 'test-column-2');
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
      componentWrapper.vm.$emit('sort', 'test-column-1'); // ASC -> DESC
      componentWrapper.vm.$emit('sort', 'test-column-1'); // DESC -> null
      componentWrapper.vm.$emit('sort', 'test-column-1'); // null -> ASC

      expect(componentWrapper.vm.sorts).toEqual([
        { column: 'test-column-2', direction: SortDirection.DESC },
        { column: 'test-column-3', direction: SortDirection.ASC },
        { column: 'test-column-1', direction: SortDirection.ASC },
      ]);

      // sorting test-column-2 2 times should move it to bottom of the sorts array
      componentWrapper.vm.$emit('sort', 'test-column-2'); // DESC -> null
      componentWrapper.vm.$emit('sort', 'test-column-2'); // null -> ASC

      expect(componentWrapper.vm.sorts).toEqual([
        { column: 'test-column-3', direction: SortDirection.ASC },
        { column: 'test-column-1', direction: SortDirection.ASC },
        { column: 'test-column-2', direction: SortDirection.ASC },
      ]);
    });
  });

  describe('single sort', () => {
    function mountSingleEcWithSorting(props, mountOpts) {
      return mountEcWithSorting({ multiSort: false, ...props }, mountOpts);
    }

    it('should use default sort direction when column is not sorted yet', () => {
      const { componentWrapper } = mountSingleEcWithSorting();
      componentWrapper.vm.$emit('sort', 'test-column');
      expect(componentWrapper.vm.sorts).toEqual([
        { column: 'test-column', direction: SortDirection.ASC },
      ]);
    });

    it('should go from ASC to DESC', () => {
      const { componentWrapper } = mountSingleEcWithSorting({ sorts: [{ column: 'test-column', direction: SortDirection.ASC }] });
      componentWrapper.vm.$emit('sort', 'test-column');
      expect(componentWrapper.vm.sorts).toEqual([
        { column: 'test-column', direction: SortDirection.DESC },
      ]);
    });

    it('should go from DESC to nothing', () => {
      const { componentWrapper } = mountSingleEcWithSorting({ sorts: [{ column: 'test-column', direction: SortDirection.DESC }] });
      componentWrapper.vm.$emit('sort', 'test-column');
      expect(componentWrapper.vm.sorts).toEqual([]);
    });

    it('should not allow sort by multiple columns', () => {
      const { componentWrapper } = mountSingleEcWithSorting();
      componentWrapper.vm.$emit('sort', 'test-column-1');
      componentWrapper.vm.$emit('sort', 'test-column-2');
      expect(componentWrapper.vm.sorts).toEqual([
        { column: 'test-column-2', direction: SortDirection.ASC },
      ]);
    });
  });
});
