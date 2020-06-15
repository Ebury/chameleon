
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
      isContentOverflowing: {
        default: boolean('Overflow content', true),
      },
      isHeaderEnabled: {
        default: boolean('Show Header', true),
      },
      isFooterEnabled: {
        default: boolean('Show Footer', true),
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
      <div style="width:100vw;min-height:100vh;background-color: hsl(var(--ec-gray-color-level-7));">
        <div class="ec-panel-container" style="max-width: 1024px;margin: 0 auto;background-color: hsl(var(--ec-light-color)); padding:24px;">
          <h1 style="margin:24px;">Panel story</h1>
          <div v-for="i in 10" style="margin:24px;">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum nobis obcaecati optio magnam, porro inventore? Suscipit sit atque a! Ullam provident quidem recusandae, itaque error labore porro inventore? Suscipit sit atque a! Ullam provident quidem recusandae, itaque error labore</div>

          <ec-panel v-model="show" @back="clickBackButton()">
            <template v-if="isHeaderEnabled" #header>
              <h3 class="ec-mb--24">Header</h3>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            </template>

            <template #main>
              <h3>Main</h3>

              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum nobis obcaecati optio magnam, porro inventore? Suscipit sit atque a! Ullam provident quidem recusandae</p>

              <div v-if="isContentOverflowing">
                <p v-for="i in 10">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum nobis obcaecati optio magnam, porro inventore? Suscipit sit atque a! Ullam provident quidem recusandae</p>
              </div>

              <div class="ec-mt--36" style="text-align: center;">
                <a href="#" class="ec-btn ec-btn--primary ec-btn--rounded ec-btn--md">Lorem, ipsum</a>
              </div>
            </template>

            <template v-if="isFooterEnabled" #footer>
              <h3>Footer</h3>

              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>

              <div class="ec-mt--36" style="text-align: center;">
                <a href="#" class="ec-btn ec-btn--primary ec-btn--rounded ec-btn--md">Lorem, ipsum</a>
              </div>
            </template>
          </ec-panel>
        </div>
      </div>
    `,
  }));
