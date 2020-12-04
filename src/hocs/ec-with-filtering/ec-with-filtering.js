import { createHOCc } from 'vue-hoc';

const withFiltering = createHOCc({
  name: 'EcWithFiltering',
  props: {
    filter: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    filter: {
      immediate: true,
      handler(newFilter) {
        this.internalFilter = newFilter;
      },
    },
  },
  data() {
    return {
      internalFilter: {},
    };
  },
}, {
  props: {
    filter() {
      return this.internalFilter;
    },
  },
  listeners: {
    filtering(filters) {
      this.internalFilter = filters;
    },
  },
});

export default withFiltering;
