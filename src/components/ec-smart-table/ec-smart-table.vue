<script>
import { createHOCc, createHOC, createRenderFn } from 'vue-hoc';
import EcTable from '../ec-table';
import EcTablePagination from '../ec-table-pagination';
import withSorting from '../../hocs/ec-with-sorting';
import withLoading from '../../hocs/ec-with-loading';
import withPagination from '../../hocs/ec-with-pagination';
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
  props: ['sorts', 'page', 'numberOfItems'],
}, {
  props(props) {
    return {
      ...props,
      fetchArgs: {
        sorts: this.sorts,
        page: this.page,
        numberOfItems: this.numberOfItems,
      },
    };
  },
});

const withSmartTablePagination = createHOCc({
  name: 'EcSmartTablePagination',
  props: ['page', 'numberOfItems', 'isPaginationEnabled'],
}, {
  props(props) {
    return {
      ...props,
      page: null,
      numberOfItems: null,
      isPaginationEnabled: null,
    };
  },
  scopedSlots(scopedSlots) {
    // normaly, footer slot is rendered by the ec-table, but we need to pass the EcTablePagination instead.
    // EcTablePagination has another slot, called total, which we can use for showing the content of the original
    // footer slot.
    // so if you say
    // <ec-smart-table>
    //   <template #footer>My Footer</template>
    // </ec-smart-table>
    //
    // then if the pagination is not enabled it will render everything as usual
    // <tfoot><tr><td colspan="XX">My Footer</td></tr></tfoot>
    //
    // and if the pagination is enabled it will render EcTablePagination and passes the content of footer slot
    // into the total slot:
    // <tfoor><tr><td colspan="XX">
    //   <EcTablePagination>
    //     <template #total><slot name="footer" /></template>
    //   </EcTablePagination>
    // </td></tr></tfoor>

    const {
      isPaginationEnabled, page, numberOfItems, data,
    } = this.$props;
    const { total } = data ?? {};
    let footerSlot = scopedSlots.footer;

    if (isPaginationEnabled) {
      footerSlot = () => this.$createElement(EcTablePagination, {
        props: {
          page,
          total,
          numberOfItems,
        },
        attrs: {
          'data-test': 'ec-smart-table-pagination',
        },
        on: {
          change: (newPage, newNumberOfItems) => this.$emit('pagination', newPage, newNumberOfItems),
        },
        scopedSlots: {
          total: scopedSlots.footer,
          pages: scopedSlots.pages,
        },
      });
    }

    return {
      ...scopedSlots,
      pages: null, // pages slot is passed to EcTablePagination, do not pass it down to ec-table
      footer: footerSlot,
    };
  },
});

export default (
  withPagination(
    withSorting(
      withEcSmartTableContainer(
        withAbortableFetch(
          withSmartTablePagination(
            withEcSmartTableRenderer(
              EcTable,
            ),
          ),
        ),
      ),
    ),
  )
);
</script>
