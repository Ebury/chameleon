import { storiesOf } from '@storybook/vue';
import {
  object,
  text,
  number,
  boolean,
} from '@storybook/addon-knobs';
import EcTable from './ec-table.vue';
import EcIcon from '@/components/ec-icon/ec-icon.vue';

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
    type: 'icon',
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
      <div style="display: flex;height: 100vh">
        <div style="margin: auto 20px; width: 100vw" class="ec-card" >
          <ec-table
            :columns="columns"
            :data="data"
            :totalRecords="totalRecords"
            :showFooter="showFooter"
            :title="title"
          />
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
    <div style="display: flex;height: 100vh">
      <div style="margin: auto 20px; width: 100vw" class="ec-card" >
        <ec-table
          :columns="columns"
          :data="data"
          :totalRecords="totalRecords"
          :showFooter="showFooter"
          :title="title"
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
      tooltip: {
        default: object('tooltip', tooltipConfig),
      },
    },
    template: `
    <div style="display: flex;height: 100vh">
      <div style="margin: auto 20px; width: 100vw" class="ec-card" >
        <ec-table
          :columns="columns"
          :data="data"
          :totalRecords="totalRecords"
          :showFooter="showFooter"
          :tooltipConfig="tooltip"
          :title="title"
        />
      </div>
    </div>
    `,
  }));

export default stories;
