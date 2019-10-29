import { storiesOf } from '@storybook/vue';
import {
  object,
  text,
  number,
  boolean,
} from '@storybook/addon-knobs';
import EcTable from './ec-table.vue';

const columns = [
  {
    name: 'Request details',
  },
  {
    name: 'Original amount',
  },
  {
    name: 'Repayment date',
  },
  {
    name: 'Status',
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
    'bat',
  ],
];

const stories = storiesOf('Table', module);

stories
  .add('basic', () => ({
    components: { EcTable },
    props: {
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
      <div>
        <EcTable
          :columns="columns"
          :data="data"
          :totalRecords="totalRecords"
          :showFooter="showFooter"
        />
      </div>
      `,
  }))
  .add('with a custom column templates', () => ({
    components: { EcTable },
    props: {
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
      <div>
        <EcTable
          :columns="columns"
          :data="data"
          :totalRecords="totalRecords"
          :showFooter="showFooter"
        >
          <template
            v-slot:col2="{ content, row }"
          >
            <a href="#"><em><strong>{{ content }}</strong></em></a>
          </template>
          <template
            v-slot:col4="{ content, row }"
          >
            <small>Item is currently</small><br>
            <strong>{{ content }}</strong>
          </template>
        </EcTable>
      </div>
      `,
  }))
  .add('with a footer tooltip content', () => ({
    components: { EcTable },
    props: {
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
      tooltip: {
        default: text('tooltip', 'Tooltip content goes here'),
      },
    },
    template: `
      <div>
        <EcTable
          :columns="columns"
          :data="data"
          :totalRecords="totalRecords"
          :showFooter="showFooter"
        >
          <template
            v-slot:tableTooltip="content"
          >{{ tooltip }}</template>
        </EcTable>
      </div>
      `,
  }));

export default stories;
