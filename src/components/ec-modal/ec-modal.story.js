import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';
import EcModal from './ec-modal.vue';
import EcIcon from '../ec-icon/ec-icon.vue';

const stories = storiesOf('Modal', module);

stories
  .add('basic', () => ({
    components: { EcModal, EcIcon },
    props: {
      showModalFromProps: {
        default: boolean('Modal is showing', true),
      },
    },
    watch: {
      showModalFromProps: {
        immediate: true,
        handler(newValue) {
          this.show = newValue;
        },
      },
    },
    data() {
      return {
        show: false,
      };
    },
    template: `
      <div>
      <ec-modal
        v-model="show">

        <template #header>
        <h2>Update your management accounts</h2>
        </template>

        <template #main>
        <p>Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
        </template>

        <template #footer>
        <a href="somelink.com" class="ec-m--12" style="display:flex;align-items:center;">
            <ec-icon class="ec-mr--8" name="simple-help" :size="18" fill="#00bef0"/>
            Need help?
          </span>
        </a>

        <button class="ec-btn ec-btn--md ec-m--12 ec-btn--secondary ec-btn--rounded ec-push-r-from-1024">Skip for now</button>

        <button class="ec-btn ec-btn--md ec-m--12 ec-btn--primary ec-btn--rounded">Update management accounts</button>
          </template>
      </ec-modal>
      </div>
      `,
  }));

export default stories;
