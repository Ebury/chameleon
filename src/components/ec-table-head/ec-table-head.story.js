import { storiesOf } from '@storybook/vue';
import { object } from '@storybook/addon-knobs';
import EcTableHead from './ec-table-head.vue';

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

const stories = storiesOf('Table Head', module);

stories.add('basic', () => ({
  components: { EcTableHead },
  props: {
    columns: {
      default: object('columns', columns),
    },
  },
  template: `
    <EcTableHead
      :columns="columns"
    ></EcTableHead>
    `,
}));

export default stories;
