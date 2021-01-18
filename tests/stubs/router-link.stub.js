import Vue from 'vue';

const RouterLinkStub = Vue.extend({
  name: 'RouterLinkStub',
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
