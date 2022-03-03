import { createHOC } from 'vue-hoc';

const identity = arg => arg;

const withAbortableFetch = (Component, {
  dataProp = 'data',
  loadingProp = 'loading',
  errorProp = 'error',
  dataTransform = identity,
  errorTransform = identity,
  loadingTransform = identity,
} = {}) => createHOC(Component, {
  name: 'EcWithAbortableFetch',
  props: {
    dataSource: {
      type: Object,
      required: true,
      validator(value) {
        return value && typeof value.fetch === 'function';
      },
    },
    fetchArgs: {
      type: Object,
    },
  },
  watch: {
    fetchArgs: {
      immediate: true,
      handler(fetchArgs) {
        this.fetch(fetchArgs);
      },
    },
  },
  data() {
    return {
      isFetching: false,
      fetchError: null,
      fetchedData: null,
    };
  },
  beforeDestroy() {
    this.abort();
  },
  methods: {
    abort() {
      if (this.fetchAbortController && this.fetchAbortController.signal && !this.fetchAbortController.signal.aborted) {
        this.fetchAbortController.abort();
        this.$emit('abort');
      }
    },
    async fetch(fetchArgs) {
      this.abort();
      this.isFetching = true;
      this.fetchError = null;

      this.fetchAbortController = new global.AbortController();
      try {
        this.fetchedData = await this.dataSource.fetch(fetchArgs, this.fetchAbortController.signal);
        this.isFetching = false;
        this.fetchAbortController = null;
      } catch (err) {
        if (err && err.name !== 'AbortError') {
          this.$emit('error', err);
          this.fetchError = err;
          this.isFetching = false;
          this.fetchAbortController = null;
        }
      }
    },
  },
}, {
  props(props) {
    return {
      ...props,
      dataSource: null,
      fetchArgs: null,
      [loadingProp]: loadingTransform(this.isFetching),
      [errorProp]: errorTransform(this.fetchError),
      [dataProp]: dataTransform(this.fetchedData),
    };
  },
});

export default withAbortableFetch;
