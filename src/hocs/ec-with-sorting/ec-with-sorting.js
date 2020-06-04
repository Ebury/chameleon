import { createHOCc } from 'vue-hoc';

import * as SortDirection from '../../enums/sort-direction';

const withSorting = createHOCc({
  name: 'EcWithSorting',
  props: {
    multiSort: {
      type: Boolean,
      default: false,
    },
    sorts: {
      type: Array,
      default: () => [],
    },
    defaultSortCycle: {
      type: Array,
      default: () => [null, SortDirection.ASC, SortDirection.DESC],
    },
  },
  data() {
    return {
      internalSorts: [],
    };
  },
  methods: {
    sortBy(columnName, sortCycle = this.defaultSortCycle) {
      let sorts = this.internalSorts;

      const existingSort = sorts.find(sort => sort.column === columnName);
      if (existingSort) {
        existingSort.direction = this.nextDirection(existingSort.direction, sortCycle);
        if (!existingSort.direction) {
          sorts = sorts.filter(sort => sort !== existingSort);
        }
      } else if (this.multiSort) {
        sorts.push({ column: columnName, direction: sortCycle[1] });
      } else {
        sorts = [{ column: columnName, direction: sortCycle[1] }];
      }

      this.internalSorts = sorts;
    },
    nextDirection(current, sortCycle) {
      const nextDirectionIndex = sortCycle.indexOf(current) + 1;
      if (nextDirectionIndex >= sortCycle.length) {
        return sortCycle[0];
      }

      return sortCycle[nextDirectionIndex];
    },
  },
  watch: {
    sorts: {
      immediate: true,
      handler(newSorts) {
        this.internalSorts = newSorts;
      },
    },
  },
}, {
  props: {
    sorts() {
      return this.internalSorts;
    },
  },
  listeners: {
    sort(column) {
      const { name: columnName, sortCycle } = column;
      this.sortBy(columnName, sortCycle);
      this.$emit('sort', this.internalSorts);
    },
  },
});

export default withSorting;
