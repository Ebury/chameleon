import { storiesOf } from '@storybook/vue';
import { text } from '@storybook/addon-knobs';
import EcTableCell from './ec-table-cell.vue';

const stories = storiesOf('Table Cell', module);

stories.add('basic', () => ({
  components: { EcTableCell },
  props: {
    slotContent: {
      type: String,
      default: text(
        'slotContent',
        'Table cell contents',
      ),
    },
  },
  template: `
    <div
      class="ec"
    >
      <EcTableCell>{{ slotContent }}</EcTableCell>
    </div>
  `,
}));

export default stories;
