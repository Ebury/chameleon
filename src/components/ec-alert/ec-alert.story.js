import { storiesOf } from '@storybook/vue';
import { boolean, text } from '@storybook/addon-knobs';
import EcAlert from './ec-alert.vue';

const stories = storiesOf('Alert', module);

stories.add('basic', () => ({
  components: { EcAlert },
  props: {
    title: {
      default: text('title', 'Error!'),
    },
    subtitle: {
      default: text('subtitle', 'Something was wrong with the update.'),
    },
    type: {
      default: text('type', 'error'),
    },
    textButton: {
      default: text('textButton', 'Read more'),
    },
    dismissable: {
      default: boolean('dismissable', true),
    },
  },
  data() {
    return { show: true };
  },
  template: `
    <div>
    <ec-alert :title="title" :subtitle="subtitle" :type="type" :dismissable="dismissable" :button-text="textButton" v-model="show">
    </ec-alert>

    <button @click="show = !show">{{ show ? 'Hide' : 'Show' }}</button>
    </div>`,
}));

stories.add('all', () => ({
  components: { EcAlert },
  data() {
    return {
      showInfo1: true,
      showSuccess1: true,
      showWarning1: true,
      showError1: true,
      showInfo2: true,
      showSuccess2: true,
      showWarning2: true,
      showError2: true,
    };
  },
  template: `
  <div>
      <ec-alert title="Info Alert" type="info" />
      <ec-alert title="Success Alert" type="success" />
      <ec-alert title="Warning Alert" type="warning" />
      <ec-alert title="Error Alert" type="error" />
    <hr/>
      <ec-alert title="Dismissable Info Alert" type="info" :dismissable="true" v-model="showInfo1" />
      <ec-alert title="Dismissable Success Alert" type="success" :dismissable="true" v-model="showSuccess1" />
      <ec-alert title="Dismissable Warning Alert" type="warning" :dismissable="true" v-model="showWarning1" />
      <ec-alert title="Dismissable Error Alert" type="error"  :dismissable="true" v-model="showError1"/>
    <hr/>
      <ec-alert title="Button Info Alert" button-text="Action here" type="info"  />
      <ec-alert title="Button Success Alert" button-text="Action here" type="success" />
      <ec-alert title="Button Warning Alert" button-text="Action here" type="warning" />
      <ec-alert title="Button Error Alert" button-text="Action here" type="error" />
    <hr/>
      <ec-alert title="Subtitle Info Alert" subtitle="Subtitle" type="info"  />
      <ec-alert title="Subtitle Success Alert" subtitle="Subtitle" type="success" />
      <ec-alert title="Subtitle Warning Alert" subtitle="Subtitle" type="warning" />
      <ec-alert title="Subtitle Error Alert" subtitle="Subtitle" type="error" />
    <hr/>
      <ec-alert title="Custom slot Info Alert" subtitle="Subtitle" type="info" >
        <div slot-scope="{ title, subtitle }">
          Custom: {{ title }} - {{ subtitle }}
        </div>
      </ec-alert>
      <ec-alert title="Custom slot Success Alert" subtitle="Subtitle" type="success" >
        <div slot-scope="{ title, subtitle }">
          Custom: {{ title }} - {{ subtitle }}
        </div>
      </ec-alert>
      <ec-alert title="Custom slot Warning Alert" subtitle="Subtitle" type="warning" >
        <div slot-scope="{ title, subtitle }">
          Custom: {{ title }} - {{ subtitle }}
        </div>
      </ec-alert>
      <ec-alert title="Custom slot Error Alert" subtitle="Subtitle" type="error" >
        <div slot-scope="{ title, subtitle }">
          Custom: {{ title }} - {{ subtitle }}
        </div>
      </ec-alert>
    <hr/>
      <ec-alert title="Complete Info Alert" button-text="Action here" subtitle="Subtitle" type="info" :dismissable="true" v-model="showInfo2" />
      <ec-alert title="Complete Success Alert" button-text="Action here" subtitle="Subtitle" type="success" :dismissable="true" v-model="showSuccess2" />
      <ec-alert title="Complete Warning Alert" button-text="Action here" subtitle="Subtitle" type="warning" :dismissable="true" v-model="showWarning2" />
      <ec-alert title="Complete Error Alert" button-text="Action here" subtitle="Subtitle" type="error" :dismissable="true" v-model="showError2" />
    <hr/>
    </div>`,
}));


export default stories;
