<template>
  <fv-dropdown
    v-bind="getOptions()"
    ref="popover"
    :data-test="attrs['data-test'] ? `${attrs['data-test']} ec-popover` : 'ec-popover'"
  >
    <slot />
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
});

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
