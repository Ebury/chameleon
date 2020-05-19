import { createHOCc } from 'vue-hoc';

const withAbortableFetch = createHOCc({
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

      this.fetchAbortController = new global.AbortController();
      try {
        this.fetchedData = await this.dataSource.fetch(fetchArgs, this.fetchAbortController.signal);
      } catch (err) {
        if (err && err.name !== 'AbortError') {
          this.$emit('error', err);
          this.fetchError = err;
        }
      } finally {
        this.fetchAbortController = null;
        this.isFetching = false;
      }
    },
  },
}, {
  props(props) {
    return {
      ...props,
      dataSource: null,
      fetchArgs: null,
      loading: this.isFetching,
      error: this.fetchError,
      data: this.fetchedData,
    };
  },
});

export default withAbortableFetch;
