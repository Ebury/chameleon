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
  .addParameters({
    visualRegressionTests: { waitForDOM: 1000 },
  })
  .add('all', () => ({
    components: { EcTable, EcIcon },
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
        default: select('stickyColumn', { none: undefined, left: 'left', right: 'right' }, undefined),
      },
    },
    methods: {
      onSort: action('sort'),
      onRowClick: action('onRowClick'),
    },
    template: `
      <div class="tw-flex tw-flex-col tw-h-screen">
        <h2 class="feature-title tw-m-24">Basic</h2>
        <div class="tw-my-auto tw-mx-20 ec-card" style="width: 90vw">
          <ec-table v-bind="$props" @sort="onSort" @row-click="onRowClick" />
          <p class="ec-mt--40"><em>NOTE:</em> Sorting in this example is not hooked into any functionality, because this is just a basic example. You can change the direction in the knobs panel or if you want to see it working, checkout smart table story instead.</p>
        </div>
        <h2 class="feature-title tw-m-24">With custom column templates</h2>
        <div class="tw-my-auto tw-mx-20 ec-card" style="width: 90vw">
          <ec-table v-bind="$props" @sort="onSort" @row-click="onRowClick"
          >
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
        <h2 class="feature-title tw-m-24">With footer slot</h2>
        <div class="tw-my-auto tw-mx-20 ec-card" style="width: 90vw">
          <ec-table v-bind="$props" @sort="onSort" @row-click="onRowClick"
          >
            <template #footer>
              <div class="tw-py-8">
                <a href="#">View all</a>
              </div>
            </template>
          </ec-table>
        </div>
        <h2 class="feature-title tw-m-24">With a fixed height and sticky column</h2>
        <div class="tw-my-auto tw-mx-20 ec-card" style="width: 90vw">
          <ec-table v-bind="$props" @sort="onSort" @row-click="onRowClick" sticky-column="left"/>
        </div>
    </div>
    `,
  }));

export default stories;
