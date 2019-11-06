import { storiesOf } from '@storybook/vue';
import { object, boolean } from '@storybook/addon-knobs';
import EcUserInfo from './ec-user-info.vue';

const client = {
  name: 'Ebury Demo 2',
  profileUrl: '/profile',
  gravatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?d=mm&s=200',
};

const stories = storiesOf('User Info', module);

stories.add('basic', () => ({
  components: {
    EcUserInfo,
  },
  props: {
    client: {
      default: object('user', client),
    },
    isCollapsable: {
      default: boolean('isCollapsable', false),
    },
    isCollapsed: {
      default: boolean('isCollapsed', false),
    },
  },
  template: `
    <div style="background-color: #005166;width:280px;height:100vh;">
      <ec-user-info
      :user="client"
      :is-collapsable="isCollapsable"
      :is-collapsed="isCollapsable && isCollapsed"
      @toggle="isCollapsed = !isCollapsed">
        <template #client-selector>
          <select>
            <option value="ebury">Ebury</option>
            <option value="eburydemo2">EburyDemo2</option>
          </select>
        </template>
      </ec-user-info>
    </div>
  `,
}));

export default stories;
