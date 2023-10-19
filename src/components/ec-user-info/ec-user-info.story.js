import { action } from '@storybook/addon-actions';
import { ref } from 'vue';

import EcUserInfo from './ec-user-info.vue';

const client = {
  name: 'Ebury Demo 2',
  profileUrl: '/profile',
  gravatar: '/empty-gravatar.png',
};

export default {
  title: 'Layout/User Info',
  component: EcUserInfo,
};

export const basic = args => ({
  components: { EcUserInfo },
  setup() {
    const isCollapsedFromProps = ref(args.isCollapsed);
    return {
      isCollapsedFromProps,
      args,
      onToggle: action('toggle'),
    };
  },
  template: `
    <div class="tw-bg-key-2 tw-w-1/4 tw-h-screen">
      <ec-user-info
        v-bind="args"
        :is-collapsed="args.isCollapsable && isCollapsedFromProps"
        @toggle="isCollapsedFromProps = !isCollapsedFromProps; onToggle()"
      >
        <template #client-selector>
          <select>
            <option value="ebury">Ebury</option>
            <option value="eburydemo2">EburyDemo2</option>
          </select>
        </template>
      </ec-user-info>
    </div>
  `,
});

basic.args = {
  user: client,
  isCollapsed: false,
  isCollapsable: false,
};
