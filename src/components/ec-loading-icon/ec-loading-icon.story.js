import { storiesOf } from '@storybook/vue';
import { number } from '@storybook/addon-knobs';
import EcLoadingIcon from './ec-loading-icon.vue';

const stories = storiesOf('Loading Icon', module);

stories.add('basic', () => ({
  components: { EcLoadingIcon },
  template: `
    <div class="tw-h-screen tw-flex">
      <ec-loading-icon :size="size" />
    </div>
  `,
  props: {
    size: {
      default: number('Size', 48),
    },
  },
}));
