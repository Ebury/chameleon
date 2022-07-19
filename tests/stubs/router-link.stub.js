import { defineComponent } from 'vue';

const RouterLinkStub = defineComponent({
  name: 'RouterLinkStub',
  compatConfig: {
    MODE: 3,
    ATTR_FALSE_VALUE: false,
  },
  compilerOptions: {
    whitespace: 'condense',
  },
  inheritAttrs: false,
  template: `
  <ec-stub
    v-bind="{
      ...$attrs,
      ...$props,
      'data-test': $attrs['data-test'] ? ($attrs['data-test'] + ' ec-stub router-link-stub') : 'ec-stub router-link-stub',
    }">
      <slot />
  </ec-stub>`,
});

export default RouterLinkStub;
