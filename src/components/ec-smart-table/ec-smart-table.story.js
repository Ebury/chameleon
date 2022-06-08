import { action } from '@storybook/addon-actions';
import { markRaw } from 'vue';

import * as SortDirection from '../../enums/sort-direction';
import * as SortDirectionCycle from '../../enums/sort-direction-cycle';
import ecWithFilters from '../../hocs/ec-with-filters';
import EcDateRangeFilter from '../ec-date-range-filter';
import EcSyncMultipleValuesFilter from '../ec-sync-multiple-values-filter';
import EcTableFilter from '../ec-table-filter';
import EcSmartTable from './ec-smart-table.vue';

const MySmartTableFilter = ecWithFilters(EcTableFilter, [{
  label: 'Payment status',
  name: 'paymentStatus',
  component: markRaw(EcSyncMultipleValuesFilter),
  items: [{ text: 'Paid', value: 'paid' }, { text: 'Cancelled', value: 'canceled' }, { text: 'Overdue', value: 'overdue' }],
  isSearchable: false,
  isSelectAll: false,
  selectAllFiltersText: '',
}, {
  label: 'Fee type',
  name: 'feeType',
  component: markRaw(EcSyncMultipleValuesFilter),
  items: [{ text: 'Invoiced', value: 'invoiced' }, { text: 'Payment', value: 'payment' }],
  isSearchable: false,
  isSelectAll: false,
  selectAllFiltersText: '',
}, {
  label: 'Due date',
  name: 'dueDate',
  component: markRaw(EcDateRangeFilter),
  fromLabelText: 'From',
  toLabelText: 'To',
  clearText: 'Clear dates',
  errorMessage: '',
}]);

const columns = [
  {
    name: 'request-details',
    title: 'Request details',
    sortable: true,
  },
  {
    name: 'original-amount',
    title: 'Original amount',
    sortable: true,
    sortCycle: SortDirectionCycle.HIGHEST_FIRST,
  },
  {
    name: 'repayment-date',
    title: 'Repayment date',
    sortable: true,
  },
  {
    title: 'Status',
    type: 'icon',
  },
];

const defaultSorts = [
  {
    direction: SortDirection.ASC,
    column: 'request-details',
  },
];

const data = [
  [
    'Lorem',
    'ipsum',
    'dolor',
    'sit',
  ],
  [
    'foo',
    'bar',
    'baz',
    'sit',
  ],
];

const prefilters = {
  all: {},
  onlyOverdue: { paymentStatus: [{ text: 'Overdue', value: 'overdue' }], feeType: [{ text: 'Payment', value: 'payment' }] },
  onlyInvoiced: { feeType: [{ text: 'Invoiced', value: 'invoiced' }] },
  inThePast: { dueDate: { to: '2020-11-23' } },
};

export default {
  title: 'Smart Table',
  component: EcSmartTable,
};

export const basic = args => ({
  components: { EcSmartTable },
  setup() {
    return {
      args,
    };
  },
  computed: {
    filterComponent() {
      return args.isFilteringEnabled ? MySmartTableFilter : null;
    },
  },
  data() {
    return {
      prefilters,
      dataSource: {
        fetch: ({
          sorts,
          page = 1,
          numberOfItems,
          filter,
          ...fetchArgs
        }, cancelToken) => {
          // use real service in a real application:
          // e.g.
          // return myService.getData(sorts, page, numberOfItems, filter, cancelToken);
          // and pass the cancelToken into a fetch() call
          // e.g.
          // getData: (sorts, page, numberOfItems, filter, cancelToken) => fetch('/my/url', { body: { sorts, page, numberOfItems, ...filter }, signal: cancelToken });

          action('fetching')(sorts, page, numberOfItems, JSON.stringify(filter), JSON.stringify(fetchArgs));

          return new Promise((resolve, reject) => {
            this.loadingTimeout = setTimeout(() => {
              action('resolving data')(sorts, page, numberOfItems, JSON.stringify(filter), JSON.stringify(fetchArgs));
              if (args.failOnFetch) {
                reject(new Error('Random error'));
              } else if (args.fetchEmptyList) {
                resolve({
                  items: [],
                  total: 0,
                  count: 0,
                });
              } else {
                resolve({
                  items: args.data,
                  total: 52,
                  count: Math.min(args.data.length, numberOfItems),
                });
              }
            }, args.loadingDelay);

            cancelToken.addEventListener('abort', () => {
              action('fetch cancelled')();
              clearTimeout(this.loadingTimeout);
            });
          });
        },
      },
    };
  },
  methods: {
    onSort: action('sort'),
    onAbort: action('abort'),
    onError: action('error'),
  },
  template: `
    <div class="tw-flex tw-h-screen tw-px-20">
      <div class="tw-my-auto tw-mx-20 tw-w-full ec-card">
        <ec-smart-table
          v-bind="{
            ...args,
            loadingDelay: null,
            failOnFetch: null,
            fetchEmptyList: null,
            isFilteringEnabled: null,
            prefilter: null,
          }"
          :data-source="dataSource"
          :filter-component="filterComponent"
          :filter="prefilters[prefilter]"
          v-on="{
            sort: onSort,
            abort: onAbort,
            error: onError,
          }">
          <template #header-actions="{ total, items, error, loading }">
            <a href="#">Download</a>
          </template>
          <template #error="{ errorMessage }">
            <div class="tw-text-error">Error state template - {{ errorMessage }}</div>
          </template>
          <template #empty="{ emptyMessage }">
            Empty state template - {{ emptyMessage }}
          </template>
          <template #footer><div class="tw-text-right">Custom footer info</div></template>
          <template #pages="{ page, totalPages, total }">{{ page }}&nbsp;of&nbsp;{{ totalPages }} pages ({{ total }}&nbsp;ipsums)</template>
        </ec-smart-table>
      </div>
    </div>
  `,
});

basic.argTypes = {
  stickyColumn: {
    options: ['left', 'right'],
    control: { type: 'select' },
  },
  sortCycle: {
    options: {
      lowestFirst: SortDirectionCycle.LOWEST_FIRST,
      highestFirst: SortDirectionCycle.HIGHEST_FIRST,
    },
    control: { type: 'select' },
  },
  prefilter: {
    options: Object.keys(prefilters),
    control: { type: 'select' },
  },
};

basic.args = {
  title: 'Title',
  columns,
  sorts: defaultSorts,
  data,
  fetchArgs: { customProp: 'customValue' },
  multiSort: false,
  maxHeight: '',
  loadingDelay: 500,
  failOnFetch: false,
  fetchEmptyList: false,
  isPaginationEnabled: true,
  isFilteringEnabled: true,
  prefilter: 'all',
};

basic.parameters = {
  visualRegressionTests: {
    waitOn: '.ec-table',
  },
};
