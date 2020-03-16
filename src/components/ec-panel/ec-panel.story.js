
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import EcPanel from './ec-panel.vue';

storiesOf('Panel', module)
  .add('basic', () => ({
    components: { EcPanel },
    props: {
      showFromProps: {
        default: boolean('Show Panel', true),
      },
      withOverflowingContent: {
        default: boolean('With overflowing content', true),
      },
    },
    watch: {
      showFromProps: {
        immediate: true,
        handler(newValue) {
          this.show = newValue;
        },
      },
    },
    data() {
      return {
        show: true,
        isBackEnabled: true,
      };
    },
    methods: {
      clickBackButton() {
        action('Back button clicked')();
      },
    },
    template: `
      <div style="width: 100vw; height: 100vh; position: fixed; top: 0; left: 0;">
        <div v-for="i in 5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum nobis obcaecati optio magnam, porro inventore? Suscipit sit atque a! Ullam provident quidem recusandae, itaque error labore porro inventore? Suscipit sit atque a! Ullam provident quidem recusandae, itaque error labore</div>

        <ec-panel v-model="show" @back="clickBackButton()">
          <template #header>
            <h2 class="ec-mb--24">Lorem, ipsum dolor sit amet</h2>
          </template>

          <template #main>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum nobis obcaecati optio magnam, porro inventore? Suscipit sit atque a! Ullam provident quidem recusandae</p>

            <div v-if="withOverflowingContent">
              <p v-for="i in 10">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum nobis obcaecati optio magnam, porro inventore? Suscipit sit atque a! Ullam provident quidem recusandae</p>
            </div>

            <div class="ec-mt--36" style="text-align: center;">
              <a href="#" class="ec-btn ec-btn--primary ec-btn--rounded ec-btn--md">Lorem, ipsum</a>
            </div>
          </template>
        </ec-panel>
      </div>
    `,
  }));
