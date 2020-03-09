import { storiesOf } from '@storybook/vue';
import {
  object,
  text,
  boolean,
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

const sorts = [
  {
    direction: SortDirection.ASC,
    column: 'request-details',
  },
  {
    direction: SortDirection.DESC,
    column: 'original-amount',
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
        default: object('sorts', sorts),
      },
      data: {
        default: object('data', data),
      },
      showFooter: {
        default: boolean('showFooter', false),
      },
      multiSort: {
        default: boolean('multiSort', false),
      },
    },
    methods: {
      onSort: action('sort'),
    },
    template: `
      <div style="display: flex; height: 100vh">
        <div style="margin: auto 20px; width: 100vw" class="ec-card" >
          <ec-smart-table
            :data="data"
            :title="title"
            :columns="columns"
            :sorts="sorts"
            :show-footer="showFooter"
            :multi-sort="multiSort"
            @sort="onSort" />
        </div>
      </div>
      `,
  }));

export default stories;
