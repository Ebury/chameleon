import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';

import EcFileList from './ec-file-list.vue';

const meta: Meta = {
  title: 'File List',
  component: EcFileList,
};

export default meta;

function generateFile(name: string): File {
  return new File([], name);
}

const items: File[] = [
  generateFile('My invoice.pdf'),
  generateFile('This is a very long file name that is for testing the ellipses.pdf'),
  generateFile('DOC_123123_2423490802348_12312323.pdf'),
  generateFile('number_rates_trades.xscl'),
  generateFile('untitled.pdf'),
];

const Template: StoryFn<typeof EcFileList> = args => ({
  components: { EcFileList },
  setup() {
    return {
      args,
      onDelete: action('delete'),
    };
  },
  template: `
    <div class="tw-p-20">
      <ec-file-list
        v-bind="args"
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
