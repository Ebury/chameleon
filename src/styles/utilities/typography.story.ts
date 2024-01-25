import type { Meta, StoryFn } from '@storybook/vue3';

const meta: Meta = {
  title: 'CSS/Typography',
};

export default meta;

export const basic: StoryFn = () => ({
  data() {
    return {
      types: [
        'tw-h1', 'tw-h2', 'tw-h3', 'tw-h4', 'tw-h5', 'tw-h6',
        'tw-body-text', 'tw-body-strong', 'tw-body-condensed',
        'tw-mini-header', 'tw-table-header',
        'tw-small-text', 'tw-small-strong', 'tw-caption-text',
        'tw-input-label', 'tw-btn-text', 'tw-flags-text',
        'tw-help-text',
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
});

basic.parameters = {
  a11y: { disable: true },
  controls: { disable: true },
  actions: { disable: true },
};
