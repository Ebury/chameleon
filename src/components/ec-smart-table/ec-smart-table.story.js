import { storiesOf } from '@storybook/vue';
import {
  boolean,
  number,
  object,
  select,
  text,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import EcSmartTable from './ec-smart-table.vue';
import EcTableFilter from '../ec-table-filter';
import EcSyncMultipleValuesFilter from '../ec-sync-multiple-values-filter';
import EcDateRangeFilter from '../ec-date-range-filter';
import * as SortDirection from '../../enums/sort-direction';
import * as SortDirectionCycle from '../../enums/sort-direction-cycle';
import ecWithFilters from '../../hocs/ec-with-filters';

const MySmartTableFilter = ecWithFilters(EcTableFilter, [{
  label: 'Payment status',
  name: 'paymentStatus',
  component: EcSyncMultipleValuesFilter,
  items: [{ text: 'Paid', value: 'paid' }, { text: 'Cancelled', value: 'canceled' }, { text: 'Overdue', value: 'overdue' }],
  isSearchable: false,
  isSelectAll: false,
  selectAllFiltersText: '',
}, {
  label: 'Fee type',
  name: 'feeType',
  component: EcSyncMultipleValuesFilter,
  items: [{ text: 'Invoiced', value: 'invoiced' }, { text: 'Payment', value: 'payment' }],
  isSearchable: false,
  isSelectAll: false,
  selectAllFiltersText: '',
}, {
  label: 'Due date',
  name: 'dueDate',
  component: EcDateRangeFilter,
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

const stories = storiesOf('Table', module);

stories
  .add('smart', () => ({
    components: { EcSmartTable },
    props: {
      title: {
        default: text('title', 'Title'),
      },
      columns: {
        default: object('columns', columns),
      },
      sorts: {
        default: object('sorts', defaultSorts),
      },
      data: {
        default: object('data', data),
      },
      fetchArgs: {
        default: object('fetchArgs', { customProp: 'customValue' }),
      },
      multiSort: {
        default: boolean('multiSort', false),
      },
      maxHeight: {
        default: text('maxHeight', ''),
      },
      stickyColumn: {
        default: select('stickyColumn', ['', 'left', 'right']),
      },
      errorMessage: {
        default: text('errorMessage', ''),
      },
      emptyMessage: {
        default: text('emptyMessage', ''),
      },
      loadingDelay: {
        default: number('loadingDelay', 500),
      },
      failOnFetch: {
        default: boolean('failOnFetch', false),
      },
      fetchEmptyList: {
        default: boolean('fetchEmptyList', false),
      },
      sortCycle: {
        default: select('sortCycle', {
          lowestFirst: SortDirectionCycle.LOWEST_FIRST,
          highestFirst: SortDirectionCycle.HIGHEST_FIRST,
        }),
      },
      isPaginationEnabled: {
        default: boolean('isPaginationEnabled', true),
      },
      isFilteringEnabled: {
        default: boolean('isFilteringEnabled', true),
      },
      prefilter: {
        default: select('prefilter', Object.keys(prefilters), 'all'),
      },
    },
    methods: {
      onSort: action('sort'),
      onAborted: action('aborted'),
      onError: action('error'),
    },
    computed: {
      filterComponent() {
        return this.isFilteringEnabled ? MySmartTableFilter : null;
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
            ...args
          }, cancelToken) => {
            // use real service in a real application:
            // e.g.
            // return myService.getData(sorts, page, numberOfItems, filter, cancelToken);
            // and pass the cancelToken into a fetch() call
            // e.g.
            // getData: (sorts, page, numberOfItems, filter, cancelToken) => fetch('/my/url', { body: { sorts, page, numberOfItems, ...filter }, signal: cancelToken });

            action('fetching')(sorts, page, numberOfItems, JSON.stringify(filter), JSON.stringify(args));

            return new Promise((resolve, reject) => {
              this.loadingTimeout = setTimeout(() => {
                action('resolving data')(sorts, page, numberOfItems, JSON.stringify(filter), JSON.stringify(args));
                if (this.failOnFetch) {
                  reject(new Error('Random error'));
                } else if (this.fetchEmptyList) {
                  resolve({
                    items: [],
                    total: 0,
                    count: 0,
                  });
                } else {
                  resolve({
                    items: this.data,
                    total: 52,
                    count: Math.min(this.data.length, numberOfItems),
                  });
                }
              }, this.loadingDelay);

              cancelToken.addEventListener('abort', () => {
                action('fetch cancelled')();
                clearTimeout(this.loadingTimeout);
              });
            });
          },
        },
      };
    },

    template: `
      <div class="tw-flex tw-h-screen tw-px-20">
        <div class="tw-my-auto tw-mx-20 tw-w-full ec-card">
          <ec-smart-table
            :title="title"
            :columns="columns"
            :sorts="sorts"
            :multi-sort="multiSort"
            :data-source="dataSource"
            :fetch-args="fetchArgs"
            :max-height="maxHeight"
            :sticky-column="stickyColumn || null"
            :error-message="errorMessage || undefined"
            :empty-message="emptyMessage || undefined"
            :sort-cycle="sortCycle"
            :is-pagination-enabled="isPaginationEnabled"
            :filter-component="filterComponent"
            :filter="prefilters[prefilter]"
            @sort="onSort"
            @abort="onAborted"
            @error="onError">
            <template #error="{ errorMessage }">
              <div class="tw-text-error">Error state template - {{ errorMessage }}</div>
            </template>
            <template #empty="{ emptyMessage }">
              Empty state template - {{ emptyMessage }}
            </template>
            <template #footer><div class="tw-text-right">Custom footer info</div></template>
            <template #pages="{ page, totalPages, total}">{{ page }}&nbsp;of&nbsp;{{ totalPages }} pages ({{ total }}&nbsp;ipsums)</template>
          </ec-smart-table>
        </div>
      </div>
    `,
  }), {
    visualRegressionTests: {
      waitOn: '.ec-table',
    },
  });
