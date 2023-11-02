import { vi } from 'vitest';
import { defineComponent } from 'vue';

const EcPopoverStub = defineComponent({
  name: 'EcPopoverStub',
  compilerOptions: {
    whitespace: 'condense',
  },
  inheritAttrs: false,
  methods: {
    update: vi.fn(),
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
