import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';

import EcIcon from '../ec-icon/ec-icon.vue';
import { IconName, IconType } from '../ec-icon/types';
import EcInlineActions from './ec-inline-actions.vue';

const meta: Meta = {
  title: 'Inline Actions',
  component: EcInlineActions,
};

export default meta;

const Template: StoryFn<typeof EcInlineActions> = args => ({
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
        iconType: IconType.WARNING,
        icon: IconName.SIMPLE_TRADE_FINANCE,
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
        icon: IconName.SIMPLE_PERSON,
        iconType: IconType.WARNING,
      },
    ],
    [
      { action: action('cancel'), text: 'Cancel', icon: IconName.SIMPLE_BLOCK },
      { action: action('lorem ipsum'), text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: IconName.SIMPLE_SIGN_OUT },
    ],
  ],
  popoverOptions: { shown: true },
};
