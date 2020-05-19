<script>
import { createHOCc, createHOC, createRenderFn } from 'vue-hoc';
import EcTable from '../ec-table';
import withSorting from '../../hocs/ec-with-sorting';
import withLoading from '../../hocs/ec-with-loading';
import withAbortableFetch from '../../hocs/ec-with-abortable-fetch';

const EcSmartTableError = {
  name: 'EcSmartTableError',
  functional: true,
  props: {
    errorMessage: {
      type: String,
      default: 'Unexpected error while fetching data',
    },
  },
  render(h, { scopedSlots, props }) {
    const { errorMessage } = props;
    const { error: errorSlot } = scopedSlots;
    if (errorSlot) {
      return (<div>{errorSlot({ errorMessage })}</div>);
    }

    return (<div data-test="ec-smart-table-error">{errorMessage}</div>);
  },
};

const EcSmartTableEmpty = {
  name: 'EcSmartTableEmpty',
  functional: true,
  props: {
    emptyMessage: {
      type: String,
      default: 'No items found',
    },
  },
  render(h, { scopedSlots, props }) {
    const { emptyMessage } = props;
    const { empty: emptySlot } = scopedSlots;
    if (emptySlot) {
      return (<div>{emptySlot({ emptyMessage })}</div>);
    }

    return (<div data-test="ec-smart-table-empty">{emptyMessage}</div>);
  },
};

const withEcSmartTableRenderer = (Component) => {
  const ComponentWithLoading = withLoading(Component);

  return createHOC(Component, {
    functional: true,
    props: {
      loading: Boolean,
      error: {},
      data: {},
      errorMessage: String,
      emptyMessage: String,
    },
    render(h, context) {
      const { props } = context;

      if (props.error) {
        return createRenderFn(EcSmartTableError).call(this, h, context);
      }

      const { items = [], total } = props.data || {};

      const tableProps = {
        ...props,
        errorMessage: null,
        emptyMessage: null,
        error: null,
        loading: null,
        data: items,
        totalRecords: total,
      };

      if (props.loading || items.length > 0) {
        tableProps.isLoading = props.loading;
        tableProps.isLoadingTransparent = items.length > 0;
        return createRenderFn(ComponentWithLoading).call(this, h, { ...context, props: tableProps });
      }

      return createRenderFn(EcSmartTableEmpty).call(this, h, context);
    },
  });
};

const withEcSmartTableContainer = createHOCc({
  name: 'EcSmartTable',
  data() {
    return {
      internalSorts: [],
    };
  },
  watch: {
    sorts: {
      immediate: true,
      handler(newSorts) {
        this.internalSorts = newSorts;
      },
    },
  },
  methods: {
    onSort(sorts) {
      this.internalSorts = [...sorts];
    },
  },
}, {
  props(props) {
    return { ...props, sorts: this.internalSorts, fetchArgs: { sorts: this.internalSorts } };
  },
  listeners: {
    sort(sorts) {
      this.onSort(sorts);
    },
  },
});

export default (
  withEcSmartTableContainer(
    withAbortableFetch(
      withSorting(
        withEcSmartTableRenderer(
          EcTable,
        ),
      ),
    ),
  )
);
</script>
