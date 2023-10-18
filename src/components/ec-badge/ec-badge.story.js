import { reactive } from 'vue';

import EcBadge from './ec-badge.vue';

export default {
  title: 'Badge',
  component: EcBadge,
  argTypes: {
    type: {
      options: ['error', 'info', 'success', 'warning'],
      control: { type: 'select' },
    },
  },
};

const Template = args => ({
  components: { EcBadge },
  setup() {
    return {
      args,
    };
  },
  template: `
    <ec-badge
      v-bind="args"
      class="tw-m-8"
    />
  `,
});

export const basic = Template.bind({});

basic.args = {
  value: '1',
};

export const all = args => ({
  components: { EcBadge },
  setup() {
    const badges = reactive([
      {
        title: 'Simple text',
        data: [
          { value: 'Info Badge', type: 'info' },
          { value: 'Success Badge', type: 'success' },
          { value: 'Warning Badge', type: 'warning' },
          { value: 'Error Badge', type: 'error' },
        ],
      },
      {
        title: 'Simple number',
        data: [
          { value: 1, type: 'info' },
          { value: 10, type: 'success' },
          { value: 100, type: 'warning' },
          { value: 1000, type: 'error' },
        ],
      },
      {
        title: 'Default slot',
        data: [
          { value: 'Info Badge', type: 'info', custom: true },
          { value: 'Success Badge', type: 'success', custom: true },
          { value: 'Warning Badge', type: 'warning', custom: true },
          { value: 'Error Badge', type: 'error', custom: true },
        ],
      },
    ]);

    return {
      args,
      badges,
    };
  },
  template: `
    <div class="tw-m-16">
      <template v-for="(block, blockIndex) in badges" :key="blockIndex">
        <h3 class="tw-m-8">{{ block.title }}</h3>
        <ec-badge
          v-for="(badge, badgeIndex) in block.data"
          v-bind="badge"
          :key="blockIndex + '-' + badgeIndex"
          class="tw-m-8"
        >
          <template v-if="badge.custom" #default="{ value }">
            Custom: {{ value }}
          </template>
        </ec-badge>
      </template>
    </div>`,
});

all.parameters = {
  controls: { disable: true },
};
