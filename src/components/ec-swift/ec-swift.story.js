import { storiesOf } from '@storybook/vue';
import { object } from '@storybook/addon-knobs';
import EcSwift from './ec-swift.vue';

const stories = storiesOf('Swift', module);

const items = [
  { text: '46ed4827-7b6f-4491-a06f-b548d5a7512d' },
  { text: '54ed4827-7b6f-4491-a06f-b548d5a7512d' },
];

stories.add('basic', () => ({
  components: { EcSwift },
  props: {
    items: {
      default: object('items', items),
    },
    swift_proxy_url: {
      default: 'http://127.0.0.1:8000',
    },
    username: {
      default: 'admin',
    },
    password: {
      default: 'Fake1234',
    },
  },
  data() {
    return { show: true };
  },
  template: `
    <div>
      <ec-swift
        :items=items
        :swift_proxy_url="swift_proxy_url"
        :username="username"
        :password="password"
        v-model="show" />
    </div>`,
}));

export default stories;
