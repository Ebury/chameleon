import { action } from '@storybook/addon-actions';
import EcFileList from './ec-file-list.vue';

export default {
  title: 'File List',
  component: EcFileList,
};

const items = [
  { name: 'My invoice.pdf' },
  { name: 'This is a very long file name that is for testing the ellipses.pdf' },
  { name: 'DOC_123123_2423490802348_12312323.pdf' },
  { name: 'number_rates_trades.xscl' },
  { name: 'untitled.pdf' },
];

const Template = (args, { argTypes }) => ({
  components: { EcFileList },
  props: Object.keys(argTypes),
  methods: {
    onDelete(item) {
      action('delete');
      console.log('delete', item.name);
    },
  },
  template: `
    <div class="tw-p-20">
        <ec-file-list
        v-bind="$props"
        v-on="{
          delete: onDelete,
        }">
        </ec-file-list>
    </div>
  `,
});

export const basic = Template.bind({});

basic.args = {
  items,
};
