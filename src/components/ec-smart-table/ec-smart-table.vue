<script>
import { createHOCc, createHOC, createRenderFn } from 'vue-hoc';
import EcTable from '../ec-table';
import EcTablePagination from '../ec-table-pagination';
import EcSmartTableEmpty from '../ec-smart-table-empty';
import EcSmartTableError from '../ec-smart-table-error';
import withSorting from '../../hocs/ec-with-sorting';
import withLoading from '../../hocs/ec-with-loading';
import withPagination from '../../hocs/ec-with-pagination';
import withFiltering from '../../hocs/ec-with-filtering';
import withAbortableFetch from '../../hocs/ec-with-abortable-fetch';

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
      const { props, scopedSlots } = context;
      const {
        title, error, errorMessage, emptyMessage, data, loading, ...unusedProps
      } = props;

      if (error) {
        return createRenderFn(EcSmartTableError).call(this, h, {
          ...context,
          props: { errorMessage, title },
        });
      }

      const { items = [], total } = data || {};

      if (loading || items.length > 0) {
        const tableProps = {
          ...unusedProps,
          isLoading: loading,
          isLoadingTransparent: items.length > 0,
          data: items,
          totalRecords: total,
        };

        const renderFilter = function renderFilter(filterSlot) {
          if (filterSlot) {
            return (<div class="ec-smart-table__filter">{filterSlot()}</div>);
          }
          return null;
        };

        return (
          <div class="ec-smart-table" data-test="ec-smart-table">
            { title ? (<div class="ec-smart-table__title">{title}</div>) : null }
            { renderFilter(scopedSlots.filter) }
            { createRenderFn(ComponentWithLoading).call(this, h, { ...context, props: tableProps }) }
          </div>
        );
      }

      return createRenderFn(EcSmartTableEmpty).call(this, h, {
        ...context,
        props: { emptyMessage, title },
      });
    },
  });
};

const withEcSmartTableContainer = createHOCc({
  name: 'EcSmartTable',
  props: ['sorts', 'page', 'numberOfItems', 'filter', 'fetchArgs'],
  computed: {
    dataSourceFetchArgs() {
      return {
        sorts: this.sorts,
        page: this.page,
        numberOfItems: this.numberOfItems,
        filter: this.filter,
        ...this.fetchArgs,
      };
    },
  },
}, {
  props(props) {
    return {
      ...props,
      fetchArgs: this.dataSourceFetchArgs,
    };
  },
});

const withEcSmartTablePagination = createHOCc({
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

const withEcSmartTableFilter = createHOCc({
  name: 'EcSmartTableFilter',
  props: ['filter', 'filterComponent'],
}, {
  props(props) {
    return {
      ...props,
      filterComponent: null,
      filter: null,
    };
  },
  scopedSlots(scopedSlots) {
    let filterSlot;
    const { filter, filterComponent } = this.$props;

    if (filterComponent) {
      filterSlot = () => this.$createElement(filterComponent, {
        props: {
          value: filter,
        },
        on: {
          change: (filters) => {
            this.$emit('pagination', 1); // reset the pagenigation to the first page
            this.$emit('filtering', filters);
          },
        },
      });
    }

    return {
      ...scopedSlots,
      filter: filterSlot,
    };
  },
});

export default (
  withPagination(
    withSorting(
      withFiltering(
        withEcSmartTableContainer(
          withAbortableFetch(
            withEcSmartTableFilter(
              withEcSmartTablePagination(
                withEcSmartTableRenderer(
                  EcTable,
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  )
);
</script>

<style>
.ec-smart-table {
  &__title {
    @apply tw-h3;
    @apply tw-pb-16;
  }

  &__filter {
    @apply tw-p-8;
  }
}
</style>
