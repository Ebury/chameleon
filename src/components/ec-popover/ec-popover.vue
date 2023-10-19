<template>
  <fv-dropdown
    v-bind="getOptions()"
    ref="popover"
    :data-test="attrs['data-test'] ? `${attrs['data-test']} ec-popover` : 'ec-popover'"
  >
    <slot />
    <template #popper="{ hide, shown }">
      <slot
        name="popper"
        v-bind="{ hide, shown }"
      />
    </template>
  </fv-dropdown>
</template>

<script setup>
defineOptions({
  inheritAttrs: false,
});

import { Dropdown as FvDropdown } from 'floating-vue';
import {
  inject, ref, toRefs, useAttrs,
} from 'vue';

import { getUid } from '../../utils/uid';
import { POPOVER_CONTAINER_KEY } from './ec-popover-provide';

const attrs = useAttrs();
const props = defineProps({
  level: {
    type: String,
    default: '',
  },
  popperClass: {
    type: String,
    default: '',
  },
});

const id = getUid();
const popover = ref(null);

const { level, popperClass } = toRefs(props);
const { container: containerInject } = inject(POPOVER_CONTAINER_KEY, { container: ref('body') });

function getOptions() {
  return {
    popperClass: `${popperClass.value} ec-popover${level.value && ` ec-popover--${level.value}`}`.trim(),
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
