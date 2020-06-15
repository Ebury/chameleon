import { storiesOf } from '@storybook/vue';
import { text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import EcToaster from './ec-toaster.vue';

const stories = storiesOf('Toaster', module);

stories.add('basic', () => ({
  components: { EcToaster },
  data() {
    return {
      messages: [
        {
          id: 1,
          type: 'success',
          title: 'This is the title',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
          id: 2,
          type: 'error',
          title: 'This is the title',
          subtitle: 'This is the subtitle',
        },
        {
          id: 3,
          type: 'warning',
          title: 'This is the title',
          subtitle: 'This is the subtitle',
        },
        {
          id: 4,
          type: 'info',
          title: 'This is the title',
          subtitle: 'This is the subtitle',
        },
        {
          id: 5,
          type: 'error',
          title: 'This is the title',
          subtitle: 'This is the subtitle',
        },
      ],
    };
  },
  props: {
    type: {
      default: select('Type', ['error', 'success', 'warning', 'info'], 'error'),
    },
    title: {
      default: text('Title', 'A new title'),
    },
    subtitle: {
      default: text('Subtitle', 'A new subtitle'),
    },
  },
  methods: {
    removeMessage(message) {
      action('User closed the message')();
      this.messages = this.messages.filter(m => m !== message);
    },
    addMessage() {
      this.messages.push({
        id: +new Date(),
        type: this.type,
        title: this.title,
        subtitle: this.subtitle,
      });
    },
    bodyHandler: action('body click'),
  },

  // eslint-disable-next-line no-unused-vars
  render(h) {
    return (
      <div class="tw-fixed tw-right-0 tw-top-0 tw-w-full" style={{
        maxWidth: '400px',
      }}>
        <EcToaster messages={this.messages} onRemove={message => this.removeMessage(message)} />
        <button
          class="ec-btn ec-btn--md ec-btn--rounded ec-btn--primary tw-fixed tw-left-1/2 tw-top-1/2 tw--translate-x-1/2 tw--translate-y-1/2"
          onClick={this.addMessage}>Add another message</button>
      </div>
    );
  },
  mounted() {
    document.addEventListener('click', this.bodyHandler);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.bodyHandler);
  },
}));

export default stories;
