import { storiesOf } from '@storybook/vue';
import EcIcon from '@/components/ec-icon';

const stories = storiesOf('Card', module);

stories
  .add('all', () => ({
    components: { EcIcon },
    data() {
      return {
        list: [
          {
            title: 'Basic',
            text: 'Basic example card',
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
        <div class="tw-flex tw-m-12">
          <div style="width: 33vw;">
            <div class="ec-card" :class="card.class">
              {{ card.text }}
            </div>
          </div>
        </div>
      </div>
      <!-- Trade finance cards -->
      <h3>Trade finance cards</h3>
      <div class="tw-flex tw-m-12">
        <div style="width: 66vw;">
          <div class="ec-card">
            <div class="tw-p-8">
              <div class="tw-mb-24" style="font-size:25px; line-height: 35px;">
                Credit line: EUR 1,000,000.00
              </div>
              <ec-icon class="tw-mr-8" name="simple-check" :size="108" />
              <ec-icon class="tw-mr-8" name="simple-check" :size="14" />
              Used EUR 0.00
            </div>
          </div>
        </div>
        <div class="tw-m-12" style="width: 33vw;">
          <div class="ec-card" >
            <div class="tw-text-center" style="font-size:18px; line-height: 28px;">
              Management account status
            </div>
            <ec-icon class="tw-my-24" name="simple-check" :size="48" />
            <div class="tw-text-center tw-small-text">
              Here we will display the status of your management accounts, so you can update them when necessary.
            </div>
          </div>
        </div>
      </div>
    </div>
      `,
  }));
