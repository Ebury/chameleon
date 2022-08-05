import { defineComponent } from 'vue';

const EcPopoverStub = defineComponent({
  name: 'EcPopoverStub',
  compatConfig: {
    MODE: 3,
    ATTR_FALSE_VALUE: false,
  },
  compilerOptions: {
    whitespace: 'condense',
  },
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
      <slot name="popper" />
  </ec-stub>`,
});

export default EcPopoverStub;
