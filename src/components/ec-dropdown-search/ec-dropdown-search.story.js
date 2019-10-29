import { storiesOf } from '@storybook/vue';
import { text, boolean, object } from '@storybook/addon-knobs';
import EcDropdownSearch from './ec-dropdown-search.vue';

const itemFormat = {
  disabled: 'disabled',
  disabledReason: 'disabledReason',
  id: 'id',
  text: 'text',
};
const user = {
  clientName: 'Ebury Demo 2',
  email: 'ebury.demo2@ebury.com',
  gravatar: 'https://www.gravatar.com/avatar/e07fd6efc70ccc63bbc3a3e27b81b29e?d=mm&s=200',
};
const items = [
  {
    disabled: false,
    disabledReason: 'This ac+44 (0) 207 197 2421.',
    id: 'EBPCLI00004',
    text: 'Ebury Demo',
  },
  {
    disabled: false,
    disabledReason: 'This ac+44 (0) 207 197 2421.',
    id: 'EBPCLI00007',
    text: 'Ebury Demo 2',
  },
];

const stories = storiesOf('Ec dropdown Search', module);

stories.add('basic', () => ({
  components: { EcDropdownSearch },
  props: {
    defaultItemSelected: {
      default: object('defaultItemSelected', null),
    },
    huhaTaskName: {
      default: text('url', 'applyDropdownAccountSelector'),
    },
    huhaTrackOnGoogleAnalytics: {
      default: boolean('huhaTrackOnGoogleAnalytics', true),
    },
    huhaTrackOnIntercom: {
      default: boolean('huhaTrackOnIntercom', false),
    },
    itemFormat: {
      default: object('itemFormat', itemFormat),
    },
    items: {
      default: object('items', items),
    },
    user: {
      default: object('user', user),
    },
  },
  template: `
  <div class='ec'>
    <div class="ec-dropdown main-menu__header__account-selector main-menu__header__account">
      <a href="" class="ec-dropdown-toggle ec-dropdown-toggle--menu"
        data-toggle="ec-dropdown"
        aria-haspopup="true"
      >
        <span class="title">Ebury Online 2</span>
      </a>
      <ec-dropdown-search
        :user="user"
        placeholder="Search..."
        :show="true"
        :showSearch="true"
        tooltipPosition="top"
        :defaultItemSelected="defaultItemSelected"
        :huhaTaskName="huhaTaskName"
        :huhaTrackOnGoogleAnalytics="huhaTrackOnGoogleAnalytics"
        :huhaTrackOnIntercom="huhaTrackOnIntercom"
        :itemFormat="itemFormat"
        :items="items"
      />
    </div>
  </div>
  `,
}));

export default stories;
