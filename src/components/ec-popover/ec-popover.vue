<template>
  <fv-dropdown
    v-bind="getOptions()"
    ref="popover"
    :data-test="attrs['data-test'] ? `${attrs['data-test']} ec-popover` : 'ec-popover'"
    v-on="{
      'update:shown': (shown: boolean) => emit('update:shown', shown),
      show: () => emit('show'),
      'apply-show': () => emit('apply-show'),
      hide: () => emit('hide'),
      'apply-hide': () => emit('apply-hide'),
      'auto-hide': () => emit('auto-hide'),
      'close-directive': () => emit('close-directive'),
      resize: () => emit('resize'),
    }"
  >
    <slot />
    <!-- eslint-disable-next-line vue/no-template-shadow -->
    <template #popper="{ hide, shown }">
      <!-- c8 ignore start -->
      <slot
        name="popper"
        v-bind="{ hide, shown }"
      />
      <!-- c8 ignore end -->
    </template>
  </fv-dropdown>
</template>

<script setup lang="ts">
import { Dropdown as FvDropdown } from 'floating-vue';
import {
  inject, ref, toRefs, useAttrs,
} from 'vue';

import { getUid } from '../../utils/uid';
import { POPOVER_CONTAINER_KEY } from './ec-popover-provide';
import type { PopoverProps } from './types';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const props = withDefaults(defineProps<PopoverProps>(), {
  popperClass: '',
  autoHide: true,
  shift: undefined,
  autoSize: undefined,
  preventOverflow: undefined,
});

const emit = defineEmits<{
  'update:shown': [show: boolean],
  'show': [],
  'apply-show': [],
  'hide': [],
  'apply-hide': [],
  'auto-hide': [],
  'close-directive': [],
  'resize': [],
}>();

const id = getUid();
const popover = ref<InstanceType<typeof FvDropdown>>();

const {
  shown,
  level,
  popperClass,
  placement,
  triggers,
  distance,
  skidding,
  disabled,
  autoHide,
  shift,
  autoSize,
  preventOverflow,
  overflowPadding,
} = toRefs(props);
const { container: containerInject } = inject(POPOVER_CONTAINER_KEY, { container: ref('body') });

function getOptions() {
  return {
    shown: shown?.value,
    placement: placement?.value,
    triggers: triggers?.value,
    distance: distance?.value,
    skidding: skidding?.value,
    disabled: disabled?.value,
    autoHide: autoHide?.value,
    shift: shift?.value,
    autoSize: autoSize?.value,
    preventOverflow: preventOverflow?.value,
    overflowPadding: overflowPadding?.value,
    popperClass: `${popperClass.value} ec-popover${level?.value ? ` ec-popover--${level.value}` : ''}`.trim(),
    container: containerInject.value,
    ariaId: `ec-popover-${id}`,
    arrowOverflow: true, // to hide the arrow for popover
    ...attrs,
  };
}

/* c8 ignore start */
function update() {
  if (popover.value) {
    popover.value.onResize();
  }
}
/* c8 ignore stop */

defineExpose({
  update,
});
</script>
