import { action } from '@storybook/addon-actions';

import EcIcon from '../ec-icon/ec-icon.vue';
import EcInlineActions from './ec-inline-actions.vue';

export default {
  title: 'Inline Actions',
  component: EcInlineActions,
};

const Template = args => ({
  components: { EcInlineActions, EcIcon },
  setup() {
    return { args };
  },
  template: `
    <div class="tw-flex tw-h-screen">
      <div class="tw-m-auto">
        <ec-inline-actions v-bind="args">
          <ec-icon name="simple-more" :size="24" />
          <template #item-reject="{ item }">This is a custom {{ item.text }}</template>
        </ec-inline-actions>
      </div>
    </div>
  `,
});

export const basic = Template.bind({});

basic.args = {
  items: [
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
        action: action('reject'),
        text: 'Reject',
      },
      {
        action: action('authorise'),
        text: 'Authorise',
        disabled: true,
        tooltip: 'Payment has not been executed yet',
        icon: 'simple-person',
        iconType: 'warning',
      },
    ],
    [
      { action: action('cancel'), text: 'Cancel', icon: 'simple-block' },
      { action: action('lorem ipsum'), text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: 'simple-sign-out' },
    ],
  ],
  popoverOptions: { shown: true },
};
