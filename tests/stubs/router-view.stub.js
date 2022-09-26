import { defineComponent } from 'vue';

const RouterViewStub = defineComponent({
  name: 'RouterViewStub',
  compilerOptions: {
    whitespace: 'condense',
  },
  inheritAttrs: false,
  template: `
  <ec-stub
    v-bind="{
      ...$attrs,
      ...$props,
      'data-test': $attrs['data-test'] ? ($attrs['data-test'] + ' ec-stub router-view-stub') : 'ec-stub router-view-stub',
    }">
      <slot />
  </ec-stub>`,
});

export default RouterViewStub;
