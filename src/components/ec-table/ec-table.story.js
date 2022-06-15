import { action } from '@storybook/addon-actions';

import * as SortDirection from '../../enums/sort-direction';
import EcIcon from '../ec-icon/ec-icon.vue';
import EcTable from './ec-table.vue';

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

export default {
  title: 'Table',
  component: EcTable,
  argTypes: {
    stickyColumn: {
      options: ['left', 'right'],
      control: { type: 'select' },
    },
  },
};

const Template = args => ({
  components: { EcTable },
  setup() {
    return {
      args,
      onSort: action('sort'),
      onRowClick: action('rowClick'),
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-table v-bind="args" v-on="{ sort: onSort, 'row-click': onRowClick }" />
    </div>
  `,
});

export const basic = Template.bind({});

basic.args = {
  title: 'Title',
  columns,
  sorts,
  data,
  maxHeight: '400px',
};

basic.parameters = {
  visualRegressionTests: { disable: true },
};

export const all = args => ({
  components: { EcTable, EcIcon },
  setup() {
    return {
      args,
      onSort: action('sort'),
      onRowClick: action('rowClick'),
    };
  },
  template: `
    <div class="tw-flex tw-flex-col">
      <h2 class="tw-m-24">Basic</h2>
      <div class="tw-my-auto tw-mx-20 ec-card" style="width: 90vw">
        <ec-table v-bind="args" v-on="{ sort: onSort, 'row-click': onRowClick }" />
        <p class="tw-mt-40"><em>NOTE:</em> Sorting in this example is not hooked into any functionality, because this is just a basic example. You can change the direction in the controls panel or if you want to see it working, checkout smart table story instead.</p>
      </div>
      <h2 class="tw-m-24">With custom column templates</h2>
      <div class="tw-my-auto tw-mx-20 ec-card" style="width: 90vw">
        <ec-table v-bind="args" v-on="{ sort: onSort, 'row-click': onRowClick }">
          <template #col2="{ content, row }">
            <a href="#"><em><strong>{{ content }}</strong></em></a>
            <div>This<br/>is<br/>a<br/>very<br/>tall<br/>column</div>
          </template>
          <template #col4="{ content, row }">
            <small>This cell item has type of 'icon' so will be horizontally centered</small>
            <div>
              <ec-icon name="rounded-check" :size="24" />
            </div>
          </template>
        </ec-table>
      </div>
      <h2 class="tw-m-24">With footer slot</h2>
      <div class="tw-my-auto tw-mx-20 ec-card" style="width: 90vw">
        <ec-table v-bind="args" v-on="{ sort: onSort, 'row-click': onRowClick }">
          <template #footer>
            <div class="tw-py-8">
              <a href="#">View all</a>
            </div>
          </template>
        </ec-table>
      </div>
      <h2 class="tw-m-24">With a fixed height and sticky column</h2>
      <div class="tw-my-auto tw-mx-20 ec-card" style="width: 90vw">
        <ec-table v-bind="args" v-on="{ sort: onSort, 'row-click': onRowClick }" sticky-column="left"/>
      </div>
    </div>
  `,
});

all.args = {
  ...basic.args,
};
