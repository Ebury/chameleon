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
import * as SortDirection from '../../enums/sort-direction';

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
      showFooter: {
        default: boolean('showFooter', true),
      },
      multiSort: {
        default: boolean('multiSort', false),
      },
      maxHeight: {
        default: text('maxHeight', null),
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
    },
    methods: {
      onSort: action('sort'),
      onAborted: action('aborted'),
      onError: action('error'),
    },
    data() {
      return {
        dataSource: {
          fetch: ({ sorts /* , pagination coming soon */ }, cancelToken) => {
            // use real service in a real application:
            // e.g.
            // return myService.getData(sorts, pagination, cancelToken);
            // and pass the cancelToken into a fetch() call
            // e.g.
            // getData: (sorts, pagination, cancelToken) => fetch('/my/url', { body: { sorts, pagination }, signal: cancelToken });

            action('fetching')(sorts);

            return new Promise((resolve, reject) => {
              this.loadingTimeout = setTimeout(() => {
                action('resolving data')(sorts);
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
                    total: this.data.length,
                    count: this.data.length,
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
            :show-footer="showFooter"
            :multi-sort="multiSort"
            :data-source="dataSource"
            :max-height="maxHeight"
            :sticky-column="stickyColumn || null"
            :error-message="errorMessage || undefined"
            :empty-message="emptyMessage || undefined"
            @sort="onSort"
            @abort="onAborted"
            @error="onError">
            <template #error="{ errorMessage }">
              <div class="tw-text-error">Error state template - {{ errorMessage }}</div>
            </template>
            <template #empty="{ emptyMessage }">
              Empty state template - {{ emptyMessage }}
            </template>
          </ec-smart-table>
        </div>
      </div>
    `,
  }), {
    visualRegressionTests: {
      waitOn: '.ec-table',
    },
  });
