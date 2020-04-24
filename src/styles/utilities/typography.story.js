import { storiesOf } from '@storybook/vue';

const stories = storiesOf('CSS/Typography', module);

stories.add('basic', () => ({
  data() {
    return {
      types: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'body-text', 'body-strong',
        'mini-header', 'table-header',
        'small-text', 'caption-text',
        'input-label', 'btn-text', 'flags-text',
      ],
    };
  },
  template: `
    <div>
      <p v-for="type of types"
        :key="type"
        :class="'tw-px-24 tw-' + type">{{ type }} - Lorem ipsum dolor sit amet, consectetur adipiscing <a href="#">elit</a>. Donec sodales felis nec libero vehicula, sit amet gravida dolor cursus</p>
    </div>
  `,
}));
