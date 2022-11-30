import { ref } from 'vue';

import EcRadioBtn from './ec-radio-btn.vue';

export default {
  title: 'Radio Button',
  component: EcRadioBtn,
};

const Template = ({ modelValue, ...args }) => ({
  components: { EcRadioBtn },
  setup() {
    const model = ref(modelValue);
    return { args, model };
  },
  template: `
    <div class="tw-p-24">
      <ec-radio-btn v-bind="args" v-model="model" />
    </div>
  `,
});

export const basic = Template.bind({});
basic.args = {
  disabled: false,
  modelValue: '',
  radios: [
    { value: '1', label: 'One' },
    { value: '2', label: 'Two' },
  ],
};

