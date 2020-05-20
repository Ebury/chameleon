import { storiesOf } from '@storybook/vue';

const stories = storiesOf('Card', module);

stories
  .add('all', () => ({
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
  }));
