import Vue from 'vue';

const RouterViewStub = Vue.extend({
  name: 'RouterViewStub',
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
