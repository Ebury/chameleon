import * as SortDirection from '../../enums/sort-direction';
import * as SortDirectionCycle from '../../enums/sort-direction-cycle';
import { createHOCc } from '../hoc';

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
    sortCycle: {
      type: Array,
      default: () => SortDirectionCycle.LOWEST_FIRST,
      validator(directions) {
        return directions.every(direction => direction === SortDirection.ASC || direction === SortDirection.DESC);
      },
    },
  },
  data() {
    return {
      internalSorts: [],
    };
  },
  methods: {
    sortBy(columnName, sortCycle = this.sortCycle) {
      let sorts = [...this.internalSorts];

      const existingSort = sorts.find(sort => sort.column === columnName);
      if (existingSort) {
        existingSort.direction = this.nextDirection(existingSort.direction, sortCycle);
        if (!existingSort.direction) {
          sorts = sorts.filter(sort => sort !== existingSort);
        }
      } else if (this.multiSort) {
        sorts.push({ column: columnName, direction: sortCycle[0] });
      } else {
        sorts = [{ column: columnName, direction: sortCycle[0] }];
      }

      this.internalSorts = sorts;
      this.$emit('sort', sorts);
    },
    nextDirection(current, sortCycle) {
      const nextDirectionIndex = sortCycle.indexOf(current) + 1;
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
  props(props) {
    return {
      ...props,
      sorts: this.internalSorts,
      sortCycle: null,
      multiSort: null,
    };
  },
  listeners: {
    sort(column) {
      const { name: columnName, sortCycle } = column;
      this.sortBy(columnName, sortCycle);
    },
  },
});

export default withSorting;
