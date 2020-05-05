import { storiesOf } from '@storybook/vue';

const stories = storiesOf('CSS/Typography', module);

stories.add('basic', () => ({
  data() {
    return {
      types: [
        'tw-h1', 'tw-h2', 'tw-h3', 'tw-h4', 'tw-h5', 'tw-h6',
        'tw-body-text', 'tw-body-strong', 'tw-body-condensed',
        'tw-mini-header', 'tw-table-header',
        'tw-small-text', 'tw-caption-text',
        'tw-input-label', 'tw-btn-text', 'tw-flags-text',
      ],
    };
  },
  template: `
    <div>
      <p v-for="type of types"
        :key="type"
        :class="'tw-px-24 ' + type">{{ type.replace('tw-', '') }} - Lorem ipsum dolor sit amet, consectetur adipiscing <a href="#">elit</a>. Donec sodales felis nec libero vehicula, sit amet gravida dolor cursus</p>
    </div>
  `,
}));
