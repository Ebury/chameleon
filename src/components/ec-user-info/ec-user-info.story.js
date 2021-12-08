import { action } from '@storybook/addon-actions';
import EcUserInfo from './ec-user-info.vue';
// eslint-disable-next-line import/no-webpack-loader-syntax
import gravatar from '!!url-loader!../../../public/empty-gravatar.png';

const client = {
  name: 'Ebury Demo 2',
  profileUrl: '/profile',
  gravatar,
};

export default {
  title: 'Layout/User Info',
  component: EcUserInfo,
};

export const basic = (args, { argTypes }) => ({
  components: { EcUserInfo },
  props: Object.keys(argTypes),
  data() {
    return { isCollapsedFromProps: false };
  },
  watch: {
    isCollapsed: {
      immediate: true,
      handler(newValue) {
        this.isCollapsedFromProps = newValue;
      },
    },
  },
  methods: {
    onToggle: action('toggle'),
  },
  template: `
    <div class="tw-bg-key-2 tw-w-1/4 tw-h-screen">
      <ec-user-info
        v-bind="$props"
        :is-collapsed="isCollapsable && isCollapsedFromProps"
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
