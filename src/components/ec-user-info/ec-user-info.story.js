import { storiesOf } from '@storybook/vue';
import { object, boolean } from '@storybook/addon-knobs';
import EcUserInfo from './ec-user-info.vue';
// eslint-disable-next-line import/no-webpack-loader-syntax
import gravatar from '!!url-loader!../../../public/empty-gravatar.png';

const client = {
  name: 'Ebury Demo 2',
  profileUrl: '/profile',
  gravatar,
};

const stories = storiesOf('Layout/User Info', module);

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
    <div class="tw-bg-key-2 tw-w-1/4 tw-h-screen">
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
