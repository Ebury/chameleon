import type { Meta, StoryFn } from '@storybook/vue3';

const meta: Meta = {
  title: 'Card',
};

export default meta;

export const all: StoryFn = () => ({
  data() {
    return {
      list: [
        {
          title: 'Basic',
          text: 'Basic example card',
          class: '',
        },
        {
          title: 'Basic with a long text',
          text: 'Methionylthreonylthreonyglutaminylarginyl|Lopadotemachoselachogaleokranioleipsan|Pneumonoultramicroscopicsilicovolcanoconiosis',
          class: '',
        },
        {
          title: 'Interactive card',
          text: 'Interactive example card',
          class: 'ec-card--is-interactive',
        },
        {
          title: 'Card with narrow padding',
          text: 'Example card with narrow padding',
          class: 'ec-card--has-narrow-padding',
        },
        {
          title: 'Disabled card',
          text: 'Example disabled card',
          class: 'ec-card--is-disabled',
        },
      ],
    };
  },
  template: `
    <div class="tw-p-16">
      <div v-for="(card, index) in list" :key="index">
        <h3>{{ card.title }}</h3>
        <div class="tw-m-12">
          <div class="tw-w-1/3">
            <div class="ec-card" :class="card.class">
              {{ card.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
});

all.parameters = {
  controls: { disable: true },
  actions: { disable: true },
};
