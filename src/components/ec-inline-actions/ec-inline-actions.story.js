import { storiesOf } from '@storybook/vue';
import { object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import EcInlineActions from './ec-inline-actions.vue';
import EcIcon from '../ec-icon/ec-icon.vue';

const stories = storiesOf('Inline Actions', module);

stories.add('basic', () => ({
  components: { EcInlineActions, EcIcon },
  props: {
    items: {
      default: object('items', [
        [
          {
            text: 'First action',
            iconType: 'warning',
            icon: 'simple-trade-finance',
            tooltip: 'Random tooltip text',
          },
        ],
        [
          {
            name: 'reject',
            action: action('Reject action invoked.'),
            text: 'Reject',
          },
          {
            action: action('Authorise action invoked.'),
            text: 'Authorise',
            disabled: true,
            tooltip: 'Payment has not been executed yet',
            icon: 'simple-person',
            iconType: 'warning',
          },
        ],
        [
          { action: action('Cancel action invoked.'), text: 'Cancel', icon: 'simple-block' },
          { action: action('Loremipsum action invoked.'), text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: 'simple-sign-out' },
        ],
      ]),
    },
  },
  template: `
  <div style="display: flex; height: 100vh">
    <div style="margin: auto">
      <ec-inline-actions :items="items" :popover-options="{ open: true, offset: 10, placement: 'bottom-start' }">
        <ec-icon name="simple-more" :size="24" />
        <template v-slot:item-reject="{ item }">This is a custom {{ item.text }}</template>
      </ec-inline-actions>
    </div>
  </div>`,
}));

export default stories;
