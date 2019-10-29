import { storiesOf } from '@storybook/vue';
import { number, text } from '@storybook/addon-knobs';

import EcTableFooter from './ec-table-footer.vue';

const stories = storiesOf('Table Footer', module);


stories
  .add('basic', () => (
    {
      components: {
        EcTableFooter,
      },
      props: {
        itemsInView: {
          default: number('itemsInView', 30),
        },
        totalItems: {
          default: number('totalItems', 0),
        },
      },
      template: `
        <EcTableFooter
          :itemsInView="itemsInView"
          :totalItems="totalItems"
        />
      `,
    }
  ))
  .add('with tooltip', () => (
    {
      components: {
        EcTableFooter,
      },
      props: {
        tooltip: {
          default: text(
            'tooltip',
            'Foo Bar Somthing',
          ),
        },
        itemsInView: {
          default: number('itemsInView', 30),
        },
        totalItems: {
          default: number('totalItems', 0),
        },
      },
      template: `
        <EcTableFooter
          :itemsInView="itemsInView"
          :totalItems="totalItems"
        >
          <template
            v-slot:tooltip="content"
          >{{ tooltip }}</template>
        </EcTableFooter>
      `,
    }
  ));

export default stories;
