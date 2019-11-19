import { storiesOf } from '@storybook/vue';
import EcToaster from './ec-toaster.vue';

const stories = storiesOf('Toaster', module);

stories.add('basic', () => ({
  components: { EcToaster },
  template: `
    <EcToaster>
    `,
}));

export default stories;
