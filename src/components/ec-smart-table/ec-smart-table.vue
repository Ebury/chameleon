<script>
import { h } from 'vue';

import withAbortableFetch from '../../hocs/ec-with-abortable-fetch';
import withFiltering from '../../hocs/ec-with-filtering';
import withLoading from '../../hocs/ec-with-loading';
import withPagination from '../../hocs/ec-with-pagination';
import withSorting from '../../hocs/ec-with-sorting';
import { createHOC, createHOCc } from '../../hocs/hoc';
import EcSmartTableEmpty from '../ec-smart-table-empty';
import EcSmartTableError from '../ec-smart-table-error';
import EcSmartTableHeading from '../ec-smart-table-heading';
import EcTable from '../ec-table';
import EcTablePagination from '../ec-table-pagination';

const withEcSmartTableRenderer = (Component) => {
  const ComponentWithLoading = withLoading(Component);

  return createHOC(Component, {
    name: 'EcSmartTableRenderer',
    compatConfig: { MODE: 3, INSTANCE_SCOPED_SLOTS: true },
    props: {
      loading: Boolean,
      error: {},
      data: {},
      errorMessage: String,
      emptyMessage: String,
    },
    render() {
      const attrs = this.$attrs;
      const props = this.$props;
      const slots = this.$scopedSlots;
      const {
        title, error, errorMessage, emptyMessage, data, loading, ...unusedProps
      } = props;

      if (error) {
        return h(EcSmartTableError, {
          errorMessage,
          title,
        }, slots);
      }

      const { items = [], total } = data || {};
      const isEmpty = items.length === 0;

      if (loading || !isEmpty) {
        const tableProps = {
          ...attrs,
          onError: null,
          onFiltering: null,
          onPagination: null,
          ...unusedProps,
          isLoading: loading,
          isLoadingTransparent: !isEmpty,
          data: items,
          totalRecords: total,
        };

        const tableSlots = {
          ...slots,
          empty: null,
          error: null,
          filter: null,
          'header-actions': null,
          pages: null,
        };

        const renderHeaderActions = function renderHeaderActions(headerActionsSlot) {
          return (
            headerActionsSlot({
              loading, items, error, total,
            })
          );
        };

        const renderTableComponent = function renderTableComponent() {
          if (isEmpty && loading) {
            return h('div', { class: 'tw-py-48' }, h(ComponentWithLoading, { ...tableProps }, tableSlots));
          }
          return h(ComponentWithLoading, { ...tableProps }, tableSlots);
        };

        const renderTableHeading = function renderTableHeading() {
          const actionsSlot = 'header-actions' in slots ? () => renderHeaderActions(slots['header-actions']) : null;
          return h(EcSmartTableHeading, {
            title,
          }, {
            filter: slots.filter,
            actions: actionsSlot,
          });
        };

        return h('div', {
          class: 'ec-smart-table',
          'data-test': 'ec-smart-table',
        }, [
          renderTableHeading(),
          renderTableComponent(),
        ]);
      }

      return h(EcSmartTableEmpty, {
        emptyMessage,
        title,
      }, slots);
    },
  });
};

const withEcSmartTableContainer = createHOCc({
  name: 'EcSmartTable',
  compatConfig: { MODE: 3, INSTANCE_SCOPED_SLOTS: true },
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
  compatConfig: { MODE: 3, INSTANCE_SCOPED_SLOTS: true },
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
  slots(slots) {
    // normally, footer slot is rendered by the ec-table, but we need to pass the EcTablePagination instead.
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
    // <tfoot><tr><td colspan="XX">
    //   <EcTablePagination>
    //     <template #total><slot name="footer" /></template>
    //   </EcTablePagination>
    // </td></tr></tfoot>

    const {
      isPaginationEnabled, page, numberOfItems, data,
    } = this.$props;
    const { total } = data ?? {};
    let footerSlot = slots.footer;

    if (isPaginationEnabled) {
      footerSlot = () => h(EcTablePagination, {
        page,
        total,
        numberOfItems,
        'data-test': 'ec-smart-table-pagination',
        onChange: (newPage, newNumberOfItems) => this.$emit('pagination', newPage, newNumberOfItems),
      }, {
        total: slots.footer,
        pages: slots.pages,
      });
    }

    return {
      ...slots,
      pages: null, // pages slot is passed to EcTablePagination, do not pass it down to ec-table
      footer: footerSlot,
    };
  },
});

const withEcSmartTableFilter = createHOCc({
  name: 'EcSmartTableFilter',
  compatConfig: { MODE: 3, INSTANCE_SCOPED_SLOTS: true },
  props: ['filter', 'filterComponent'],
}, {
  props(props) {
    return {
      ...props,
      filterComponent: null,
      filter: null,
    };
  },
  slots(slots) {
    let filterSlot = null;
    const { filter, filterComponent } = this.$props;

    if (filterComponent) {
      filterSlot = () => h(filterComponent, {
        modelValue: filter,
        onChange: (filters) => {
          this.$emit('pagination', 1); // reset the pagination to the first page
          this.$emit('filtering', filters);
        },
      });
    }

    return {
      ...slots,
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
