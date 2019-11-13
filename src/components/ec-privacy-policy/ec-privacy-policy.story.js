
import { storiesOf } from '@storybook/vue';
import EcPrivacyPolicy from './ec-privacy-policy.vue';

const stories = storiesOf('Privacy Policy', module);

stories.add('basic', () => ({
  components: { EcPrivacyPolicy },
  template: `
    <ec-privacy-policy></ec-privacy-policy>
  `,
}));

export default stories;
