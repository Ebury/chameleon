import { storiesOf } from '@storybook/vue';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import EcToaster from './ec-toaster.vue';

const stories = storiesOf('Toaster', module);

stories.add('basic', () => ({
  components: { EcToaster },
  data() {
    return {
      show: true,
      messages: [
        {
          id: 1,
          type: 'success',
          title: 'This is the title',
          subtitle: 'This is the subtitle',
          dismissable: true,
        },
        {
          id: 2,
          type: 'error',
          title: 'This is the title',
          subtitle: 'This is the subtitffffffle',
          dismissable: true,
        },
        {
          id: 3,
          type: 'success',
          title: 'This is the title',
          subtitle: 'This is the subtitle',
          dismissable: true,
        },
        {
          id: 4,
          type: 'error',
          title: 'This is the title',
          subtitle: 'This is the subtitle',
          dismissable: true,
        },
        {
          id: 5,
          type: 'error',
          title: 'This is the title',
          subtitle: 'This is the subtitlffffffffffffffffffe',
          dismissable: true,
        },
      ],
    };
  },
  props: {
    type: {
      default: text('Type', 'success'),
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
        dismissable: true,
      });
    },
  },

  // eslint-disable-next-line no-unused-vars
  render(h) {
    return (
      <div style={{
        position: 'fixed',
        right: 0,
        top: 0,
        width: '100%',
        maxWidth: '400px',
      }}>
        <EcToaster messages={this.messages} onRemove={message => this.removeMessage(message)}/>
        <button style="position:fixed;top:50%;left:50%;transform: translate(-50%, -50%);" class="ec-btn ec-btn--md ec-btn--rounded ec-btn--primary" onClick={this.addMessage}>Amend Props and Click </button>
      </div>
    );
  },
}));

export default stories;
