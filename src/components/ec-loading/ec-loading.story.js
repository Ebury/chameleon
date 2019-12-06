import { storiesOf } from '@storybook/vue';
import EcLoading from './ec-loading.vue';
import { DARK_THEME } from '../../../.storybook/backgrounds';

const stories = storiesOf('Loading', module);

stories.add('dark background basic', () => ({
  components: { EcLoading },
  template: `
  <div style="height: 100vh">
      <ec-loading :show="true">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ullam architecto obcaecati, facere corrupti, repellat veniam quam odit esse eum soluta sequi ea minus itaque exercitationem dignissimos rerum dicta earum iste, magni necessitatibus. Quisquam beatae alias fugiat cumque omnis accusamus asperiores vel doloremque repudiandae quas, molestias consequatur ducimus modi reiciendis, voluptatum, veritatis deleniti commodi numquam dolores? Repudiandae, dicta laboriosam sed voluptatibus obcaecati vel laudantium et perspiciatis. Adipisci repellendus id mollitia autem? Animi odio, fuga quasi dolorem sed adipisci ipsam, ad ut fugiat officia quaerat placeat commodi ducimus! Aut beatae sequi a reiciendis harum inventore consectetur ullam rerum, adipisci mollitia nam?
        </div>
      </ec-loading>
  </div>`,
}), {
  backgrounds: [{ ...DARK_THEME, default: true }],
})
  .add('basic show case', () => ({
    components: { EcLoading },
    data() {
      return {
        show: true,
      };
    },
    template: `
  <div>
    <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded" @click="show = !show">Show me</button>    
    <ec-loading :show="show"> 
      <div class="ec-card" style="background: tomato; color: white"> 
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ullam architecto obcaecati, facere corrupti, repellat veniam quam odit esse eum soluta sequi ea minus itaque exercitationem dignissimos rerum dicta earum iste, magni necessitatibus. Quisquam beatae alias fugiat cumque omnis accusamus asperiores vel doloremque repudiandae quas, molestias consequatur ducimus modi reiciendis, voluptatum, veritatis deleniti commodi numquam dolores? Repudiandae, dicta laboriosam sed voluptatibus obcaecati vel laudantium et perspiciatis. Adipisci repellendus id mollitia autem? Animi odio, fuga quasi dolorem sed adipisci ipsam, ad ut fugiat officia quaerat placeat commodi ducimus! Aut beatae sequi a reiciendis harum inventore consectetur ullam rerum, adipisci mollitia nam?
      </div>
    </ec-loading>
  </div>`,
  }));

export default stories;
