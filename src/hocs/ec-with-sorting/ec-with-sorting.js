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
  },
  data() {
    return {
      internalSorts: [],
    };
  },
  methods: {
    sortBy(columnName) {
      let sorts = this.internalSorts;

      const existingSort = sorts.find(sort => sort.column === columnName);
      if (existingSort) {
        existingSort.direction = this.nextDirection(existingSort.direction);
        if (!existingSort.direction) {
          sorts = sorts.filter(sort => sort !== existingSort);
        }
      } else if (this.multiSort) {
        sorts.push({ column: columnName, direction: SortDirection.ASC });
      } else {
        sorts = [{ column: columnName, direction: SortDirection.ASC }];
      }

      this.internalSorts = sorts;
    },
    nextDirection(current) {
      if (current === SortDirection.ASC) {
        return SortDirection.DESC;
      }
      /* istanbul ignore else */
      if (current === SortDirection.DESC) {
        return null;
      }
      /* istanbul ignore next */
      return SortDirection.ASC;
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
    sort(columnName) {
      this.sortBy(columnName);
      this.$emit('sort', this.internalSorts);
    },
  },
});

export default withSorting;
