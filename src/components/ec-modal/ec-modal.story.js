/* eslint-disable no-alert, no-console */
import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';
import EcModal from './ec-modal.vue';

const stories = storiesOf('Modal', module);

stories
  .add('basic', () => ({
    components: { EcModal },
    props: {
      showModalFromProps: {
        default: boolean('Show Modal', true),
      },
      showHelpLink: {
        default: boolean('Help Link', true),
      },
    },
    watch: {
      showModalFromProps: {
        immediate: true,
        handler(newValue) {
          this.negativeAction = newValue;
        },
      },
    },
    data() {
      return {
        negativeAction: false,
      };
    },
    methods: {
      submit() {
        setTimeout(() => {
          this.negativeAction = false;
          alert('submittted');
        }, 2000);
      },
    },
    template: `
      <div>
      <ec-modal
        :showHelpLink="showHelpLink"
        @positiveAction = "submit()"
        v-model="negativeAction">

        <template #header>
        <h2>Update your management accounts</h2>
        </template>

        <template #main>
        <p>Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
        <p>Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
        <p>Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
        </template>

        <template #negative>Skip for now</template>
        <template #positive>Update management accounts</template>
      </ec-modal>
      </div>
      `,
  }));

export default stories;
