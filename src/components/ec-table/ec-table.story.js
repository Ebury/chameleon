import { storiesOf } from '@storybook/vue';
import {
  object,
  text,
  number,
  select,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import EcIcon from '@/components/ec-icon/ec-icon.vue';
import EcTable from './ec-table.vue';
import * as SortDirection from '../../enums/sort-direction';

const columns = [
  {
    name: 'request-details',
    title: 'Request details',
    sortable: true,
    minWidth: '200px',
  },
  {
    name: 'original-amount',
    title: 'Original amount',
    sortable: true,
    tooltip: 'This is info test',
    type: 'currency',
  },
  {
    name: 'repayment-date',
    title: 'Repayment date',
    sortable: true,
    minWidth: '300px',
  },
  {
    title: 'Status',
    type: 'icon',
    tooltip: 'This is info test',
  },
  {
    name: 'long-text',
    title: 'Text too long to display',
    maxWidth: '120px',
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
    'EUR 100',
    'ipsum',
    'dolor',
    'sit amet, consectetur adipiscing elit. Vestibulum eget ultricies turpis',
  ],
  [
    'foo',
    'GBP 200',
    'bar',
    'baz',
    'qux',
  ],
];

const stories = storiesOf('Table', module);

stories
  .add('basic', () => ({
    components: { EcTable },
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
      totalRecords: {
        default: number('totalRecords', undefined),
      },
      maxHeight: {
        default: text('maxHeight', '400px'),
      },
      stickyColumn: {
        default: select('stickyColumn', ['left', 'right'], 'left'),
      },
    },
    methods: {
      onSort: action('sort'),
      onRowClick: action('onRowClick'),
    },
    template: `
      <div style="display: flex; height: 100vh">
        <div style="margin: auto 20px; width: 90vw" class="ec-card" >
          <ec-table v-bind="$props" @sort="onSort" @row-click="onRowClick" />
          <p class="ec-mt--40"><em>NOTE:</em> Sorting in this example is not hooked into any functionality, because this is just a basic example. You can change the direction in the knobs panel or if you want to see it working, checkout smart table story instead.</p>
        </div>
      </div>
      `,
  }))
  .add('with a custom column templates', () => ({
    components: { EcTable, EcIcon },
    props: {
      title: {
        default: text('title', 'Title'),
      },
      columns: {
        default: object('columns', columns.map(c => ({ ...c, sortable: false }))),
      },
      data: {
        default: object('data', data),
      },
      totalRecords: {
        default: number('totalRecords', undefined),
      },
    },
    template: `
    <div style="display: flex; height: 100vh">
      <div style="margin: auto 20px; width: 100vw" class="ec-card" >
        <ec-table v-bind="$props">
          <template
            v-slot:col2="{ content, row }"
          >
            <a href="#"><em><strong>{{ content }}</strong></em></a>
            <div>This</br>is</br>a</br>very</br>tall</br>column</div>
          </template>
          <template
            v-slot:col4="{ content, row }"
          >
            <small>This cell item has type of 'icon' so will be horizontally centered</small>
            <div>
              <ec-icon name="rounded-check" :size="24" />
            </div>
          </template>
        </ec-table>
      </div>
    </div>
    `,
  }))
  .add('with footer slot', () => ({
    components: { EcTable },
    props: {
      title: {
        default: text('title', 'Title'),
      },
      columns: {
        default: object('columns', columns.map(c => ({ ...c, sortable: false }))),
      },
      data: {
        default: object('data', data),
      },
      totalRecords: {
        default: number('totalRecords', undefined),
      },
    },
    template: `
    <div style="display: flex; height: 100vh">
      <div style="margin: auto 20px; width: 100vw" class="ec-card" >
        <ec-table v-bind="$props"
        >
          <template #footer>
            <div class="tw-text-center tw-py-8">
              <a href="#">View all</a>
            </div>
          </template>
        </ec-table>
      </div>
    </div>
    `,
  }))
  .add('with a fixed height and sticky column', () => ({
    components: { EcTable },
    props: {
      title: {
        default: text('title', 'Title'),
      },
      columns: {
        default: object('columns', columns.map(c => ({ ...c, sortable: false, minWidth: '250px' }))),
      },
      data: {
        default: object('data', [...data, ...data]),
      },
      maxHeight: {
        default: number('maxHeight', '400px'),
      },
      stickyColumn: {
        default: select('stickyColumn', ['left', 'right'], 'left'),
      },
    },
    template: `
    <div style="display: flex; height: 100vh">
      <div style="margin: auto 20px; width: 90vw" class="ec-card" >
        <ec-table v-bind="$props" />
      </div>
    </div>
    `,
  }));

export default stories;
