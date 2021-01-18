import Vue from 'vue';

const EcPopoverStub = Vue.extend({
  name: 'EcPopoverStub',
  inheritAttrs: false,
  methods: {
    update: jest.fn(),
  },
  template: `
  <ec-stub
    v-bind="{
      ...$attrs,
      ...$props,
      'data-test': $attrs['data-test'] ? ($attrs['data-test'] + ' ec-stub ec-popover-stub') : 'ec-stub ec-popover-stub',
    }">
      <slot />
      <slot name="popover" />
  </ec-stub>`,
});

export default EcPopoverStub;
