import { storiesOf } from '@storybook/vue';
import { object } from '@storybook/addon-knobs';
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
            href: '/example.jpg',
            download: 'example.jpg',
            disabled: true,
          },
        ],
        [
          {
            name: 'reject',
            action: () => console.log('Reject action invoked.'),
            text: 'Reject',
          },
          {
            action: () => console.log('Authorise action invoked.'),
            text: 'Authorise',
            disabled: true,
            tooltip: 'Payment has not been executed yet',
            icon: 'simple-person',
            iconType: 'warning',
          },
        ],
        [
          { action: () => console.log('Cancel action invoked.'), text: 'Cancel', icon: 'simple-block' },
          { action: () => console.log('Loremipsum action invoked.'), text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: 'simple-sign-out' },
        ],
      ]),
    },
  },
  template: `
  <div class="tw-flex tw-h-screen">
    <div class="tw-m-auto">
      <ec-inline-actions :items="items" :popoverOptions="{ open: true }">
        <ec-icon name="simple-more" :size="24" />
        <template v-slot:item-reject="{ item }">This is a custom {{ item.text }}</template>
      </ec-inline-actions>
    </div>
  </div>`,
}));

export default stories;
