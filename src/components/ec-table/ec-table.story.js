import { storiesOf } from '@storybook/vue';
import {
  object,
  text,
  number,
  boolean,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import EcTable from './ec-table.vue';
import EcIcon from '@/components/ec-icon/ec-icon.vue';
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

const tooltipConfig = {
  content: 'This is the tooltip info',
  classes: ['ec-tooltip--bg-bright'],
  placement: 'bottom',
};

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
      showFooter: {
        default: boolean('showFooter', false),
      },
    },
    methods: {
      onSort: action('sort'),
    },
    template: `
      <div style="display: flex; height: 100vh">
        <div style="margin: auto 20px; width: 100vw" class="ec-card" >
          <ec-table v-bind="$props" @sort="onSort" />
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
        default: object('columns', columns),
      },
      data: {
        default: object('data', data),
      },
      totalRecords: {
        default: number('totalRecords', undefined),
      },
      showFooter: {
        default: boolean('showFooter', false),
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
  .add('with a footer tooltip content', () => ({
    components: { EcTable },
    props: {
      title: {
        default: text('title', 'Title'),
      },
      columns: {
        default: object('columns', columns),
      },
      data: {
        default: object('data', data),
      },
      totalRecords: {
        default: number('totalRecords', undefined),
      },
      showFooter: {
        default: boolean('showFooter', true),
      },
      tooltipConfig: {
        default: object('tooltipConfig', tooltipConfig),
      },
    },
    template: `
    <div style="display: flex; height: 100vh">
      <div style="margin: auto 20px; width: 100vw" class="ec-card" >
        <ec-table v-bind="$props" />
      </div>
    </div>
    `,
  }));

export default stories;
