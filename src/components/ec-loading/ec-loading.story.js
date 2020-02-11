import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { number, boolean } from '@storybook/addon-knobs';
import EcLoading from './ec-loading.vue';
import { DARK_THEME } from '../../../.storybook/backgrounds';

const stories = storiesOf('Loading', module);

stories.add('with dark background', () => ({
  components: { EcLoading },
  template: `
  <div style="height: 100vh">
    <ec-loading :show="true">
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ullam architecto obcaecati, facere corrupti,
        repellat veniam quam odit esse eum soluta sequi ea minus itaque exercitationem dignissimos rerum dicta earum iste,
        magni necessitatibus. Quisquam beatae alias fugiat cumque omnis accusamus asperiores vel doloremque repudiandae quas,
        molestias consequatur ducimus modi reiciendis, voluptatum, veritatis deleniti commodi numquam dolores? Repudiandae,
        dicta laboriosam sed voluptatibus obcaecati vel laudantium et perspiciatis. Adipisci repellendus id mollitia autem?
        Animi odio, fuga quasi dolorem sed adipisci ipsam, ad ut fugiat officia quaerat placeat commodi ducimus! Aut beatae sequi
        a reiciendis harum inventore consectetur ullam rerum, adipisci mollitia nam?
      </div>
    </ec-loading>
  </div>`,
}), {
  backgrounds: [{ ...DARK_THEME, default: true }],
})
  .add('basic', () => ({
    components: { EcLoading },
    data() {
      return {
        show: true,
      };
    },
    props: {
      size: {
        default: number('size', 48),
      },
      transparent: {
        default: boolean('transparent', false),
      },
    },
    methods: {
      clickBtn() {
        action('Button clicked')();
      },
    },
    template: `
      <div>
        <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded" @click="show = !show">{{ show ? 'Hide loading' : 'Show loading' }}</button>    
        <div class="ec-card"> 
          <ec-loading :transparent="transparent" :show="show" :size="size"> 
            <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded" @click="clickBtn">Test action</button>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ullam architecto obcaecati, facere corrupti,
              repellat veniam quam odit esse eum soluta sequi ea minus itaque exercitationem dignissimos rerum dicta earum iste,
              magni necessitatibus. Quisquam beatae alias fugiat cumque omnis accusamus asperiores vel doloremque repudiandae quas,
              molestias consequatur ducimus modi reiciendis, voluptatum, veritatis deleniti commodi numquam dolores? Repudiandae,
              dicta laboriosam sed voluptatibus obcaecati vel laudantium et perspiciatis. Adipisci repellendus id mollitia autem?
              Animi odio, fuga quasi dolorem sed adipisci ipsam, ad ut fugiat officia quaerat placeat commodi ducimus! Aut beatae sequi
              a reiciendis harum inventore consectetur ullam rerum, adipisci mollitia nam?
            </ec-loading>
          </div>
      </div>`,
  }));

export default stories;
