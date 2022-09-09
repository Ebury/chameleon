import { reactive } from 'vue';

import EcBadge from './ec-badge.vue';

// import './ec-badge.story.css';

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
        title: 'Simple Badge',
        data: [
          { value: '1', type: 'info' },
          { value: '1', type: 'success' },
          { value: '1', type: 'warning' },
          { value: '1', type: 'error' },
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
          class="tw-m-8">
        </ec-badge>
      </template>
    </div>`,
});
