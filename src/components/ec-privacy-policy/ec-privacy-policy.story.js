import { action } from '@storybook/addon-actions';

import { fixedContainerDecorator } from '../../../.storybook/utils';
import EcPrivacyPolicy from './ec-privacy-policy.vue';

export default {
  title: 'Privacy Policy',
  component: EcPrivacyPolicy,
  decorators: [
    fixedContainerDecorator('300px'),
  ],
};

const Template = args => ({
  components: { EcPrivacyPolicy },
  setup() {
    return {
      args,
      onAccept: action('accept'),
      onNavigate: action('navigate'),
    };
  },
  template: `
    <ec-privacy-policy v-bind="args" v-on="{ accept: onAccept }">
      This site uses cookies to ensure you get the best experience. For more information see our <a @click.prevent.stop="onNavigate">Privacy Policy</a>.
    </ec-privacy-policy>
  `,
});

export const basic = Template.bind({});
basic.args = {
  buttonText: 'Accept and continue',
  title: 'Cookies and Privacy',
};
