import { storiesOf } from '@storybook/vue';
import { object } from '@storybook/addon-knobs';
import MainMenu from './main-menu.vue';

// Data
const links = [
  {
    text: 'DASHBOARD',
    url: '/',
    ico: 'ec-ico-dashboard',
    isActive: false,
  },
  {
    text: 'TRADES',
    url: '/trades/',
    ico: 'ec-ico-swap-horiz',
    isActive: false,
  },
  {
    text: 'PAYMENTS',
    url: '/payments/',
    ico: 'ec-ico-payment',
    isActive: false,
  },
  {
    text: 'INCOMING FUNDS',
    url: '/incomingfunds/',
    ico: 'ec-ico-subdirectory-arrow-right',
    isActive: false,
  },
  {
    text: 'LENDING',
    url: '/lending/',
    ico: 'ec-ico-trending-up',
    isActive: false,
  },
  {
    text: 'BALANCES',
    url: '/balances/',
    ico: 'ec-ico-trending-up',
    isActive: true,
  },
  {
    text: 'BENEFICIARIES',
    url: '/beneficiaries/',
    ico: 'ec-ico-person',
    isActive: false,
  },
];
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
const user = {
  clientName: 'Ebury Demo 2',
  email: 'ebury.demo2@ebury.com',
  gravatar: 'https://www.gravatar.com/avatar/e07fd6efc70ccc63bbc3a3e27b81b29e?d=mm&s=200',
};

const stories = storiesOf('Main Menu', module);

stories.add('basic', () => ({
  components: { MainMenu },
  props: {
    items: {
      default: object('items', items),
    },
    user: {
      default: object('user', user),
    },
    links: {
      default: object('links', links),
    },

  },
  template: `
  <div class="container ec">
     <MainMenu :links="links" :accounts='items' :user="user"/>
  </div>
  `,
}));

export default stories;
