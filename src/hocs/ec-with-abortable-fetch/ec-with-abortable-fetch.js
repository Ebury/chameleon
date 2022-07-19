import { createHOC } from '../hoc';

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
  beforeUnmount() {
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
    const newProps = {
      ...props,
      [loadingProp]: loadingTransform(this.isFetching, this.fetchedData),
      [errorProp]: errorTransform(this.fetchError),
      [dataProp]: dataTransform(this.fetchedData),
    };

    delete newProps.dataSource;
    delete newProps.fetchArgs;
    return newProps;
  },
});

export default withAbortableFetch;
