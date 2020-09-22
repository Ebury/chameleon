
import { storiesOf } from '@storybook/vue';
import EcPrivacyPolicy from './ec-privacy-policy.vue';

const stories = storiesOf('Privacy Policy', module);

stories.add('basic', () => ({
  components: { EcPrivacyPolicy },
  template: `
    <ec-privacy-policy button-text="Accept and continue" title="Cookies and Privacy">
      This site uses cookies to ensure you get the best experience. For more information see our <a>Privacy Policy</a>
    </ec-privacy-policy>
  `,
}));
